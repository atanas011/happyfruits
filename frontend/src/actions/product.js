import axios from 'axios'

export const getProducts = (currentPage = 1, keyword = '', price, category, rating = 0) => async dispatch => {
    try {
        dispatch({ type: 'products_req' })
        let queryStr = `
            /api/products?keyword=${keyword
            }&page=${currentPage
            }&price[gt]=${price[0]}&price[lt]=${price[1]
            }&ratings[gte]=${rating}
        `

        if (category) {
            queryStr = `
                /api/products?keyword=${keyword
                }&page=${currentPage
                }&price[gt]=${price[0]}&price[lt]=${price[1]
                }&category=${category
                }&ratings[gte]=${rating}
            `
        }
        const { data } = await axios.get(queryStr)
        dispatch({ type: 'products_success', payload: data })
    } catch (err) {
        dispatch({ type: 'products_fail', payload: err.response.data.message })
    }
}

export const getProductDetails = id => async dispatch => {
    try {
        dispatch({ type: 'product_details_req' })
        const { data } = await axios.get(`/api/product/${id}`)
        dispatch({ type: 'product_details_success', payload: data })
    } catch (err) {
        dispatch({ type: 'product_details_fail', payload: err.response.data.message })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({ type: 'clear_errors' })
}
