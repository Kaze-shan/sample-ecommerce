import React, { useState, useRef, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import ProductModal from '../ProductModal/ProductModal.jsx';
import Row from './Row/Row.jsx';
import './ProductImage.css';

const zoom = 2; //the zoom-in setting for magnify glass

function ProductImage({ ProductsImage, ProductName }) {
    const [onshowimg, setOnshowimg] = useState(null);
    const [showMagnify, setShowMagnify] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const productimg = useRef(null);
    const magnifyglass = useRef(null);
    const magnifyglassdiv = useRef(null);

    const handleMouseoverIn = () => {
        setShowMagnify(true);
    };

    const handleMouseoverOut = () => {
        setShowMagnify(false);
    };

    const handleModal = () => {
        setShowModal(!showModal);
    };

    const moveMagnifier = e => {
        if (magnifyglass.current && magnifyglassdiv.current) {
            let pos, x, y;
            let w, h, bw;

            bw = 3;
            w = magnifyglass.current.offsetWidth / 2;
            h = magnifyglass.current.offsetHeight / 2;

            /* Prevent any other actions that may occur when moving over the image */
            e.preventDefault();
            /* Get the cursor's x and y positions: */
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;
            /* Prevent the magnifier glass from being positioned outside the image: */
            if (x > productimg.current.width - w / zoom) {
                x = productimg.current.width - w / zoom;
            }
            if (x < w / zoom) {
                x = w / zoom;
            }
            if (y > productimg.current.height - h / zoom) {
                y = productimg.current.height - h / zoom;
            }
            if (y < h / zoom) {
                y = h / zoom;
            }
            /* Set the position of the magnifier glass: */
            magnifyglass.current.style.left = x - w + 'px';
            magnifyglass.current.style.top = y - h + 'px';
            /* Display what the magnifier glass "sees": */
            magnifyglassdiv.current.style.backgroundPosition =
                '-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px';
        }
    };

    const getCursorPos = e => {
        let a,
            x = 0,
            y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = productimg.current.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    };

    useEffect(() => {
        if (magnifyglass.current && magnifyglassdiv.current) {
            magnifyglassdiv.current.style.backgroundImage = 'url("' + productimg.current.src + '")';
            magnifyglassdiv.current.style.backgroundRepeat = 'no-repeat';
            magnifyglassdiv.current.style.backgroundSize =
                productimg.current.width * zoom + 'px ' + productimg.current.height * zoom + 'px';

            /* Execute a function when someone moves the magnifier glass over the image: */
            productimg.current.addEventListener('mousemove', moveMagnifier);
            magnifyglass.current.addEventListener('mousemove', moveMagnifier);
        }
    }, [showMagnify]); //attach Magnifyglass to the product pictures

    return (
        <div className="productdetail__img">
            <ProductModal
                img={onshowimg ? onshowimg : ProductsImage[0]}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div className="sub__imgsrow">
                <Row ProductsImage={ProductsImage} setOnshowimg={setOnshowimg} />
            </div>
            <div
                className="main__img"
                onMouseOver={handleMouseoverIn}
                onFocus={handleMouseoverIn}
                onMouseLeave={handleMouseoverOut}
                onBlur={handleMouseoverOut}
                onClick={handleModal}
                onKeyPress={handleModal}
                role="button"
                tabIndex={0}
            >
                <img src={onshowimg ? onshowimg : ProductsImage[0]} alt={ProductName} ref={productimg} />
                <MediaQuery minWidth={813}>
                    {showMagnify && (
                        <>
                            <div className="magnify" ref={magnifyglass}></div>
                            <div className="clicktozoom">Click to Zoom</div>
                        </>
                    )}
                </MediaQuery>
            </div>

            <MediaQuery minWidth={813}>
                {showMagnify && <div className={`${showMagnify && 'magnifydiv'}`} ref={magnifyglassdiv}></div>}
            </MediaQuery>
        </div>
    );
}

export default ProductImage;
