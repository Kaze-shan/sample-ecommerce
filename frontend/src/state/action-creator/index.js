export const setItem = item => {
    return dispatch => {
        dispatch({
            type: 'SET_LOCALCART',
            payload: item,
        });
    };
};

export const deleteItem = id => {
    return dispatch => {
        dispatch({
            type: 'DELETE_LOCALCART',
            payload: id,
        });
    };
};

export const removeItem = item => {
    return dispatch => {
        dispatch({
            type: 'REMOVE_LOCALCART',
            payload: item,
        });
    };
};

export const clearCart = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_LOCALCART',
        });
    };
};

export const setOrder = order => {
    return dispatch => {
        dispatch({
            type: 'SET_ORDERINQUIRY',
            payload: order,
        });
    };
};

export const clearOrder = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_ORDERINQUIRY',
        });
    };
};

export const setProducts = product => {
    return dispatch => {
        dispatch({
            type: 'SET_PRODUCTS',
            payload: product,
        });
    };
};

export const setSort = sort => {
    return dispatch => {
        dispatch({
            type: 'SET_SORT',
            payload: sort,
        });
    };
};

export const setCurrentPage = page => {
    return dispatch => {
        dispatch({
            type: 'SET_CURRENTPAGE',
            payload: page,
        });
    };
};

export const setFilterSize = size => {
    return dispatch => {
        dispatch({
            type: 'SET_FILTERSIZE',
            payload: size,
        });
    };
};
export const setFilterColor = color => {
    return dispatch => {
        dispatch({
            type: 'SET_FILTERCOLOR',
            payload: color,
        });
    };
};

export const setPrice = price => {
    return dispatch => {
        dispatch({
            type: 'SET_PRICE',
            payload: price,
        });
    };
};

export const clearProduct = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_PRODUCTS',
        });
    };
};

export const clearCurrentPage = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_CURRENTPAGE',
        });
    };
};

export const clearPrice = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_PRICE',
        });
    };
};

export const clearFilter = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_FILTER',
        });
    };
};
