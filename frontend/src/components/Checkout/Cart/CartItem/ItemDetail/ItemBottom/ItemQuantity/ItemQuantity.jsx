import React, { useState, useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../../../../state/index';
import './ItemQuantity.css';
import { ProductContext } from '../../../CartItem.jsx';

function ItemQuantity() {
    const localcart = useSelector(state => state.localcart);
    const dispatch = useDispatch();
    const { setItem } = bindActionCreators(actionCreators, dispatch);
    const [error, setError] = useState(false);
    const { product } = useContext(ProductContext);

    const handleAdd = (id, stock) => {
        setError(null);
        const newLocalcart = { ...localcart };

        if (newLocalcart[id] > 4) {
            setError('Maximum 5 items');
            return;
        }
        if (newLocalcart[id] > stock - 1) {
            setError(`only ${newLocalcart[id]} left`);
            return;
        }

        newLocalcart[id] = newLocalcart[id] + 1 || 1;

        setItem(newLocalcart);
    };

    const handleRemove = id => {
        setError(null);

        const newLocalcart = { ...localcart };

        if (newLocalcart[id] < 2) {
            delete newLocalcart[id];

            setItem(newLocalcart);
        } else {
            newLocalcart[id] = newLocalcart[id] - 1;

            setItem(newLocalcart);
        }
    };
    return (
        <div className={`cart__itemquantity ${error && 'error'}`}>
            <AddIcon onClick={() => handleAdd(product?.sku, product?.stock)} />
            <p>{localcart[product?.sku]}</p>
            <RemoveIcon onClick={() => handleRemove(product?.sku)} />
            {error ? <p className="errordiv">{error}</p> : ''}
        </div>
    );
}

export default ItemQuantity;
