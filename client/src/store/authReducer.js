const token = window.localStorage.getItem('token');

const initialState = {
    isLogged: token ? true : false,
    token: token,
    isAdmin: false,
};

export const ACTIONS = {
    LOGIN: 'Login',
    LOGOUT: 'Logout'
}

export function authReducer(state = initialState, action) {

    window.fetch('http://localhost:5000/auth/stat', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    })
        .then(response => response.json())
        .then(data => {
            initialState['isAdmin'] = data.isAdmin;
        })


    switch (action.type) {
        case ACTIONS.LOGIN:
            return { ...state, isLogged: true, token: action.payload.token, isAdmin: action.payload.isAdmin}
        case ACTIONS.LOGOUT:
            window.localStorage.clear();
            return { ...state, isLogged: false, token: '', isAdmin: false};
        default:
            return state;
    }
}

export const getIsLogged = state => state.auth.isLogged;
export const getIsAdmin = state => state.auth.isAdmin;
export const getToken = state => state.auth.token;