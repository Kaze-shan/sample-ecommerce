import React from 'react';
import { useSelector } from 'react-redux';

function ConfirmationAddress() {
    const order_inquiry = useSelector(state => state.order);
    return (
        <div className="confirmation___address">
            <div className="confirmation___addresstop">
                <p className="hdtitle">Customer Details</p>
                <br />
            </div>
            <div className="confirmation___addressbottom">
                <p className="title">Name</p>
                <p>{`${order_inquiry.customerInfo.first_name} ${order_inquiry.customerInfo.last_name}`}</p>
                <br />
                <p className="title">Phone</p>
                <p>{`${order_inquiry.customerInfo.phone}`}</p>
                <br />
                <p className="title">Address</p>
                <p>{`${order_inquiry.customerInfo.address1}`}</p>
                <p>{`${order_inquiry.customerInfo.address2}`}</p>
                <p>{`${order_inquiry.customerInfo.district}`}</p>
                <br />
            </div>
            <p className="title">Email</p>
            <p>{`${order_inquiry.customerInfo.email}`}</p>
            <br />
        </div>
    );
}

export default ConfirmationAddress;
