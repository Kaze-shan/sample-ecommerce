import React, { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { usePaymentDataLayerValue } from '../../../paymentDataLayer';
import Collapse from '@mui/material/Collapse';

function PaymentOptions() {
    const [opencredit, setopenCredit] = useState(true);
    const [{ paymentMethod, creditError }, reducerDispatch] = usePaymentDataLayerValue();

    const handlePaymentMethodChange = event => {
        if (event.target.value === 'Credit Card') {
            setopenCredit(true);
            reducerDispatch({
                type: 'SET_DISABLED',
                disabled: true,
            });
            // the button is disabled if nothing input in the creadit card information form
        } else {
            setopenCredit(false);
            reducerDispatch({
                type: 'SET_DISABLED',
                disabled: false,
            });
            // if the user selected cash on delivery,
            //user can click the button without inputing in the creadit card information form
        }
        reducerDispatch({
            type: 'SET_PAYMENTMETHOD',
            paymentMethod: event.target.value,
        });
    };

    const handleCard = event => {
        reducerDispatch({
            type: 'SET_DISABLED',
            disabled: event.empty,
        });
        reducerDispatch({
            type: 'SET_CREDITERROR',
            creditError: event.error ? event.error.message : '',
        });
    };

    return (
        <div className="paymentoptions">
            <RadioGroup aria-label="payment" name="payment" value={paymentMethod} onChange={handlePaymentMethodChange}>
                <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
                <Collapse in={opencredit} timeout="auto" unmountOnExit>
                    <p className="testcard">Test Card: 4242424242424242 </p>
                    <p className="testcard">DATE:Any future date CVC:Any Digits</p>
                    <CardElement onChange={handleCard} />
                    {creditError && <div>{creditError}</div>}
                </Collapse>
                <FormControlLabel value="Cash on Delivery" control={<Radio />} label="Cash on Delivery" />
            </RadioGroup>
        </div>
    );
}

export default PaymentOptions;
