import axios from 'axios'

export const getProducts = () => async dispatch => {
    try {
        dispatch({ type: 'products_req' })
        const { data } = await axios.get('/api/products')
        dispatch({ type: 'products_success', payload: data })
    } catch (err) {
        dispatch({ type: 'products_fail', payload: err.response.data.message })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({ type: 'clear_errors' })
}
