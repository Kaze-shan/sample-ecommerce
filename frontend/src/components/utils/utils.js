import axios from '../../axios';

const calSum = items => {
    let sum = 0;

    for (const item in items) {
        if (Object.prototype.hasOwnProperty.call(items, item)) {
            sum += parseInt(items[item]);
        }
    }
    return sum;
};

const getCartDetails = async localcart => {
    if (JSON.stringify(localcart) !== JSON.stringify({})) {
        const productQuery = JSON.stringify(Object.keys(localcart));

        try {
            const result = await axios.get(`/api/v1/products/cart?productQuery=${productQuery}`);
            return result.data.result;
        } catch (e) {
            console.log(e);
        }
    }
};

const calSubtotal = (cart, localcart) => {
    if (cart?.length > 0) {
        const calculation = cart.map(item => {
            const quantity = localcart[item.sku] ?? 0;
            return item.productID.price * item.productID.discount.discount * quantity;
        });
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        return calculation.reduce(reducer);
    }

    return 0;
};

const haveSize = (code, stocklist, selectedColor) => {
    for (const item of stocklist) {
        if (item.size === code && selectedColor === item.color.toUpperCase()) return item.stock;
    }
};

const haveColor = (code, colorStock) => {
    for (const item of colorStock) {
        if (item._id.toUpperCase() === code) return true;
    }
};

export { calSum, getCartDetails, calSubtotal, haveSize, haveColor };
