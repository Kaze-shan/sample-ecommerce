import React from 'react';
import { useSelector } from 'react-redux';

function ConfirmationProductDetail() {
    const order_inquiry = useSelector(state => state.order);
    return (
        <table className="confirmation___confirm">
            <tbody>
                <tr className="confirmation___itemstitle">
                    <td>Ordered Items</td>
                    <td>Total</td>
                </tr>
                {order_inquiry.orderProduct.map(item => (
                    <tr key={item.orderSku}>
                        <td>{`${item.orderProduct} x ${item.orderQuantity}`}</td>
                        <td className="price">HKD {item.discountedPrice}</td>
                    </tr>
                ))}
                <tr>
                    <td className="confirmation___itemstitle">Subtotal</td>
                    <td className="price">HKD {order_inquiry.subtotal}</td>
                </tr>
                <tr>
                    <td className="confirmation___itemstitle">Shipping Fee</td>
                    <td className="price">{`HKD ${order_inquiry.shippingFee}`}</td>
                </tr>

                <tr>
                    <td className="confirmation___itemstitle">Total</td>
                    <td className="price">HKD {order_inquiry.subtotal + order_inquiry.shippingFee}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default ConfirmationProductDetail;
