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

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case 'product_details_req':
            return {
                ...state,
                loading: true
            }
        case 'product_details_success':
            return {
                loading: false,
                product: action.payload.product
            }
        case 'product_details_fail':
            return {
                ...state,
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
