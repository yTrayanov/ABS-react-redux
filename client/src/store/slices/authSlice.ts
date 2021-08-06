import { createSlice } from "@reduxjs/toolkit"

import {
    requestLogin,
    requestLogout,
    requestRegister,
    requestStats,
    requestForgottenPassword,
    requestChangePassword
} from "../../actions/auth.actions";

import { actions } from '../../actions/auth.actions';

const token = window.localStorage.getItem('token');

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

function GetTargetState(state: any, action: any) {
    const logStatusUsers = [requestLogin.typePrefix, requestLogout.typePrefix, requestStats.typePrefix];

    for (const type of logStatusUsers) {
        if (action.type.includes(type)) {
            return state.logStatus;
        }
    }
    if (action.type.includes(requestRegister.typePrefix))
        return state.register;
    else if (action.type.includes(requestForgottenPassword.typePrefix))
        return state.forgottenPassword;
    else if (action.type.includes(requestChangePassword.typePrefix))
        return state.changePassword;

}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        logStatus: {
            ...initialAsyncState, data: {
                isLogged: token ? true : false,
                isAdmin: false,
                token: token
            }
        },
        register: initialAsyncState,
        forgottenPassword: initialAsyncState,
        changePassword: initialAsyncState
    },
    reducers: {},
    extraReducers: (builder) => {
        for (let item of actions) {
            (() => {
                builder.addCase((item.fulfilled), (state, action) => {

                    const targetState = GetTargetState(state, action);
                    success(targetState, action);
                });
                builder.addCase((item.rejected), (state, action) => {
                    const targetState = GetTargetState(state , action);
                    failure(targetState, action);
                });
                builder.addCase((item.pending), (state , action) => {
                    const targetState = GetTargetState(state , action);
                    request(targetState);
                });
            })();
        }
    }
});

function success(state: any, action: any) {
    state.isLoading = false;
    state.data = action.payload;
    state.error = null;
    state.loaded = true
}

function failure(state: any, action: any) {
    state.isLoading = false;
    state.error = action.payload;
    state.loaded = false;
}
function request(state: any) {
    state.isLoading = true;
    state.loaded = false;
}



//Log status selectors
export const getIsLogged = (state: any) => state.auth.logStatus.data.isLogged;
export const getIsAdmin = (state: any) => state.auth.logStatus.data.isAdmin;
export const getToken = (state: any) => state.auth.logStatus.data.token;
export const getIsLogging = (state: any) => state.auth.logStatus.isLoading;
export const getLogginError = (state: any) => state.auth.logStatus.error;

export const getState = (state: any) => state.auth;


//register status selectors
export const getIsRegistering = (state: any) => state.auth.register.isLoading;
export const getHasRegistered = (state: any) => state.auth.register.loaded;

//Forgotten password and changing email selectors
export const getIsSendingEmail = (state: any) => state.auth.forgottenPassword.isLoading;
export const getIsChangingPassowrd = (state: any) => state.auth.changePassword.isLoading;
export const getHasChangedPassword = (state:any) => state.auth.changePassword.loaded;




export default authSlice;