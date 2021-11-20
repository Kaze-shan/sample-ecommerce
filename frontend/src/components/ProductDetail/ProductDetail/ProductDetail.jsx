import React, { useState, createContext } from 'react';
import './ProductDetail.css';
import ProductImage from './ProductImage/ProductImage.jsx';

import ProductColor from './ProductColor/ProductColor.jsx';
import ProductSize from './ProductSize/ProductSize.jsx';
import ProductAddedDialog from './ProductAddedDialog/ProductAddedDialog.jsx';
import ProductSelectQuantity from './ProductSelectQuantity/ProductSelectQuantity.jsx';
import ProductBreadCrumb from './ProductBreadCrumb/ProductBreadCrumb.jsx';
import ProductHeader from './ProductHeader/ProductHeader.jsx';
import AddtoBag from './AddtoBag/AddtoBag.jsx';

export const ProductDetailContext = createContext(null);

function ProductDetail({ product, breadcrumb, stocklist, colorStock }) {
    const [purchaseQ, setPurchaseQ] = useState(0);
    const [error, setError] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <ProductDetailContext.Provider
            value={{
                product,
                setPurchaseQ,
                purchaseQ,
                selectedColor,
                selectedSize,
                error,
                setError,
                stocklist,
                colorStock,
                setSelectedColor,
                setSelectedSize,
                openDialog,
                setOpenDialog,
            }}
        >
            {breadcrumb && <ProductBreadCrumb breadcrumb={breadcrumb} />}
            <div className="productdetail__content">
                <ProductImage ProductsImage={product.image} ProductName={product.name} />

                <div className="productdetail__descrp">
                    <ProductHeader />
                    <div className={`productdetail__descrptext `}>
                        <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                    </div>

                    {product.color && <ProductColor />}
                    {product.size && <ProductSize />}

                    <ProductSelectQuantity setPurchaseQ={setPurchaseQ} />
                    <AddtoBag />
                    {openDialog && <ProductAddedDialog />}
                </div>
            </div>
        </ProductDetailContext.Provider>
    );
}

export default ProductDetail;
