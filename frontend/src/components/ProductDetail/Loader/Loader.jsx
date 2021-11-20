import React from 'react';
import Skeleton from '@mui/material/Skeleton';

function Loader() {
    return (
        <div className="productdetail">
            <div className="guide">
                <Skeleton variant="text" width="30%" />
            </div>
            <div className="productdetail__content">
                <div className="productdetail__img">
                    <div className="sub__imgs">
                        <div className="sub__img">
                            <Skeleton variant="rectangular" height="100%" width="100%" />
                        </div>
                        <div className="sub__img">
                            <Skeleton variant="rectangular" height="100%" width="100%" />
                        </div>
                        <div className="sub__img">
                            <Skeleton variant="rectangular" height="100%" width="100%" />
                        </div>
                        <div className="sub__img">
                            <Skeleton variant="rectangular" height="100%" width="100%" />
                        </div>
                    </div>
                    <div className="main__img">
                        <Skeleton variant="rectangular" height="100%" width="100%" />
                    </div>
                </div>
                <div className="productdetail__descrp">
                    <div className="descrp__header">
                        <Skeleton variant="rectangular" width="30vw" />
                    </div>
                    <div className="productdetail__descrptext ">
                        <Skeleton variant="rectangular" />
                    </div>
                    <div className="productdetail__descrpcolor">
                        <Skeleton variant="rectangular" />
                    </div>
                    <div className="productdetail__descrpsize">
                        <Skeleton variant="rectangular" />
                    </div>
                    <div className="productdetail__descrpstock">
                        <Skeleton variant="rectangular" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loader;
