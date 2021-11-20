import Order from '../models/order.js';
import transactionhandling from '../utils/transactionhandling.js';
import Discounts from '../models/discount.js';

const createOrder = async (req, res, next) => {
  try {
    const {
      orderProduct,
      subtotal,
      shippingFee,
      paymentMethod,
      customerInfo,
      member,
    } = req.body;

    if (
      !orderProduct ||
        !subtotal ||
        !shippingFee ||
        !paymentMethod ||
        !customerInfo
    ) {
      return next(new ErrorHander('Please add all', 422));
    }

    const d = new Date();
    const utc = d.getTime() + (480 * 60000);// calculate HK time
    const startHKDate = new Date(utc);
    startHKDate.setUTCHours(0, 0, 0, 0);

    let orderNO = '';

    const lastOrder = await Order.findOne({
      createdAt: {$gte: startHKDate},
    }).sort({createdAt: -1});

    if (!lastOrder) {
      orderNO = `${startHKDate
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '')}0000`;
    } else {
      orderNO = (parseInt(lastOrder.orderNO) + 1).toString();
    }

    const order = new Order({
      orderNO,
      orderProduct,
      subtotal,
      shippingFee,
      paymentMethod,
      customerInfo,
      member,
    });

    const result = await order
        .save();

    return res.status(200).json({result});
  } catch (e) {
    console.log(e);
    return res.status(400).json(
        {error: 'something went wrong, please try again'});
  }
};

const handlePayment = async (req, res, next) => {
  try {
    const {total, cart, payment_method_id, payment_intent_id} = req.body;

    if (!total || !cart || !(payment_method_id || payment_intent_id)) {
      return next(new ErrorHander('Please fill in all fields', 422));
    }

    const result = await transactionhandling(
        cart,
        total,
        payment_method_id,
        payment_intent_id,
    );

    if (!result.success) {
      console.log(result);
      console.log(result.success);
      return res.status(400).json({error: result});
    }

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json(
        {error: 'something went wrong, please try again'});
  }
};

export {
  createOrder,
  handlePayment};

