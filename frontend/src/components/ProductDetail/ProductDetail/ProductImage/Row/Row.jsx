import React, { useRef } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MediaQuery from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import './Row.css';

function Row({ ProductsImage, setOnshowimg }) {
    const sub_imgs = useRef();

    const handleImgClick = img => {
        setOnshowimg(img);
    };

    const handleScroll = direction => {
        if (direction === 'up') {
            sub_imgs.current.scrollTop -= 200;
        } else {
            sub_imgs.current.scrollTop += 200;
        }
    };

    const handleScrollHorizon = direction => {
        if (direction === 'left') {
            sub_imgs.current.scrollLeft -= 200;
        } else {
            sub_imgs.current.scrollLeft += 200;
        }
    };

    return (
        <>
            {ProductsImage.length > 4 && (
                <div className="arrow">
                    <MediaQuery minWidth={813}>
                        {' '}
                        {/* PC */}
                        <ArrowDropUpIcon onClick={() => handleScroll('up')} />
                    </MediaQuery>
                    <MediaQuery maxWidth={812}>
                        {' '}
                        {/* phone */}
                        <ArrowLeftIcon onClick={() => handleScrollHorizon('left')} />
                    </MediaQuery>
                </div>
            )}

            <div className="sub__imgs" ref={sub_imgs}>
                {ProductsImage.map(img => (
                    <div
                        className="sub__img"
                        key={uuidv4()}
                        onClick={() => handleImgClick(img)}
                        onKeyPress={() => handleImgClick(img)}
                        role="button"
                        tabIndex={0}
                    >
                        <img src={img} alt="" />
                    </div>
                ))}
            </div>

            {ProductsImage.length > 4 && (
                <div className="arrow">
                    <MediaQuery minWidth={813}>
                        <ArrowDropDownIcon onClick={() => handleScroll('down')} />
                    </MediaQuery>
                    <MediaQuery maxWidth={812}>
                        <ArrowRightIcon onClick={() => handleScrollHorizon('right')} />
                    </MediaQuery>
                </div>
            )}
        </>
    );
}

export default Row;
