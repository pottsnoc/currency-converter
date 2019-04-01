const currencyRequest = () => {
    return {
        type: 'FETCH_CURRENCIES_REQUEST'
    }
}
const currencyLoaded = (currencies) => {
    return {
        type: 'FETCH_CURRENCIES_SUCCESS',
        payload: currencies
    }
}
const currencyFailed = (err) => {
    return {
        type: 'FETCH_CURRENCIES_FAILED',
        payload: err
    }
}
const changeBaseCurrency = (currencies, target) => {
    const currentBase = currencies.find(item => item.base);
    const targetBase = currencies.find(item => item.charCode === target);
    const result = currencies.map(item => {
        return {
            ...item,
            value: currentBase.value * item.value / targetBase.value,
            previous: currentBase.previous * item.previous / targetBase.previous,
            base: item === targetBase ? true : null,
        };
    });
    return {
        type: 'CHANGE_BASE_CURRENCY',
        payload: result
    }
}
export {currencyRequest, currencyLoaded, currencyFailed, changeBaseCurrency};