import { createSlice } from "@reduxjs/toolkit"

import {
    requestLogin,
    requestLogout,
    requestRegister,
    requestStats,
    requestForgottenPassword,
    requestChangePassword
} from "../../actionsWithRTK/auth.actions";

const token = window.localStorage.getItem('token');

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
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
        forgottenPassword:initialAsyncState,
        changePassword:initialAsyncState
    },
    reducers: {},
    extraReducers: (builder) => {
        //login actions
        (() => {
            builder.addCase((requestLogin.fulfilled), ({ logStatus }, action) => {
                success(logStatus, action);
            });
            builder.addCase((requestLogin.rejected), ({ logStatus }, action) => {
                failure(logStatus, action);
            });
            builder.addCase((requestLogin.pending), ({ logStatus }) => {
                request(logStatus)
            });
        })();

        //logout actions
        (() => {
            (() => {
                builder.addCase(requestLogout.fulfilled, ({ logStatus }, action) => {
                    success(logStatus, action);
                });
                builder.addCase(requestLogout.rejected, ({ logStatus }, action) => {
                    failure(logStatus, action);
                });
                builder.addCase(requestLogout.pending, ({ logStatus }) => {
                    request(logStatus)
                });
            })();
        })();

        //register actions
        (() => {
            (() => {
                builder.addCase(requestRegister.fulfilled, ({ register }, action) => {
                    success(register, action);
                });
                builder.addCase(requestRegister.rejected, ({ register }, action) => {
                    failure(register, action);
                });
                builder.addCase(requestRegister.pending, ({ register }) => {
                    request(register)
                });
            })();
        })();

        //stat actions
        (() => {
            builder.addCase((requestStats.fulfilled), ({ logStatus }, action) => {
                success(logStatus, action);
            });
            builder.addCase((requestStats.rejected), ({ logStatus }, action) => {
                failure(logStatus, action);
            });
            builder.addCase((requestStats.pending), ({ logStatus }) => {
                request(logStatus)
            });
        })();

        //ForgottenPassword actions
        (() => {
            builder.addCase((requestForgottenPassword.fulfilled), ({ forgottenPassword }, action) => {
                success(forgottenPassword, action);
            });
            builder.addCase((requestForgottenPassword.rejected), ({ forgottenPassword }, action) => {
                failure(forgottenPassword, action);
            });
            builder.addCase((requestForgottenPassword.pending), ({ forgottenPassword }) => {
                request(forgottenPassword)
            });
        })();

        //ChangePassword actions
        (() => {
            builder.addCase((requestChangePassword.fulfilled), ({ changePassword }, action) => {
                success(changePassword, action);
            });
            builder.addCase((requestChangePassword.rejected), ({ changePassword }, action) => {
                failure(changePassword, action);
            });
            builder.addCase((requestChangePassword.pending), ({ changePassword}) => {
                request(changePassword)
            });
        })();

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

export const getState = (state:any) => state.auth;


//register status selectors
export const getIsRegistering = (state: any) => state.auth.register.isLoading;
export const getHasRegistered = (state: any) => state.auth.register.loaded;

//Forgotten password and changing email selectors
export const getIsSendingEmail = (state:any) => state.auth.forgottenPassword.isLoading;
export const getIsChangingPassowrd = (state:any) => state.auth.changePassword.isLoading;




export default authSlice;