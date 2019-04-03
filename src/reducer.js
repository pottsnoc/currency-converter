const initialState = {
    currencies: [],
    error: false,
    loading: false
}
const reducer = (state=initialState, action) => {
    switch(action.type) {
        case 'FETCH_CURRENCIES_REQUEST':
            return {
                currencies: [],
                error: false,
                loading: true,
            }
        case 'FETCH_CURRENCIES_SUCCESS':
            return {
                currencies: action.payload,
                error: false,
                loading: false,
            }
        case 'FETCH_CURRENCIES_FAILURE':
            return {
                currencies: [],
                error: true,
                loading: false,
            }
        case 'EDIT_CURRENCIES': {
            return {
                ...state,
                currencies: action.payload
            }
        }
        default:
            return state;
    }
}

export default reducer;