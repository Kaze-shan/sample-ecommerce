import React, { useContext } from 'react';
import { ProductDetailContext } from '../ProductDetail.jsx';

function ProductPrice() {
    const { product } = useContext(ProductDetailContext);
    const discounted = product.discount.discount !== 1;

    return (
        <div className="productdetail__descrpprice">
            <p className={`${discounted && 'crossed'}`}>HKD {product.price}</p>
            {discounted && <p className="discounted"> NOW HKD {product.price * product.discount.discount}</p>}
        </div>
    );
}

export default ProductPrice;
