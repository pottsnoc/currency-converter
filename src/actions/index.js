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
    return {
        type: 'EDIT_CURRENCIES',
        payload: result
    }
}
const toggleCurrencyValueFav = (currencies, idx) => {
    const target = {...currencies[idx]};
    target.fav = target.fav ? null : true;
    const result = currencies.map((item, i) => {
        if(i === idx) {
            item = Object.assign({}, item);
            item.fav = item.fav ? null : true; 
        }
        return item;
    })
    const favs = sortByName(result.filter(a => a.fav));
    const common = sortByName(result.filter(a => !a.fav));
    return {
        type: 'EDIT_CURRENCIES',
        payload: [...favs, ...common]
    }
}

const sortByName = (arr) => {
    const res = arr.slice();
    return res.sort((a, b) => {
        if(a.charCode > b.charCode) return 1;
        return -1;
    })
}

export {currencyRequest, currencyLoaded, currencyFailed,
        changeBaseCurrency, toggleCurrencyValueFav};