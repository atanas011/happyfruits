export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case 'login_req':
        case 'register_req':
        case 'load_user_req':
            return {
                loading: true,
                isAuthenticated: false
            }
        case 'login_success':
        case 'register_success':
        case 'load_user_success':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case 'logout_success':
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case 'login_fail':
        case 'register_fail':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case 'load_user_fail':
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                // error: action.payload
            }
        case 'logout_fail':
            return {
                ...state,
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
