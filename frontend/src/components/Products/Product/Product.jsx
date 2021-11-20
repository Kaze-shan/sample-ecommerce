import React from 'react';
import './Product.css';
import { useHistory } from 'react-router-dom';
import NoMatch from '../NoMatch/NoMatch.jsx';

function Product({ products }) {
    const history = useHistory();

    const selectProduct = id => {
        history.push(`/products/${id}`); //switch to the detailed product page
    };

    const renderProductCard = () => {
        return products.map(product => (
            <div
                className="product"
                onClick={() => selectProduct(product.productCode)}
                onKeyPress={() => selectProduct(product.productCode)}
                key={product._id}
                role="button"
                tabIndex={0}
            >
                <div className="product__img">
                    <img src={product.image[0]} alt={product.name} />
                </div>

                <div className="product__descrp">
                    <strong>{product.name}</strong>
                    <hr></hr>
                    {product.discount.discount !== 1 && (
                        <div className="discounttag">
                            <div className="discounttagtop">{product.discount.discount * 100}% OFF</div>
                            <div className="discounttagbottom"></div>
                        </div>
                    )}

                    <div className="product__descrpname">
                        <p>{product.brand}</p>
                    </div>
                    <div className="product__descrpprice">
                        {product.discount.discount !== 1 ? (
                            <>
                                <p className="crossed">HKD {product.price}</p>
                                <p className="discounted"> NOW HKD {product.price * product.discount.discount}</p>
                            </>
                        ) : (
                            <p>HKD {product.price}</p>
                        )}
                    </div>
                </div>
            </div>
        ));
    };

    return products.length === 0 ? <NoMatch /> : renderProductCard();
}

export default Product;
