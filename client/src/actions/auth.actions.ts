import { postRequest } from "../requests"
import { LOGIN_URL, LOGOUT_URL , REGISTER_URL } from '../urls';
import {loginActions , logoutActions  , registerActions} from '../store/reducers/authReducer';

const token = window.localStorage.getItem('token');

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

export const register = (username:string , password:string , email:string) => (dispatch:any) => {
    dispatch({type:registerActions.REQUEST});

    postRequest(REGISTER_URL ,{username , password , email})
        .then(response => {
            if(!response.success){
                dispatch({type:registerActions.FAILURE});
                return;
            }

            dispatch({type:registerActions.SUCCESS})
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
                    dispatch({ type: loginActions.SUCCESS, payload: { token: token, isLogged: true, isAdmin: response.data?.isAdmin }});
            });
}

export function getInitialStat(dispatch:any) {
    dispatch(requestStats());
}