const products = null;
const sort = 'latestArrival';
const currentPage = 1;
const filter_size = [];
const filter_color = [];
const price = [0, 1000];

const reducer = (state = { products, sort, currentPage, filter_size, filter_color, price }, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: [...action.payload] };
        case 'SET_SORT':
            return { ...state, sort: action.payload };
        case 'SET_CURRENTPAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_FILTERSIZE':
            return { ...state, filter_size: [...action.payload] };
        case 'SET_FILTERCOLOR':
            return { ...state, filter_color: [...action.payload] };
        case 'SET_PRICE':
            return { ...state, price: [...action.payload] };
        case 'CLEAR_FILTER':
            return {
                products: null,
                sort: 'latestArrival',
                currentPage: 1,
                filter_size: [],
                filter_color: [],
                price: [0, 1000],
            };
        case 'CLEAR_PRODUCTS':
            return { ...state, products: null };
        case 'CLEAR_CURRENTPAGE':
            return { ...state, currentPage: 1 };
        case 'CLEAR_PRICE':
            return { ...state, price: [0, 1000] };
        default:
            return state;
    }
};

export default reducer;
