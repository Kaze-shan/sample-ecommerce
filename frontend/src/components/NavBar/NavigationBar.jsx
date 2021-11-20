import React from 'react';
import './NavgationBar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Search from './Search.jsx';
import MenuDrawer from '../MenuDrawer/MenuDrawer.jsx';
import Cartthumb from './Cartthumb/Cartthumb.jsx';
import { useHistory } from 'react-router-dom';
import EmptyCart from './EmptyCart/EmptyCart.jsx';
import { useSelector } from 'react-redux';
import { calSum } from '../utils/utils';
import MediaQuery from 'react-responsive';

function NavigationBar() {
    const localcart = useSelector(state => state.localcart);
    const history = useHistory();

    const selectCheckout = () => {
        history.push(`/Checkout/0`);
    };

    const selectHome = () => {
        history.push(`/`);
    };

    return (
        <div className="navigationbar__wrap">
            <div className="navigationbar">
                <div className="navigationbar__left">
                    <MenuDrawer />
                    <div
                        className="navigationbar__logo"
                        onClick={selectHome}
                        onKeyPress={selectHome}
                        role="button"
                        tabIndex={0}
                    >
                        Sample
                    </div>
                </div>
                <div className="navigationbar__middlesearch">
                    <Search />
                </div>
                <div className="navigationbar__tool">
                    <div className="nav_cart">
                        <IconButton aria-label="Show Cart Items" color="inherit" onClick={selectCheckout}>
                            <Badge badgeContent={calSum(localcart)} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <MediaQuery minWidth={812}>
                            {JSON.stringify(localcart) !== JSON.stringify({}) ? <Cartthumb /> : <EmptyCart />}
                        </MediaQuery>
                    </div>
                    {<AccountCircleIcon />}
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;
