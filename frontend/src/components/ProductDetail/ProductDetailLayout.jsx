import React, { useState, useEffect } from 'react';
import './ProductDetailLayout.css';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import Error from '../Error/Error.jsx';
import Loader from './Loader/Loader.jsx';

function ProductDetailLayer() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [breadcrumb, setBreadcrumb] = useState(null);
    const [noResult, setNoResult] = useState(false);
    const [stocklist, setStocklist] = useState([]);
    const [colorStock, setColorStock] = useState([]);

    const renderContent = () => {
        if (product) {
            return (
                <ProductDetail
                    product={product}
                    breadcrumb={breadcrumb}
                    stocklist={stocklist}
                    colorStock={colorStock}
                />
            );
        }

        if (noResult) {
            return <Error />;
        }

        if (!product) return <Loader />;
    };

    useEffect(() => {
        axios
            .get(`/api/v1/products/${productId}`)
            .then(res => {
                setProduct(res.data.productDetail);
                setStocklist(res.data.stocklist);
                setColorStock(res.data.colorStock);
            })
            .catch(() => setNoResult(true));
    }, [productId]);

    useEffect(() => {
        if (product) {
            axios
                .get(`/api/v1/products/breadcrumb/${product.parentID}`)
                .then(res => {
                    setBreadcrumb(res.data.result);
                })
                .catch(() => setNoResult(true));
        }
    }, [product]);

    return <div className="productdetail">{renderContent()}</div>;
}

export default ProductDetailLayer;
