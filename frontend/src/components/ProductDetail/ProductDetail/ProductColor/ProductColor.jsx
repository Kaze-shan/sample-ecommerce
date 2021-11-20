import React, { useContext } from 'react';
import { ProductDetailContext } from '../ProductDetail.jsx';
import { haveColor } from '../../../utils/utils';
import ColorVarient from './ColorVarient/ColorVarient.jsx';
import InavailableColor from './InavailableColor/InavailableColor.jsx';
import './ProductColor.css';

function ProductColor() {
    const { product, colorStock } = useContext(ProductDetailContext);

    const renderColor = color => {
        return color.map(color => {
            if (haveColor(color.code, colorStock) > 0 && color.status) {
                return <ColorVarient color={color} key={color.code} />;
            } else {
                return <InavailableColor color={color} key={color.code} />;
            }
        });
    };

    return (
        <div className="productdetail__descrpcolor">
            <p>Color</p>

            <div className="colordivwrapper">{renderColor(product.color)}</div>
        </div>
    );
}

export default ProductColor;
