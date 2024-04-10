import axios from 'axios'

export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: 'login_req' })
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.post('/api/login', { email, password }, config)
        dispatch({ type: 'login_success', payload: data.user })
    } catch (err) {
        dispatch({ type: 'login_fail', payload: err.response.data.message })
    }
}

export const register = userData => async dispatch => {
    try {
        dispatch({ type: 'register_req' })
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const { data } = await axios.post('/api/register', userData, config)
        dispatch({ type: 'register_success', payload: data.user })
    } catch (err) {
        dispatch({ type: 'register_fail', payload: err.response.data.message })
    }
}

export const loadUser = () => async dispatch => {
    try {
        dispatch({ type: 'load_user_req' })
        const { data } = await axios.get('/api/profile')
        dispatch({ type: 'load_user_success', payload: data.user })
    } catch (err) {
        dispatch({ type: 'load_user_fail', payload: err.response.data.message })
    }
}

export const logout = () => async dispatch => {
    try {
        await axios.get('/api/logout')
        dispatch({ type: 'logout_success' })
    } catch (err) {
        dispatch({ type: 'logout_fail', payload: err.response.data.message })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({ type: 'clear_errors' })
}
