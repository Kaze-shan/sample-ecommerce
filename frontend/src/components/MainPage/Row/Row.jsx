import React, { useState, useRef, useEffect } from 'react';
import './Row.css';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useHistory } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import axios from '../../../axios';

function Row() {
    const history = useHistory();
    const row_products = useRef();
    const [latestproducts, setLatestproducts] = useState(null);

    const browseProduct = productCode => {
        history.push(`/products/${productCode}`);
    };

    const handleScroll = direction => {
        if (direction === 'left') {
            row_products.current.scrollLeft -= 800;
        } else {
            row_products.current.scrollLeft += 800;
        }
    };

    useEffect(() => {
        axios
            .get('/api/v1/products/latestproducts')
            .then(res => {
                setLatestproducts(res.data.result);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="row">
            <ArrowLeftIcon onClick={() => handleScroll('left')} />
            <div className="row_products" ref={row_products}>
                {latestproducts
                    ? latestproducts.map(product => (
                          <div
                              className="row_product"
                              key={product._id}
                              onClick={() => browseProduct(product.productCode)}
                              onKeyPress={() => browseProduct(product.productCode)}
                              role="button"
                              tabIndex={0}
                          >
                              <img src={product.image[0]} alt={product.name} />
                          </div>
                      ))
                    : [1, 2, 3, 4, 5].map(item => (
                          <div className="row_product" key={item}>
                              <Skeleton variant="rectangular" height="100%" />
                          </div>
                      ))}
            </div>
            <ArrowRightIcon onClick={() => handleScroll('right')} />
        </div>
    );
}

export default Row;
