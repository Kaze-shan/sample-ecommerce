import './App.css';
import React, { useEffect } from 'react';
import { NavigationBar, MainPage, Products, ProductDetailLayout, Checkout, Footer, Error } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index';

function App() {
    const localcart = useSelector(state => state.localcart);
    const dispatch = useDispatch();
    const { setItem } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        const _localcart = localStorage.getItem('LocalCart');
        //Get Cart from LocalStorage, if any

        if (_localcart) {
            setItem(JSON.parse(_localcart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('LocalCart', JSON.stringify(localcart));
        //Set the data to localStorage if user changes the shopping cart
    }, [localcart]);

    return (
        <div className="App">
            <Router>
                <NavigationBar />
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route exact path="/Checkout/:stepId">
                        <Checkout />
                    </Route>
                    <Route exact path="/productlist/:categoryId">
                        <Products search={false} />
                    </Route>
                    <Route exact path="/products/Search">
                        <Products search={true} />
                    </Route>
                    <Route exact path="/products/:productId">
                        <ProductDetailLayout />
                    </Route>
                    <Route>
                        <Error />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
