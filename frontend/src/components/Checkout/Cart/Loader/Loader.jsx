import React from 'react';
import Skeleton from '@mui/material/Skeleton';

function Loader() {
    return (
        <div className="cart__item">
            <div className="cart__itemimg">
                <Skeleton variant="rectangular" height="100%" />
            </div>
            <div className="cart__itemleft">
                <div>
                    <Skeleton variant="rectangular" width="100px" height="20px" />
                </div>
                <br />
                <div>
                    <Skeleton variant="rectangular" width="100%" height="20px" />
                </div>
            </div>
        </div>
    );
}

export default Loader;
