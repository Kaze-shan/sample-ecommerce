import React, { useContext } from 'react';
import './ItemPrice.css';
import { ProductContext } from '../../../CartItem.jsx';

function ItemPrice() {
    const { product } = useContext(ProductContext);
    const discounted = product?.productID.discount.discount !== 1;
    return (
        <div className="cart__itemprice">
            <div className="cart__itemprice_discount">
                <p className={`${discounted && 'crossed'}`}>HKD {product?.productID.price}</p>
                {discounted && (
                    <p className="discounted"> HKD {product?.productID.price * product?.productID.discount.discount}</p>
                )}
            </div>
        </div>
    );
}

export default ItemPrice;
