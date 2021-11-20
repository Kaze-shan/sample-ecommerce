import React from 'react';
import { usePaymentDataLayerValue } from '../../../paymentDataLayer';

function PaymentCartItem() {
    const { cart } = usePaymentDataLayerValue();

    return (
        <table className="cart__rightitems">
            {cart?.map(item => (
                <tbody key={item.sku}>
                    <tr className="confirmation___item">
                        <td className="prl">{`${item.productID.name} (-Color: ${item.color} -Size:${item.size}) x ${item.quantity}`}</td>
                        <td className="confirmation___itemprice">
                            {item.productID.discount.discount !== 1 ? (
                                <p> HKD {item.productID.price * item.productID.discount.discount}</p>
                            ) : (
                                `HKD ${item.productID.price}`
                            )}
                        </td>
                    </tr>
                </tbody>
            ))}
        </table>
    );
}

export default PaymentCartItem;
