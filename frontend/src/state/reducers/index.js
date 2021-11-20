import { combineReducers } from 'redux';
import cartReducers from './cartReducers';
import orderReducers from './orderReducers';
import filterReducers from './filterReducers';

const reducers = combineReducers({
    localcart: cartReducers,
    order: orderReducers,
    filter: filterReducers,
});

export default reducers;
