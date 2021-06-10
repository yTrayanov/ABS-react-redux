const token = window.localStorage.getItem('token');

const initialState = {
    isLogged: token? true : false,
    token:'',
    isAdmin:false,
    userId:''
};

export const ACTIONS = {
    LOGIN: 'Login',
    LOGOUT: 'Logout'
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return { ...state, isLogged:true , token:action.payload.token , isAdmin:action.payload.isAdmin , userId:action.payload.userId}
        case ACTIONS.LOGOUT:
            window.localStorage.clear();
            return { ...state , isLogged:false , token:'' , isAdmin:false , userId:''};
        default:
            return state;
    }
}

export const getIsLogged = state => state.auth.isLogged;
export const getIsAdmin = state => state.auth.isAdmin;
export const getToken = state => state.auth.token;
export const getUserId = state => state.auth.userId;