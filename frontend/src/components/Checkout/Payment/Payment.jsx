import React, { useEffect } from 'react';
import './Payment.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../../axios';
import { useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getCartDetails } from '../../utils/utils';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';
import PaymentAddressForm from './PaymentAddressForm/PaymentAddressForm.jsx';
import PaymentRight from './PaymentRight/PaymentRight.jsx';
import { usePaymentDataLayerValue } from '../paymentDataLayer';

function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const localcart = useSelector(state => state.localcart);
    const order_inquiry = useSelector(state => state.order);
    const dispatch = useDispatch();
    const { setOrder } = bindActionCreators(actionCreators, dispatch);
    const [
        {
            fname,
            lname,
            contactNumber,
            address1,
            address2,
            district,
            email,
            shippingfee,
            paymentMethod,
            subtotal,
            emailError,
            phoneError,
            cart,
        },
        reducerDispatch,
    ] = usePaymentDataLayerValue();

    const handleContinue = async event => {
        event.preventDefault();

        if (paymentMethod === 'Credit Card') {
            //if the user uses a credit card, do the stripe stuff to handle the payment

            if (!stripe || !elements || emailError || phoneError) return;

            reducerDispatch({
                type: 'SET_PROCESSING',
                processing: true,
            }); //prevent the user click the button when processing

            const cardElement = elements.getElement(CardElement);

            const stripe_payment = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });
            //get paymentMethod from stripe for payment

            if (!stripe_payment.paymentMethod) return;

            axios
                .post('/api/v1/payment', {
                    total: (shippingfee + subtotal) * 100,
                    email: email,
                    cart: localcart,
                    payment_method_id: stripe_payment.paymentMethod.id,
                })
                .then(() => {
                    //if the payment succeeded, send the order data to database, create a order confirmation for the user
                    sendDB();
                })
                .catch(err => {
                    //if failed, handleServerResponse will handle next steps
                    reducerDispatch({
                        type: 'SET_PROCESSING',
                        processing: false,
                    }); //allow the user to submit the new payment method
                    handleServerResponse(err.response.data.error);
                });
        } else {
            //if the user selected cash on delivery, just send the order data to database
            sendDB();
        }
    };

    const handleServerResponse = result => {
        if (result.requires_action) {
            // Use Stripe.js to handle required card action
            handleAction(result);
        } else if (result.payment_method || result.payment_intent) {
            // Show error from stripe
            alert(result.raw.message);
        } else {
            // Show the error, e.g. not enough stock
            alert(result);
        }
    };

    const handleAction = response => {
        stripe.handleCardAction(response.payment_intent_client_secret).then(result => {
            if (result.error) {
                // Show error from stripe
                alert(result.error.message);
            } else {
                // The card action has been handled
                // The PaymentIntent can be confirmed again on the server
                axios
                    .post('/api/v1/payment', {
                        total: (shippingfee + subtotal) * 100,
                        email: email,
                        cart: localcart,
                        payment_intent_id: result.paymentIntent.id,
                    })
                    .then(() => {
                        sendDB();
                    })
                    .catch(err => {
                        reducerDispatch({
                            type: 'SET_PROCESSING',
                            processing: false,
                        });
                        handleServerResponse(err.response.data.error);
                    });
            }
        });
    };

    const sendDB = () => {
        const orderDetail = createOrderDetail(cart);

        axios
            .post('/api/v1/order', {
                orderProduct: orderDetail,
                customerInfo: {
                    first_name: fname,
                    last_name: lname,
                    phone: contactNumber,
                    address1: address1,
                    address2: address2,
                    district: district,
                    email: email,
                },
                subtotal: subtotal,
                shippingFee: shippingfee,
                paymentMethod: paymentMethod,
                total: shippingfee + subtotal,
            })
            .then(res => {
                reducerDispatch({
                    type: 'SET_SUCCEEDED',
                    succeeded: true,
                });
                reducerDispatch({
                    type: 'SET_CREDITERROR',
                    creditError: null,
                });
                setOrder(res.data.result);
                //the user can view the order confirmation
                //returned from the server in the next step
            })
            .catch(err => {
                alert(err.response.data.error);
            });
    };

    const createOrderDetail = cart => {
        //As we dont need every detail of the product, e.g. all variation of the product
        //we just create an array containing the neccessary information of the product

        const orderDetail = cart.map(order => {
            return {
                orderProduct: `${order.productID.name} (-Color: ${order.color} -Size:${order.size})`,
                orderSku: order.sku,
                orderQuantity: order.quantity,
                originalPrice: order.productID.price,
                discountName: order.productID.discount.name,
                discount: order.productID.discount.discount,
                discountedPrice: order.productID.price * order.productID.discount.discount,
            };
        });

        return orderDetail;
    };

    useEffect(() => {
        //get the cart Details when this componnet mounted
        //as the price may change due to a change in discount schema
        //we have to fetch new price information from the server
        getCartDetails(localcart).then(res => {
            const newData = res.map(item => {
                item.quantity = localcart[item.sku];
                return item;
            });
            reducerDispatch({
                type: 'SET_CART',
                cart: newData,
            });
        });
    }, []);

    useEffect(() => {
        //after receiving the order_inquiry
        //which means the payment step finished
        //and we received the order confirmation details from the server
        //we can proceed to the confirmation page
        if (order_inquiry) history.replace(`/Checkout/2`);
    }, [order_inquiry]);

    useEffect(() => {
        //if the user access the payment page by url
        //and we found that there is nothing in the localcart
        //we direct the user to empty cart page
        if (JSON.stringify(localcart) === JSON.stringify({})) {
            history.replace(`/Checkout/0`);
        }
    }, []);

    return (
        <form onSubmit={event => handleContinue(event)}>
            <div className="payment">
                <PaymentAddressForm />

                <PaymentRight />
            </div>
        </form>
    );
}

export default Payment;
