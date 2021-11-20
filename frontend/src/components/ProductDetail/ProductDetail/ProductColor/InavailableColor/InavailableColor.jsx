import React from 'react';
import './InavailableColor.css';

function InavailableColor({ color }) {
    return (
        <div className={`colordiv inavailable`} key={color.code}>
            <div className="colorimage">
                <img src={color.image} alt={color.name} />
            </div>
        </div>
    );
}

export default InavailableColor;
