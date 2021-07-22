import { postRequest } from "../requests"
import { LOGIN_URL, LOGOUT_URL , REGISTER_URL } from '../urls';
import {loginActions , logoutActions  , registerActions} from '../store/reducers/authReducer';

const token = window.localStorage.getItem('token');

export const login = (username:string, password:string, history:any) => (dispatch:any) => {

    dispatch(loginActions.request());

    postRequest(LOGIN_URL, { username, password })
        .then(response => {
            if (!response.success) {
                dispatch(loginActions.failure(response.message));
                return;
            }

            window.localStorage.setItem('token', response.token);

            dispatch(loginActions.success({token: response.token, isLogged: true, isAdmin: response.user.isAdmin}));

            if (history.length > 0) history.goBack();
            else history.push('/');

        }).catch(error => {
            dispatch(loginActions.failure(error.message))
        })
}

export const logout = (history:any) => (dispatch:any) => {

    dispatch(logoutActions.request());

    postRequest(LOGOUT_URL,{}).then(response => {
        if (!response.success) {
            dispatch(logoutActions.failure());
        }

        window.localStorage.clear();
        dispatch({ type:"CLEAR"});
        dispatch(logoutActions.success({ isLogged: false, isAdmin: false, token: "" }));
        history.push('/');
    });
}

export const register = (username:string , password:string , email:string) => (dispatch:any) => {
    dispatch(registerActions.request());

    postRequest(REGISTER_URL ,{username , password , email})
        .then(response => {
            if(!response.success){
                dispatch(registerActions.failure());
                return;
            }

            dispatch(registerActions.success())
        })
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
                    dispatch(loginActions.success({ token: token, isLogged: true, isAdmin: response.data?.isAdmin }));
            });
}

export function getInitialStat(dispatch:any) {
    dispatch(requestStats());
}
