import React, { useState, useEffect } from 'react';
import './Cartthumb.css';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { calSum, getCartDetails, calSubtotal } from '../../utils/utils';
import { useSelector } from 'react-redux';

function Cartthumb() {
    const localcart = useSelector(state => state.localcart);
    const history = useHistory();

    const [preview, setPreview] = useState([]);

    const selectCheckout = () => {
        history.push(`/Checkout/0`);
    };

    const selectPayment = () => {
        history.push(`/Checkout/1`);
    };

    useEffect(() => {
        if (JSON.stringify(localcart) !== JSON.stringify({})) {
            getCartDetails(localcart).then(res => setPreview(res));
        }
    }, [localcart]);

    return (
        <div className="cartthuumb">
            <div className="cartthuumb__title">
                <p>MY CART {calSum(localcart)} ITEM(S)</p>
            </div>
            <div className="cartthuumb__body">
                <div className="cartthuumb__cartlist">
                    {preview?.map(item => {
                        if (localcart[item.sku])
                            return (
                                <div className="cartthuumb__cart" key={item.sku}>
                                    <div className="cartthuumb__cartimg">
                                        <img src={item.image} alt={item.productID.name} />
                                    </div>
                                    <table className="cartthuumb__cartcontent">
                                        <tbody>
                                            <tr>
                                                <td className="cartcotent__title">{item.productID.name}</td>
                                            </tr>

                                            <tr>
                                                <td className="prl">Size</td>
                                                <td>{item.size}</td>
                                            </tr>

                                            <tr>
                                                <td className="prl">Quantity</td>
                                                <td>{parseInt(localcart[item.sku])}</td>
                                            </tr>

                                            <tr>
                                                <td className="prl">Price / item</td>
                                                {item.productID.discount.discount === 1 ? (
                                                    <td>HKD {item.productID.price}</td>
                                                ) : (
                                                    <td>
                                                        <p>HKD {item.productID.price}</p>
                                                        <p className="cartthuumb__cartdiscounted">
                                                            HKD{' '}
                                                            {item.productID.price * item.productID.discount.discount}
                                                        </p>
                                                    </td>
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            );
                    })}
                </div>

                <div className="cartthuumb__subtotal">
                    <p className="prl">Subtotal</p>
                    {preview && <p>HKD {calSubtotal(preview, localcart)}</p>}
                </div>
            </div>
            <div className="cartthuumb__bottomtoolbar black">
                <Button className="buttonprl" onClick={selectCheckout}>
                    View Cart
                </Button>
                <Button className="buttonprl" onClick={selectPayment}>
                    Check Out
                </Button>
            </div>
        </div>
    );
}

export default Cartthumb;
