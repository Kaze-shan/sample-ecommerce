import React, { useContext } from 'react';
import { SizeContext } from '../ProductSize.jsx';

function DefaultSizeVariant() {
    const { size } = useContext(SizeContext);

    return size.map(size => (
        <div className={`descrpsizebox`} key={size.code}>
            <p>{size.name}</p>
        </div>
    ));
}

export default DefaultSizeVariant;
