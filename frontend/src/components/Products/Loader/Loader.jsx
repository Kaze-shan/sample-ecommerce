import React from 'react';
import Skeleton from '@mui/material/Skeleton';

function Loader() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
        <div className="product" key={item}>
            <div className="product__img">
                <Skeleton variant="rectangular" height="200px" />
            </div>
            <div className="product__descrp">
                <Skeleton variant="text" />
            </div>
            <div className="product__descrpprice">
                <Skeleton variant="text" width="100%" />
            </div>
        </div>
    ));
}

export default Loader;
