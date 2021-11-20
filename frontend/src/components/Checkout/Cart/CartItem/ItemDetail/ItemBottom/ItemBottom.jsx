import React, { useContext } from 'react';
import ItemQuantity from './ItemQuantity/ItemQuantity.jsx';
import ItemPrice from './ItemPrice/ItemPrice.jsx';
import './ItemBottom.css';
import { ProductContext } from '../../CartItem.jsx';

function ItemBottom() {
    const { product } = useContext(ProductContext);

    return (
        <div className="cart__itembottom">
            <div className="cart__itemdetails__cosi">
                <p className="cart__itemdetails__color">Color: {product?.color}</p>
                <p className="cart__itemdetails__size">Size: {product?.size}</p>
            </div>
            <div className="cart__itembottomleft">
                <ItemQuantity />
                <ItemPrice />
            </div>
        </div>
    );
}

export default ItemBottom;
