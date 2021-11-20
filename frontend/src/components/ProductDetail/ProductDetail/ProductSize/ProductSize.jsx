import React, { createContext, useContext } from 'react';
import { ProductDetailContext } from '../ProductDetail.jsx';
import SizeVariant from './SizeVariant/SizeVariant.jsx';
import DefaultSizeVariant from './DefaultSizeVariant/DefaultSizeVariant.jsx';
import './ProductSize.css';

export const SizeContext = createContext(null);

function ProductSize() {
    const { product, selectedColor } = useContext(ProductDetailContext);

    const size = product.size;

    return (
        <div className="productdetail__descrpsize">
            <p>Size</p>
            <div className="sizediv">
                <SizeContext.Provider value={{ size }}>
                    {selectedColor ? <SizeVariant /> : <DefaultSizeVariant />}
                </SizeContext.Provider>
            </div>
        </div>
    );
}

export default ProductSize;
