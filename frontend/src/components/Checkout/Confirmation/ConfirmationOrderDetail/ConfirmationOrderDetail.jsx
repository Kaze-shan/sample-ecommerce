import React from 'react';
import { useSelector } from 'react-redux';

function ConfirmationOrderDetail() {
    const order_inquiry = useSelector(state => state.order);

    const getDate = string => {
        const year = string.substring(0, 4);
        const month = string.substring(4, 6);
        const day = string.substring(6, 8);
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="order__details">
            <div className="refno">
                <p className="title">Reference No</p>
                <p>{order_inquiry.orderNO}</p>
                <br />
            </div>
            <div className="date">
                <p className="title">Date</p>
                <p>{getDate(order_inquiry.orderNO)}</p>
                <br />
            </div>
            <div className="total">
                <p className="title">Total</p>
                <p>HKD {order_inquiry.subtotal + order_inquiry.shippingFee}</p>
                <br />
            </div>
            <div className="payment__method">
                <p className="title">Payment Method</p>
                <p>{order_inquiry.paymentMethod}</p>
                <br />
            </div>
        </div>
    );
}

export default ConfirmationOrderDetail;
