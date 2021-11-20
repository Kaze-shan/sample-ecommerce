import React, { useState, useEffect } from 'react';
import './Checkout.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Cart from './Cart/Cart.jsx';
import Payment from './Payment/Payment.jsx';
import Confirmation from './Confirmation/Confirmation.jsx';
import { useHistory, useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { useSelector } from 'react-redux';
import reducer, { initialState } from './pamentReducer';
import { PaymentDataLayer } from './paymentDataLayer';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function Checkout() {
    const steps = ['Cart', 'Checkout', 'Receipt'];
    const { stepId } = useParams();
    const [activeStep, setActiveStep] = useState(parseInt(stepId));
    const history = useHistory();
    const localcart = useSelector(state => state.localcart);
    const order_inquiry = useSelector(state => state.order);

    useEffect(() => {
        setActiveStep(parseInt(stepId));
    }, [stepId]);

    const handleBack = () => {
        history.push(`/`);
    };

    const renderEmptyCart = () => (
        <div className="emptycart">
            <p>YOUR BAG IS EMPTY</p>
            <Button className="blackbutton" onClick={handleBack}>
                CONTINUE SHOPPING
            </Button>
        </div>
    );

    const renderCurrentStepComponent = () => {
        if (activeStep === 0) return <Cart />;

        if (activeStep === 1)
            return (
                <Elements stripe={stripePromise}>
                    <Payment />
                </Elements>
            );

        if (activeStep === 2) return <Confirmation />;
    };

    return (
        <div className="checkout">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <PaymentDataLayer initialState={initialState} reducer={reducer}>
                {JSON.stringify(localcart) === JSON.stringify({}) && !order_inquiry
                    ? renderEmptyCart()
                    : renderCurrentStepComponent()}
            </PaymentDataLayer>
        </div>
    );
}

export default Checkout;
