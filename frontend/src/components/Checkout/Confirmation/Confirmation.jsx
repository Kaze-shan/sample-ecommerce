import React, { useEffect } from 'react';
import './Confirmation.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';
import ConfirmationAddress from './ConfirmationAddress/ConfirmationAddress.jsx';
import ConfirmationOrderDetail from './ConfirmationOrderDetail/ConfirmationOrderDetail.jsx';
import ConfirmationProductDetail from './ConfirmationProductDetail/ConfirmationProductDetail.jsx';

function Confirmation() {
    const order_inquiry = useSelector(state => state.order);
    const dispatch = useDispatch();
    const { clearOrder, clearCart } = bindActionCreators(actionCreators, dispatch);

    const history = useHistory();

    useEffect(() => {
        if (!order_inquiry) {
            //if the user access this page via link, instead of after purchasing, force them back to empty cart page
            history.replace(`/Checkout/0`);
        } else {
            //if the user access this page after purchasing,
            //Empty everything in the cart
            clearCart();
        }

        return () => {
            //when user leaves this page,
            //also clear the order inquiry information
            clearOrder();
        };
    }, []);

    return (
        order_inquiry && (
            <div className="confirmation">
                <ConfirmationAddress />
                <ConfirmationOrderDetail />
                <ConfirmationProductDetail />
                <br />
                <center>
                    <strong>Thank you!</strong>
                </center>
                <br />
                <br />
            </div>
        )
    );
}

export default Confirmation;
