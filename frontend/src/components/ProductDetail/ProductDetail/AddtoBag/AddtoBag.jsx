import React, { useContext } from 'react';
import { ProductDetailContext } from '../ProductDetail.jsx';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../state/index';
import { haveSize } from '../../../utils/utils';
import './AddtoBag.css';

function AddtoBag() {
    const { selectedColor, selectedSize, product, setError, purchaseQ, setOpenDialog, stocklist } =
        useContext(ProductDetailContext);
    const localcart = useSelector(state => state.localcart);
    const dispatch = useDispatch();
    const { setItem } = bindActionCreators(actionCreators, dispatch);

    const handleAdd = (code, stock) => {
        setError(null);

        if (!selectedColor || !selectedSize) {
            setError('Please select color and size');
            return;
        }

        if (parseInt(purchaseQ) < 1) {
            setError('Please select the Quantity');
            return;
        }

        const newLocalcart = { ...localcart };
        const productCode = `${code}-${selectedColor}-${selectedSize}`;

        if (newLocalcart[productCode]) {
            if (newLocalcart[productCode] + purchaseQ > 5) {
                setError('Maximum 5 Quantity per item');
                return;
            }

            if (newLocalcart[productCode] + purchaseQ > stock) {
                setError(`Only ${stock} left`);
                return;
            }

            newLocalcart[productCode] = newLocalcart[productCode] + purchaseQ;
        } else {
            newLocalcart[productCode] = purchaseQ;
        }

        setItem(newLocalcart);

        setOpenDialog(true);
    };

    return (
        <div className="addtobag black">
            <Button
                onClick={() => {
                    handleAdd(product.productCode, haveSize(selectedSize, stocklist, selectedColor));
                }}
            >
                Add to Bag
            </Button>
        </div>
    );
}

export default AddtoBag;
