const token = window.localStorage.getItem('token');

const initialState = {
    isLogged: token ? true : false,
    token: token,
    isAdmin: false,
};

export const ACTIONS = {
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    SET_ADMIN: 'Set admin'
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return { ...state, isLogged: true, token: action.payload.token, isAdmin: action.payload.isAdmin }
        case ACTIONS.LOGOUT:
            window.localStorage.clear();
            return { ...state, isLogged: false, token: '', isAdmin: false };
        case ACTIONS.SET_ADMIN:
            return { ...state, isAdmin: action.payload.isAdmin }
        default:
            return state;
    }
}

export const getIsLogged = state => state.auth.isLogged;
export const getIsAdmin = state => state.auth.isAdmin;
export const getToken = state => state.auth.token;