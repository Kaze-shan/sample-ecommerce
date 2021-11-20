import mongoose from 'mongoose';
import Variations from '../models/variation.js';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({path: './config/config.env'});
}

const stripe = require('stripe')(process.env.STRIPE_KEY);

async function updateInventory(
    updateCart,
    total, paymentMethodId,
    paymentIntentId) {
  const session = await mongoose.startSession();
  // start the session

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: {level: 'local'},
    writeConcern: {w: 'majority'},
  };

  try {
    const transactionResults = await session.withTransaction(async () => {
      const query = Object.keys(updateCart);

      for (const item of query) {
        // decrease the inventory
        const reduceBy = updateCart[item]* -1;

        const updResult = await Variations.updateOne(
            {sku: item,
              stock: {$gte: updateCart[item]}},
            {$inc: {stock: reduceBy}},
            {session});

        if (updResult.nModified ===0) {
          // if nothing is modified, absort the transaction
          // the invnetory modified in this sesscion will be cancelled
          await session.abortTransaction();
          throw new Error('Not Enough Stock');
        }
      }

      let intent;

      if (paymentMethodId) {
        // Create the PaymentIntent
        intent = await stripe.paymentIntents.create({
          payment_method: paymentMethodId,
          amount: total,
          currency: 'hkd',
          confirmation_method: 'manual',
          confirm: true,
        });
      } else if (paymentIntentId) {
        // if there is payment intent, means the stripe handled some
        // credit card problem and the user submitted the payment form again
        // we just need to confirm the payment,
        // dont have to create the PaymentIntent
        intent = await stripe.paymentIntents.confirm(
            paymentIntentId,
        );
      }

      if (
        intent.status === 'requires_action' &&
                        intent.next_action.type === 'use_stripe_sdk'
      ) {
        // Everything modified in this sesscion will be cancelled
        await session.abortTransaction();

        // Tell the client to handle the action
        const error = {requires_action: true,
          payment_intent_client_secret: intent.client_secret};
        throw error;
      } else if (intent.status !== 'succeeded') {
        // Invalid status
        await session.abortTransaction();
        throw new Error('Invalid PaymentIntent status');
      }
    }, transactionOptions);

    if (transactionResults) {
      // if the session succeeded without any error
      return {success: true};
    }
  } catch (e) {
    if (e.type === 'StripeCardError') {
      return e.message;
    }
    if (e.requires_action) {
      return e;
    } else {
      return e.message;
    }
  } finally {
    await session.endSession();
  }
}

export default updateInventory;
