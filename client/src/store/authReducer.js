const initialState = {
    isLogged: false,
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
            return { initialState};
        default:
            return state;
    }
}

export const getIsLogged = state => state.auth.isLogged;
export const getIsAdmin = state => state.auth.isAdmin;
export const getToken = state => state.auth.token;
export const getUserId = state => state.auth.userId;