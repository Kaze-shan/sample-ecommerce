import React from 'react';
import { usePaymentDataLayerValue } from '../../../paymentDataLayer';

const shippingoptions = [
    {
        value: 50,
        label: 'SF express ---- HKD50',
    },
    {
        value: 20,
        label: 'Local mail ---- HKD20',
    },
    {
        value: 60,
        label: 'DHL/Fedex ---- HKD60',
    },
];

function PaymentShippingOption() {
    const [{ shippingfee }, reducerDispatch] = usePaymentDataLayerValue();

    const handleChangeShipping = event => {
        reducerDispatch({
            type: 'SET_SHIPPINGFEE',
            shippingfee: +event.target.value,
        });
    };

    return (
        <div className="cart__shippingoptions">
            <span>Shipping</span>
            <select
                id="shipping"
                defaultValue={shippingfee}
                onBlur={handleChangeShipping}
                onChange={handleChangeShipping}
            >
                {shippingoptions.map(ship => (
                    <option key={ship.value} value={ship.value}>
                        {ship.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default PaymentShippingOption;
