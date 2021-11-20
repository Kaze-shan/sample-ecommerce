import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { calSum, calSubtotal } from '../../../utils/utils';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import { usePaymentDataLayerValue } from '../../paymentDataLayer';
import PaymentCartItem from './PaymentCartItem/PaymentCartItem.jsx';
import PaymentShippingOption from './PaymentShippingOption/PaymentShippingOption.jsx';
import PaymentOptions from './PaymentOptions/PaymentOptions.jsx';

function PaymentRight() {
    const [open, setOpen] = useState(false);

    const localcart = useSelector(state => state.localcart);
    const [{ cart, subtotal, shippingfee, processing, disabled, succeeded }, reducerDispatch] =
        usePaymentDataLayerValue();

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        reducerDispatch({
            type: 'SET_SUBTOTAL',
            subtotal: calSubtotal(cart, localcart),
        });
    }, [cart]);

    return (
        <div className="payment__right">
            <div className="payment___items">
                <ListItem button onClick={handleClick}>
                    <ListItemText primary={`TOTAL ${calSum(localcart)} ITEMS`} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <PaymentCartItem />
                </Collapse>
                <div className="cart__leftitemssubtotal">
                    <p>Subtotal</p>
                    {cart ? <p> HKD {subtotal}</p> : <Skeleton variant="rectangular" width={100} height={15} />}
                </div>
                <PaymentShippingOption />
                <div className="cart__leftitemspaymenttotal">
                    <p>Total</p>
                    {cart ? (
                        <p> HKD {subtotal + shippingfee}</p>
                    ) : (
                        <Skeleton variant="rectangular" width={100} height={15} />
                    )}
                </div>
            </div>
            <PaymentOptions />
            <div className="black paymentbuttondiv">
                <Button className="ContinueButton" type="submit" disabled={processing || disabled || succeeded}>
                    {processing ? 'processing...' : 'BUY NOW'}
                </Button>
            </div>
        </div>
    );
}

export default PaymentRight;
