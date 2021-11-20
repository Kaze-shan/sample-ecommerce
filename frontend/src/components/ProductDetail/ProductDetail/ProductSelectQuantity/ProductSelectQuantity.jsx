import React, { useContext } from 'react';
import { ProductDetailContext } from '../ProductDetail.jsx';
import './ProductSelectQuantity.css';
import { haveSize } from '../../../utils/utils';

function ProductSelectQuantity() {
    const { setPurchaseQ, purchaseQ, selectedColor, selectedSize, error, stocklist } = useContext(ProductDetailContext);
    const handleChangeQuantity = event => {
        setPurchaseQ(+event.target.value);
    };

    return (
        <div className="productdetail__descrpstock">
            <p>Quantity</p>

            <div className="stockdiv">
                <select id="purchaseQuantity" defaultValue={purchaseQ} onBlur={handleChangeQuantity}>
                    {selectedColor && selectedSize ? (
                        [0, 1, 2, 3, 4, 5].map(quantity => {
                            if (quantity <= haveSize(selectedSize, stocklist, selectedColor))
                                return (
                                    <option key={quantity} value={quantity}>
                                        {quantity}
                                    </option>
                                );
                        })
                    ) : (
                        <option key="--" value="0">
                            {' '}
                            --{' '}
                        </option>
                    )}
                </select>
                {error && <span className="producterror">{error}</span>}
            </div>
        </div>
    );
}

export default ProductSelectQuantity;
