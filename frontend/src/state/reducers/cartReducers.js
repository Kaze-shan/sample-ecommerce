const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE_LOCALCART': {
            const newLocalcart = { ...state };
            delete newLocalcart[action.payload];
            return { ...newLocalcart };
        }
        case 'REMOVE_LOCALCART':
            return { ...action.payload };
        case 'SET_LOCALCART':
            return { ...action.payload };
        case 'CLEAR_LOCALCART':
            return {};
        default:
            return state;
    }
};

export default reducer;
