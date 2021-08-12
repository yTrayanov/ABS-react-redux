import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../requests";
import { FORGOTTEN_PASSWORD_URL, getChangePasswordUrl, LOGIN_URL, LOGOUT_URL, REGISTER_URL, STAT_URL } from "../urls";
import { checkResponse } from "../utils/responseUtils";

export const requestLogin = createAsyncThunk(
    'auth/logStatus/login',
    (data: { username: string, password: string }, thunkApi) => {
        return postRequest(LOGIN_URL, data).then(response => {
            checkResponse(response);

            window.localStorage.setItem('token', response.data.token)
            response.data.isLogged = true;
            return response.data;
        }).catch(err => {
            return thunkApi.rejectWithValue(err.message);
        });
    }
)

export const requestLogout = createAsyncThunk(
    'auth/logStatus/logout',
    (data?: any, thunkApi?): any => {
        return getRequest(LOGOUT_URL).then(response => {
            checkResponse(response)

            window.localStorage.clear();
            return { isLogged: false, isAdmin: false, token: "" };
        }).catch(err => {
            return thunkApi.rejectWithValue(err.message);
        })
    })

export const requestRegister = createAsyncThunk(
    'auth/register',
    (data: { username: string, email: string, password: string }, thunkApi) => {
        return postRequest(REGISTER_URL, data).then(response => {
            checkResponse(response);
        }).catch(err => {
            return thunkApi.rejectWithValue(err.message);
        })
    }
)

export const requestStats = createAsyncThunk(
    'auth/logStatus/stat',
    (data?, thunkApi?) => {
        const token = window.localStorage.getItem('token');

        if (token)
            return getRequest(STAT_URL)
                .then(response => {
                    if (response.success)
                        return { token: token, isLogged: true, isAdmin: response.data.isAdmin };
                }).catch(err => {
                    return thunkApi.rejectWithValue(err.message);
                });

        return thunkApi.rejectWithValue(null);
    }
)

export function getInitialStat(dispatch: any) {
    dispatch(requestStats());
}

export const requestForgottenPassword = createAsyncThunk(
    'auth/forgottenPassword',
    (data: { email: string, setEmailLink: (link: string) => void }, thunkApi) => {

        const { email, setEmailLink } = data;
        postRequest(FORGOTTEN_PASSWORD_URL, { email }).then(response => {
            checkResponse(response);

            setEmailLink(response.data);
        }).catch(err => {
            return thunkApi.rejectWithValue(err.message);
        });
    }
)

export const requestChangePassword = createAsyncThunk(
    'auth/changePassword',
    (data: { password: string, requestId: string }, thunkApi) => {
        const { password, requestId } = data;
        postRequest(getChangePasswordUrl(requestId), { password }).then(response => {
            checkResponse(response);

        }).catch(err => {
            return thunkApi.rejectWithValue(err.message);
        });
    }
)

export const actions = [
    requestLogin,
    requestLogout,
    requestStats,
    requestRegister,
    requestForgottenPassword,
    requestChangePassword
];