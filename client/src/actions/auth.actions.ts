import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../requests";
import { clearAuthSlice } from "../store/slices/auth.slice";
import { clearFlightSlice } from "../store/slices/flight.slice";
import { clearSectionSlice } from "../store/slices/section.slice";
import { clearTicketSlice } from "../store/slices/ticket.slice";
import { FORGOTTEN_PASSWORD_URL, getChangePasswordUrl, LOGIN_URL, LOGOUT_URL, REGISTER_URL, STAT_URL } from "../urls";

export const requestLogin = createAsyncThunk(
    'auth/logStatus/login',
    (data: { username: string, password: string }, thunkApi) => {
        return postRequest(LOGIN_URL, data).then(response => {
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
        return getRequest(LOGOUT_URL).then(() => {
            window.localStorage.clear();
            clearStore(thunkApi.dispatch);
        }).catch(err => {
            return thunkApi.rejectWithValue(err.message);
        })
    })

export const requestRegister = createAsyncThunk(
    'auth/register',
    (data: { username: string, email: string, password: string}, thunkApi) => {
        return postRequest(REGISTER_URL,data).catch(err => {
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
    (data: { email: string}, thunkApi) => {
        return postRequest(FORGOTTEN_PASSWORD_URL, data).catch(err => {
            return thunkApi.rejectWithValue(err.message);
        });
    }
)

export const requestChangePassword = createAsyncThunk(
    'auth/changePassword',
    (data: { password: string, requestId: string }, thunkApi) => {
        const { password, requestId } = data;
        return postRequest(getChangePasswordUrl(requestId), { password }).catch(err => {
            return thunkApi.rejectWithValue(err.message);
        });
    }
)

function clearStore(dispatch:any){
    dispatch(clearAuthSlice());
    dispatch(clearFlightSlice());
    dispatch(clearSectionSlice());
    dispatch(clearTicketSlice());
}


export const actions = [
    requestLogin,
    requestLogout,
    requestStats,
    requestRegister,
    requestForgottenPassword,
    requestChangePassword
];