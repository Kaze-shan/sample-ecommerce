export const initialState = {
    fname: null,
    lname: null,
    contactNumber: null,
    address1: null,
    address2: null,
    district: null,
    email: null,
    shippingfee: 20,
    paymentMethod: 'Credit Card',
    subtotal: 0,
    emailError: false,
    phoneError: false,
    creditError: null,
    processing: false,
    disabled: true,
    succeeded: false,
    cart: null,
};
//state:currently look, action: set the current playing
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FNAME':
            return {
                ...state,
                fname: action.fname,
            };

        case 'SET_LNAME':
            return {
                ...state,
                lname: action.lname,
            };

        case 'SET_CONTACTNUMBER':
            return {
                ...state,
                contactNumber: action.contactNumber,
            };

        case 'SET_ADDRESS1':
            return {
                ...state,
                address1: action.address1,
            };

        case 'SET_ADDRESS2':
            return {
                ...state,
                address2: action.address2,
            };

        case 'SET_DISTRICT':
            return {
                ...state,
                district: action.district,
            };
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.email,
            };
        case 'SET_SHIPPINGFEE':
            return {
                ...state,
                shippingfee: action.shippingfee,
            };

        case 'SET_PAYMENTMETHOD':
            return {
                ...state,
                paymentMethod: action.paymentMethod,
            };

        case 'SET_SUBTOTAL':
            return {
                ...state,
                subtotal: action.subtotal,
            };

        case 'SET_EMAILERROR':
            return {
                ...state,
                emailError: action.emailError,
            };

        case 'SET_PHONEERROR':
            return {
                ...state,
                phoneError: action.phoneError,
            };

        case 'SET_CREDITERROR':
            return {
                ...state,
                creditError: action.creditError,
            };

        case 'SET_PROCESSING':
            return {
                ...state,
                processing: action.processing,
            };

        case 'SET_DISABLED':
            return {
                ...state,
                disabled: action.disabled,
            };

        case 'SET_SUCCEEDED':
            return {
                ...state,
                succeeded: action.succeeded,
            };

        case 'SET_CART':
            return {
                ...state,
                cart: action.cart,
            };

        default:
            return state;
    }
};

export default reducer;
