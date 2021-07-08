import IAction from "../../interfaces/action.interface";
import { postRequest } from "../../requests";
import { LOGIN_URL, LOGOUT_URL } from '../../urls';
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";

const token = window.localStorage.getItem('token');


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

const loginActions:any = actionCreator('LOGIN');
const registerActions:any = actionCreator('REGISTER');
const logoutActions:any = actionCreator('LOGOUT');

export function authReducer(state = initialState, action:IAction) {
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
export const getLogginError = (state:any) => state.auth.logStatus.error;


export const getState = (state:any) => state.auth.logStatus;



export const login = (username:string, password:string, history:any) => (dispatch:any) => {

    dispatch({ type: loginActions.REQUEST, payload: {} })

    postRequest(LOGIN_URL, { username, password })
        .then(response => {
            if (!response.success) {
                dispatch({ type: loginActions.FAILURE, payload: response.message })
                return;
            }

            window.localStorage.setItem('token', response.token);

            dispatch({ type: loginActions.SUCCESS, payload: { token: response.token, isLogged: true, isAdmin: response.user.isAdmin } });

            if (history.length > 0) history.goBack();
            else history.push('/');

        }).catch(error => {
            dispatch({ type: loginActions.FAILURE, payload: error.message })
        })
}

export const logout = (history:any) => (dispatch:any) => {

    dispatch({ type: logoutActions.REQUEST });

    postRequest(LOGOUT_URL,{}).then(response => {
        if (!response.success) {
            dispatch({ type: logoutActions.FAILURE, payload: {} });
        }

        window.localStorage.clear();
        dispatch({ type:"CLEAR"});
        dispatch({ type: logoutActions.SUCCESS, payload: { isLogged: false, isAdmin: false, token: "" } });
        history.push('/');
    });
}

export const requestStats = () => (dispatch:any) => {
    if (token)
        window.fetch('http://localhost:5000/auth/stat', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(response => {
                if(response.success)
                    dispatch({ type: loginActions.SUCCESS, payload: { token: token, isLogged: true, isAdmin: response.data?.isAdmin }});
            });
}

export function getInitialStat(dispatch:any) {
    dispatch(requestStats());
}