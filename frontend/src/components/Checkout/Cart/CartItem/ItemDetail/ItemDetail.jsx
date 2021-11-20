import React, { useContext } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../../state/index';
import './ItemDetail.css';
import ItemBottom from './ItemBottom/ItemBottom.jsx';
import { ProductContext } from '../CartItem.jsx';

function ItemDetail() {
    const localcart = useSelector(state => state.localcart);
    const dispatch = useDispatch();
    const { setItem } = bindActionCreators(actionCreators, dispatch);
    const { product } = useContext(ProductContext);

    const handleDelete = id => {
        const newLocalcart = { ...localcart };
        delete newLocalcart[id];

        setItem(newLocalcart);
    };

    return (
        <>
            <div className="cart__itemleft">
                <div className="cart__itemtop">
                    <div className="cart__itemdetails">
                        <p className="cart__itemdetails__brand">{product?.productID.brand}</p>
                        <p className="cart__itemdetails__name">{product?.productID.name}</p>
                    </div>
                    <ClearIcon onClick={() => handleDelete(product?.sku)} />
                </div>
                <ItemBottom />
            </div>
        </>
    );
}

export default ItemDetail;
