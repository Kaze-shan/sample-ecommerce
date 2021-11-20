import React from 'react';

function InavailableSize({ size }) {
    return (
        <div className="descrpsizebox inavailable" key={size.code}>
            <p>{size.name}</p>
        </div>
    );
}

export default InavailableSize;
