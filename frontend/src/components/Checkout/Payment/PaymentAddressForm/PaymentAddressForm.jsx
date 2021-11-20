import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { usePaymentDataLayerValue } from '../../paymentDataLayer';

function PaymentAddressForm() {
    const [phoneErrorText, setPhoneErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [{ phoneError, emailError, email, contactNumber }, reducerDispatch] = usePaymentDataLayerValue();

    const isValid = field => {
        if (field === 'email') {
            if (!email) return;
            const regex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regex.test(String(email).toLowerCase())) {
                //if the email input doesnt match the email regex
                //show error message
                reducerDispatch({
                    type: 'SET_EMAILERROR',
                    emailError: true,
                });
                setEmailErrorText('Invalid Email');
            } else {
                reducerDispatch({
                    type: 'SET_EMAILERROR',
                    emailError: false,
                });
                setEmailErrorText('');
            }
        }

        if (field === 'phone') {
            if (!contactNumber) return;
            const phoneregex = /^\d{8}$/;
            if (!contactNumber.match(phoneregex)) {
                //if the contact number input doesnt match the contact number regex
                //show error message
                reducerDispatch({
                    type: 'SET_PHONEERROR',
                    phoneError: true,
                });
                setPhoneErrorText('Invalid Number (Only HK number is accepted)');
            } else {
                reducerDispatch({
                    type: 'SET_PHONEERROR',
                    phoneError: false,
                });
                setPhoneErrorText('');
            }
        }
    };

    return (
        <div className="paymentaddress">
            <ListItem>
                <ListItemText primary="DELIVERY ADDRESS" />
            </ListItem>
            <List component="ul" className="nestedlist">
                <TextField
                    id="standard-basic"
                    label="First Name"
                    required={true}
                    onChange={e =>
                        reducerDispatch({
                            type: 'SET_FNAME',
                            fname: e.target.value,
                        })
                    }
                />
                <TextField
                    id="standard-basic"
                    label="Last Name"
                    required={true}
                    onChange={e =>
                        reducerDispatch({
                            type: 'SET_LNAME',
                            lname: e.target.value,
                        })
                    }
                />
                <br />
                <TextField
                    id="standard-basic"
                    label="Contact Number"
                    required={true}
                    onChange={e =>
                        reducerDispatch({
                            type: 'SET_CONTACTNUMBER',
                            contactNumber: e.target.value,
                        })
                    }
                    onBlur={() => isValid('phone')}
                    error={phoneError}
                    helperText={phoneErrorText}
                />
                <br />
                <TextField
                    id="standard-full-width"
                    fullWidth
                    label="Unit, Floor, Block, Building Name"
                    required={true}
                    onChange={e =>
                        reducerDispatch({
                            type: 'SET_ADDRESS1',
                            address1: e.target.value,
                        })
                    }
                />
                <br />
                <TextField
                    id="standard-full-width"
                    fullWidth
                    label="Street Number, Street Name"
                    required={true}
                    onChange={e =>
                        reducerDispatch({
                            type: 'SET_ADDRESS2',
                            address2: e.target.value,
                        })
                    }
                />
                <br />
                <TextField
                    id="standard-full-width"
                    fullWidth
                    label="District"
                    required={true}
                    onChange={e =>
                        reducerDispatch({
                            type: 'SET_DISTRICT',
                            district: e.target.value,
                        })
                    }
                />
                <br />
                <TextField
                    id="standard-full-width"
                    fullWidth
                    label="Email"
                    required={true}
                    onChange={e =>
                        reducerDispatch({
                            type: 'SET_EMAIL',
                            email: e.target.value,
                        })
                    }
                    onBlur={() => isValid('email')}
                    error={emailError}
                    helperText={emailErrorText}
                />
            </List>
        </div>
    );
}

export default PaymentAddressForm;
