const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDERINQUIRY':
            return { ...action.payload };
        case 'CLEAR_ORDERINQUIRY':
            return null;
        default:
            return state;
    }
};

export default reducer;
