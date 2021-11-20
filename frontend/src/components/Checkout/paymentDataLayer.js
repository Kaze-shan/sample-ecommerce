import React, { createContext, useContext, useReducer } from 'react';

export const PaymentDataLayerContext = createContext();

export const PaymentDataLayer = ({ initialState, reducer, children }) => (
    <PaymentDataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </PaymentDataLayerContext.Provider>
);

export const usePaymentDataLayerValue = () => useContext(PaymentDataLayerContext);
