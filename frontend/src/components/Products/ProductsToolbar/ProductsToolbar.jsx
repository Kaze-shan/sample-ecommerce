import React from 'react';
import './ProductsToolbar.css';
import ListItem from '@mui/material/ListItem';
import Filter from './Filter/Filter.jsx';
import PriceSlider from './Slider/PriceSlider.jsx';

function ProductsToolbar({
    setFilter_size,
    setFilter_color,
    filter_color,
    filter_size,
    price,
    setPrice,
    colorList,
    sizeList,
}) {
    return (
        <div className="productstoolbar">
            <ListItem>
                <div className="filterby">FILTER BY</div>
            </ListItem>

            <hr />
            <div className="productstoolbar__items">
                <Filter filter="SIZE" filterlist={sizeList} setFilter={setFilter_size} selected={filter_size} />
                <hr />
                <Filter filter="COLOR" filterlist={colorList} setFilter={setFilter_color} selected={filter_color} />
                <hr />
                <PriceSlider price={price} setPrice={setPrice} />
            </div>
        </div>
    );
}

export default ProductsToolbar;
