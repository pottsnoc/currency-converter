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
        type: 'FETCH_CURRENCIES_FAILURE',
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
    localStorage.setItem('base', targetBase.charCode);
    return {
        type: 'EDIT_CURRENCIES',
        payload: result
    }
}
const toggleCurrencyValueFav = (currencies, charCode) => {
    const result = currencies.map((item) => {
        if(item.charCode === charCode) {
            item = Object.assign({}, item);
            item.fav = item.fav ? null : true; 
        }
        return item;
    })
    const favs = result.filter(a => a.fav)
                       .sort((a, b) => a.charCode > b.charCode ? 1 : -1);
    const common = result.filter(a => !a.fav)
                         .sort((a, b) => a.charCode > b.charCode ? 1 : -1);
    localStorage.setItem('favs', favs.map(item => item.charCode));
    return {
        type: 'EDIT_CURRENCIES',
        payload: [...favs, ...common]
    }
}

export {currencyRequest, currencyLoaded, currencyFailed,
        changeBaseCurrency, toggleCurrencyValueFav};