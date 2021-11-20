import React, { useContext } from 'react';
import { ProductDetailContext } from '../../ProductDetail.jsx';
import './ColorVarient.css';

function ColorVarient({ color }) {
    const { setSelectedColor, setPurchaseQ, setSelectedSize, selectedColor } = useContext(ProductDetailContext);

    const handleColorClick = color => {
        if (color === selectedColor) {
            setSelectedColor(null);
        } else {
            setSelectedColor(color);
        }

        setPurchaseQ(0);
        setSelectedSize(null);
    };

    return (
        <div className={`colordiv ${selectedColor === color.code ? 'selected' : ''}`} key={color.code}>
            <div
                className="colorimage"
                onClick={() => {
                    handleColorClick(color.code);
                }}
                onKeyPress={() => {
                    handleColorClick(color.code);
                }}
                role="button"
                tabIndex={0}
            >
                <img src={color.image} alt={color.name} />
            </div>
        </div>
    );
}

export default ColorVarient;
