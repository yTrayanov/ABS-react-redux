import { postRequest } from "../requests"
import { LOGIN_URL, LOGOUT_URL, REGISTER_URL, FORGOTTEN_PASSWORD_URL, getChangePasswordUrl } from '../urls';
import { changingPasswordActions, forgottenPasswordActions, loginActions, logoutActions, registerActions } from '../store/reducers/authReducer';

export const login = (username: string, password: string, history: any) => (dispatch: any) => {

    dispatch(loginActions.request());

    postRequest(LOGIN_URL, { username, password })
        .then(response => {
            if (!response.success) {
                dispatch(loginActions.failure(response.message));
                return;
            }

            window.localStorage.setItem('token', response.token);

            dispatch(loginActions.success({ token: response.token, isLogged: true, isAdmin: response.user.isAdmin }));

            if (history.length > 0) history.goBack();
            else history.push('/');

        }).catch(error => {
            dispatch(loginActions.failure(error.message))
        })
}

export const logout = () => (dispatch: any) => {

    dispatch(logoutActions.request());

    postRequest(LOGOUT_URL, {}).then(response => {
        if (!response.success) {
            dispatch(logoutActions.failure());
        }

        window.localStorage.clear();
        dispatch({ type: "CLEAR" });
        dispatch(logoutActions.success({ isLogged: false, isAdmin: false, token: "" }));
    });
}

export const register = (username: string, password: string, email: string) => (dispatch: any) => {
    dispatch(registerActions.request());

    postRequest(REGISTER_URL, { username, password, email })
        .then(response => {
            if (!response.success) {
                dispatch(registerActions.failure());
                return;
            }

            dispatch(registerActions.success())
        })
}

export const requestStats = () => (dispatch: any) => {

    const token = window.localStorage.getItem('token');

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
                if (response.success)
                    dispatch(loginActions.success({ token: token, isLogged: true, isAdmin: response.data?.isAdmin }));
            });
}

export function getInitialStat(dispatch: any) {
    dispatch(requestStats());
}

export const requestForgottenPassword = (email: string, setEmailLink: any) => (dispatch: any) => {
    dispatch(forgottenPasswordActions.request());

    postRequest(FORGOTTEN_PASSWORD_URL, { email }).then(response => {
        if (!response.success){
            dispatch(forgottenPasswordActions.failure());
            return;
        }

        dispatch(forgottenPasswordActions.success());
        setEmailLink(response.data);
    })
}

export const requestChangePassword = (password:string , requestId:string) => (dispatch:any) => {
    dispatch(changingPasswordActions.request());

    postRequest(getChangePasswordUrl(requestId) , {password}).then(response => {
        if(!response.success){
            dispatch(changingPasswordActions.failure());
            return;
        }

        dispatch(changingPasswordActions.success());
    })
}
