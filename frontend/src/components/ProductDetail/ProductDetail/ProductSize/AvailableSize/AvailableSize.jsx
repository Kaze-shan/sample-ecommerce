import React, { useContext } from 'react';
import { ProductDetailContext } from '../../ProductDetail.jsx';

function AvailableSize({ size, handleSizeClick }) {
    const { selectedSize } = useContext(ProductDetailContext);

    return (
        <div
            className={`descrpsizebox ${selectedSize === size.code && 'selected'}`}
            onClick={() => handleSizeClick(size.code)}
            onKeyPress={() => handleSizeClick(size.code)}
            role="button"
            tabIndex={0}
            key={size.code}
        >
            <p>{size.name}</p>
        </div>
    );
}

export default AvailableSize;
