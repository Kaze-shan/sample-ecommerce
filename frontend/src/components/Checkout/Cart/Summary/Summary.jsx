import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { calSubtotal } from '../../../utils/utils';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Summary.css';

function Summary({ cart }) {
    const history = useHistory();
    const localcart = useSelector(state => state.localcart);

    const switchPayment = () => {
        history.push(`/Checkout/1`);
    };

    return (
        <div className="cart__right">
            <div className="cart__righttop">
                <p>APPLY PROMO CODE</p>
                <div className="cart__rightbottom">
                    <input type="text" />
                </div>
            </div>
            <div className="cart__rightitemssubtotoal">
                <p>Subtotal</p>
                <div className="cart__rightitemprice_subtotal">
                    {cart ? (
                        <p> HKD {calSubtotal(cart, localcart)}</p>
                    ) : (
                        <Skeleton variant="rectangular" width={100} height={15} />
                    )}
                </div>
            </div>
            <div className="cart__rightitemsshipping">
                <div className="rightitemsshipping__details">
                    <p>Shipping </p>
                </div>
                <div className="rightitemsshipping__price">
                    <span> calculated at checkout</span>
                </div>
            </div>
            <div className="cart__rightitemsbottom">
                <div className="cart__rightitemstotal">
                    <p>Total</p>
                    <div className="cart__rightitemprice_total">
                        {cart ? (
                            <p> HKD {calSubtotal(cart, localcart)}</p>
                        ) : (
                            <Skeleton variant="rectangular" width={100} height={15} />
                        )}
                    </div>
                </div>
                <center className="black">
                    <Button className="checkoutbutton" onClick={switchPayment}>
                        Go to Check Out
                    </Button>
                </center>
            </div>
        </div>
    );
}

export default Summary;
