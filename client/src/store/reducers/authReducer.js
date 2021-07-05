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

const loginActions = actionCreator('LOGIN');
const registerActions = actionCreator('REGISTER');
const logoutActions = actionCreator('LOGOUT');

export function authReducer(state = initialState, action) {
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
            return { ...state, register: reducerHandler(state.logout, action, logoutActions) }

        case "SET_ADMIN":
            return { ...state, logStatus: { ...state.logStatus, payload: { ...state.logStatus.data, isAdmin: action.payload.isAdmin } } }

        default:
            return state;
    }
}

//logStatus shortcuts
export const getIsLogged = state => state.auth.logStatus.data.isLogged;
export const getIsAdmin = state => state.auth.logStatus.data.isAdmin;
export const getToken = state => state.auth.logStatus.data.token;
export const getLoggingIn = state => state.auth.logStatus.isLoading;
export const getLogginError = state => state.auth.logStatus.error;


export const getState = state => state.auth.logStatus;



export const login = (username, password, history) => (dispatch) => {

    dispatch({ type: loginActions.REQUEST, payload: {} })

    postRequest(LOGIN_URL, { username, password })
        .then(response => {
            if (!response.success) {
                dispatch({ type: loginActions.FAILURE, payload: response.message })
                return;
            }

            window.localStorage.setItem('token', response.token);

            dispatch({ type: loginActions.SUCCESS, payload: { token: response.token, isLogged: true, isAdmin: response.user.isAdmin } });

            if (history.length > 0)
                history.goBack();
            else
                history.push('/');

        }).catch(error => {
            dispatch({ type: loginActions.FAILURE, payload: error.message })
        })
}

export const logout = (history) => dispatch => {

    dispatch({ type: logoutActions.REQUEST });

    postRequest(LOGOUT_URL, {}).then(response => {
        if (!response.success) {
            dispatch({ type: logoutActions.FAILURE, payload: {} });
        }

        window.localStorage.clear();

        dispatch({ type: logoutActions.SUCCESS, payload: { isLogged: false, isAdmin: false, token: "" } });

        history.push('/');
    });
}