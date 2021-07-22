import {IAction , IActionType} from "../../interfaces/action.interface";
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";


const token = window.localStorage.getItem('token');


type AppState = typeof initialState;

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}


const initialState = {
    logStatus: {
        ...initialAsyncState, data: {
            isLogged: token ? true : false,
            isAdmin: false,
            token: token
        }
    },
    register: initialAsyncState,
    logout: initialAsyncState,
};

export const loginActions:IActionType = actionCreator('LOGIN');
export const registerActions:IActionType = actionCreator('REGISTER');
export const logoutActions:IActionType = actionCreator('LOGOUT');


export function authReducer(state:AppState = initialState, action:IAction) {
    switch (action.type) {
        case loginActions.REQUEST:
        case loginActions.SUCCESS:
        case loginActions.FAILURE:
            return { ...state, logStatus: reducerHandler(state.logStatus, action, loginActions) }

        case registerActions.REQUEST:
        case registerActions.SUCCESS:
        case registerActions.FAILURE:
            return { ...state, register: reducerHandler(state.register, action, registerActions) }

        case logoutActions.REQUEST:
        case logoutActions.SUCCESS:
        case logoutActions.FAILURE:
            return { ...state, logStatus: reducerHandler(state.logStatus, action, logoutActions) }
        default:
            return state;
    }
}

//logStatus shortcuts
export const getIsLogged = (state:any) => state.auth.logStatus.data.isLogged;
export const getIsAdmin = (state:any) => state.auth.logStatus.data.isAdmin;
export const getToken = (state:any) => state.auth.logStatus.data.token;
export const getLoggingIn = (state:any) => state.auth.logStatus.isLoading;
export const getIsRegistering = (state:any) => state.auth.register.isLoading;
export const getLogginError = (state:any) => state.auth.logStatus.error;

