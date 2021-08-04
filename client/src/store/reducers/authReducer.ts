import { IAction, IActionType } from "../../interfaces/action.interface";
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
        ...initialAsyncState, 
        data: {
            isLogged: token ? true : false,
            isAdmin: false,
            token: token
        }
    },
    register: initialAsyncState,
    logout: initialAsyncState,
    forgottenPassword: initialAsyncState,
    changingPassword:initialAsyncState,
};

export const loginActions: IActionType = actionCreator('LOGIN');
export const registerActions: IActionType = actionCreator('REGISTER');
export const logoutActions: IActionType = actionCreator('LOGOUT');
export const forgottenPasswordActions: IActionType = actionCreator('FORGOTTEN_PASSWORD');
export const changingPasswordActions:IActionType = actionCreator('CHANGING_PASSWORD');


export function authReducer(state: AppState = initialState, action: IAction) {
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
        case forgottenPasswordActions.REQUEST:
        case forgottenPasswordActions.SUCCESS:
        case forgottenPasswordActions.FAILURE:
            return { ...state, forgotttenPassword: reducerHandler(state.forgottenPassword, action, forgottenPasswordActions) }

            case changingPasswordActions.REQUEST:
            case changingPasswordActions.SUCCESS:
            case changingPasswordActions.FAILURE:
                return { ...state, changingPassword: reducerHandler(state.changingPassword, action, forgottenPasswordActions) }
        default:
            return state;
    }
}

export const getIsLogged = (state: any) => state.auth.logStatus.data.isLogged;
export const getIsAdmin = (state: any) => state.auth.logStatus.data.isAdmin;
export const getToken = (state: any) => state.auth.logStatus.data.token;
export const getIsLogging = (state: any) => state.auth.logStatus.isLoading;
export const getLogginError = (state: any) => state.auth.logStatus.error;
export const getIsRegistering = (state: any) => state.auth.register.isLoading;
export const getIsSendingEmail = (state:any) => state.auth.forgottenPassword.isLoading;
export const getIsChangingPassowrd = (state:any) => state.auth.changingPassword.isLoading;

