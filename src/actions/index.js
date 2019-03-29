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
export {currencyRequest, currencyLoaded, currencyFailed}