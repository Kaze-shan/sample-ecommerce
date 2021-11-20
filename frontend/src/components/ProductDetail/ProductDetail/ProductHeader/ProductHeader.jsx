import React, { useContext } from 'react';
import ProductPrice from '../ProductPrice/ProductPrice.jsx';
import { ProductDetailContext } from '../ProductDetail.jsx';
import './ProductHeader.css';

function ProductHeader() {
    const { product } = useContext(ProductDetailContext);

    return (
        <div className="descrp__header">
            <span className="header">{product.name}</span>
            <p className="productdetail__descrpbrand">{product.brand}</p>
            <div className="productbottom">
                <ProductPrice />
            </div>
        </div>
    );
}

export default ProductHeader;
