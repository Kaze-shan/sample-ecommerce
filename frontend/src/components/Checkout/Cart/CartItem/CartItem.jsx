import React, { createContext } from 'react';
import './CartItem.css';
import ItemDetail from './ItemDetail/ItemDetail.jsx';

export const ProductContext = createContext(null);

function CartItem({ product }) {
    return (
        <div className="cart__item" key={product.sku}>
            <div className="cart__itemimg">
                <img src={product.image} alt={product.productID.name} />
            </div>
            <ProductContext.Provider value={{ product }}>
                <ItemDetail />
            </ProductContext.Provider>
        </div>
    );
}

export default CartItem;
