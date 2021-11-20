import React, { useEffect, useState } from 'react';
import './Cart.css';
import { calSum, getCartDetails } from '../../utils/utils';
import CartItem from './CartItem/CartItem.jsx';
import Loader from './Loader/Loader.jsx';
import { useSelector } from 'react-redux';
import Summary from './Summary/Summary.jsx';

function Cart() {
    const localcart = useSelector(state => state.localcart);
    const [cart, setCart] = useState(null);

    useEffect(() => {
        getCartDetails(localcart).then(res => setCart(res));
    }, []);

    return (
        <div className="cart">
            <div className="cart__left">
                <div className="cart__lefttop">
                    <p>You have {calSum(localcart)} item(s) in your cart.</p>
                </div>
                <div className="cart__leftitems">
                    {cart ? (
                        cart.map(product => {
                            if (localcart[product.sku]) return <CartItem product={product} key={product._id} />;
                        })
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
            <Summary cart={cart} />
        </div>
    );
}

export default Cart;
