import React, { useContext } from 'react';
import { SizeContext } from '../ProductSize.jsx';
import AvailableSize from '../AvailableSize/AvailableSize.jsx';
import InavailableSize from '../InavailableSize/InavailableSize.jsx';
import { ProductDetailContext } from '../../ProductDetail.jsx';
import { haveSize } from '../../../../utils/utils';

function SizeVariant() {
    const { size } = useContext(SizeContext);
    const { selectedColor, stocklist, setSelectedSize, selectedSize, setPurchaseQ } = useContext(ProductDetailContext);

    const handleSizeClick = size => {
        if (size === selectedSize) {
            setSelectedSize(null);
            setPurchaseQ(0);
        } else {
            setSelectedSize(size);
        }
    };

    return size.map(size => {
        if (haveSize(size.code, stocklist, selectedColor) > 0 && size.status) {
            return <AvailableSize size={size} handleSizeClick={handleSizeClick} key={size.code} />;
        } else {
            return <InavailableSize size={size} handleSizeClick={handleSizeClick} key={size.code} />;
        }
    });
}

export default SizeVariant;
