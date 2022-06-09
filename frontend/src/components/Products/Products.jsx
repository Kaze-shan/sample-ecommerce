import React, { useState, useEffect } from 'react';
import './Products.css';
import ProductsToolbar from './ProductsToolbar/ProductsToolbar.jsx';
import Product from './Product/Product.jsx';
import axios from '../../axios';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MediaQuery from 'react-responsive';
import Drawer from '@mui/material/Drawer';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Loader from './Loader/Loader.jsx';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/index';

function Products({ search }) {
    const { categoryId } = useParams();
    const location = useLocation();
    const history = useHistory();
    const searchkeyword = location.search ? location.search.substr(1).split('=')[1] : null;

    const { products, sort, currentPage, filter_size, filter_color, price } = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const { setProducts, setSort, setCurrentPage, setFilterSize, setFilterColor, setPrice, clearProduct, clearFilter } =
        bindActionCreators(actionCreators, dispatch);
    const [opendrawer, setOpendrawer] = useState(false);
    const [resultPerPage, setResultPerPage] = useState(null);
    const [count, setCount] = useState(null);
    const [filterColorDB, setFilterColorDB] = useState([]);
    const [filterSizeDB, setFilterSizeDB] = useState([]);

    const isArraysEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };

    function compareNumbers(a, b) {
        return a - b;
    }

    const getQueryString = () => {
        //return a string for query

        let queryString = '';

        if (location.search) {
            queryString = `keyword=${searchkeyword}`;
        } else {
            queryString = `parentCategory=${categoryId}`;
        }

        if (filter_size.length > 0) queryString = `${queryString}&size=${JSON.stringify(filter_size)}`;

        if (filter_color.length > 0) queryString = `${queryString}&color=${JSON.stringify(filter_color)}`;

        if (sort) queryString = `${queryString}&sort=${sort}`;

        if (!isArraysEqual(price, [0, 1000]))
            queryString = `${queryString}&price=${JSON.stringify(price.sort(compareNumbers))}`;

        queryString = `${queryString}&page=${currentPage}`;

        return queryString;
    };

    const handleBreadcrumbClick = listitem => {
        history.push(`/productlist/${categoryId.slice(0, categoryId.indexOf(listitem) + listitem.length)}`);
        clearFilter();
    };

    const renderBreadcrumb = () => {
        const breadcrumblocal = categoryId.split('_');

        return breadcrumblocal.map((listitem, index) => (
            <div className="products__guide__item" key={listitem}>
                <div
                    onClick={() => handleBreadcrumbClick(listitem)}
                    onKeyPress={() => handleBreadcrumbClick(listitem)}
                    role="button"
                    tabIndex={0}
                >
                    {listitem}
                </div>
                {
                    index !== breadcrumblocal.length - 1 && <ChevronRightIcon /> //the last breadcrumb doesn't need an Icon
                }
            </div>
        ));
    };

    const handleChangeSort = event => {
        if (event.target.value === sort) return; //onBlur not working
        setSort(event.target.value);
        clearProduct();
        window.scrollTo(0, 0);
        setCurrentPage(1);
    };

    const toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpendrawer(open);
    };

    const renderSearchText = () => {
        return (
            <div className="searchtext">
                {`You are searching for : `}
                <strong>{searchkeyword}</strong>
            </div>
        );
    };

    const setCurrentPageNo = (event, value) => {
        clearProduct();
        window.scrollTo(0, 0);
        setCurrentPage(value);
    };

    useEffect(() => {
        const query = getQueryString(); //get the query string for all filters

        axios
            .get(`/api/v1/products/getProducts?${query}`)
            .then(res => {
                setProducts(res.data.result);
                setResultPerPage(res.data.resultPerPage);
                setCount(res.data.filteredProductsCount);
                setFilterColorDB(res.data.colorFilter);
                setFilterSizeDB(res.data.sizeFilter);
            })
            .catch(e => console.log(e));
    }, [searchkeyword, categoryId, sort, filter_size, filter_color, price, currentPage]);

    return (
        <div className="products">
            {
                //render searchText in search Mode but breadcrumb if not
                search ? (
                    <div className="products__guide" id="products__guide">
                        <ChevronRightIcon />
                        {renderSearchText()}
                    </div>
                ) : (
                    <div className="products__guide" id="products__guide">
                        {renderBreadcrumb()}
                    </div>
                )
            }

            <MediaQuery maxWidth={812}>
                {' '}
                {/*  render only for phone screen */}
                <button className="products__filter__phone" onClick={toggleDrawer(true)}>
                    {' '}
                    {/* !!? */}
                    <p className="filtertext">Filter</p>
                    <KeyboardArrowDownIcon />
                </button>
                <Drawer anchor="right" open={opendrawer} onClose={toggleDrawer(false)}>
                    <ProductsToolbar
                        product={products}
                        setFilter_size={setFilterSize}
                        setFilter_color={setFilterColor}
                        filter_size={filter_size}
                        filter_color={filter_color}
                        price={price}
                        setPrice={setPrice}
                        colorList={filterColorDB}
                        sizeList={filterSizeDB}
                    />
                </Drawer>
            </MediaQuery>

            <MediaQuery minWidth={813}>
                {' '}
                {/*  render only for PC/laptop */}
                <div className="products__filter" id="products__filter">
                    <ProductsToolbar
                        product={products}
                        setFilter_size={setFilterSize}
                        setFilter_color={setFilterColor}
                        filter_size={filter_size}
                        filter_color={filter_color}
                        price={price}
                        setPrice={setPrice}
                        colorList={filterColorDB}
                        sizeList={filterSizeDB}
                    />
                </div>
            </MediaQuery>

            <div className="products__page" id="products__page">
                <div className="products__upper">
                    <span>{count ? count : 0} Item(s) found | </span>
                    <span>SORT BY</span>
                    <select name="sort" id="sort" value={sort} onChange={handleChangeSort} onBlur={handleChangeSort}>
                        <option value={'lowestPrice'}>Lowest Price</option>
                        <option value={'highestPrice'}>Highest Price</option>
                        <option value={'latestArrival'}>Latest Arrival</option>
                    </select>
                </div>
                <div className="products__pagewrap">{products ? <Product products={products} /> : <Loader />}</div>
                {resultPerPage < count && (
                    <div className="products__pagination">
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(count / resultPerPage)}
                                page={currentPage}
                                onChange={setCurrentPageNo}
                                shape="rounded"
                            />
                        </Stack>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;
