export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'products_req':
            return {
                loading: true
            }
        case 'products_success':
            return {
                loading: false,
                products: action.payload.products
            }
        case 'products_fail':
            return {
                loading: false,
                error: action.payload
            }
        case 'clear_errors':
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
