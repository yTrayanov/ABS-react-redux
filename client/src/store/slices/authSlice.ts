import { createSlice } from "@reduxjs/toolkit"

import { requestLogin , requestLogout } from "../../actionsWithRTK/auth.actions";

const token = window.localStorage.getItem('token');

const initialAsyncState = {
    isLoading:false,
    loaded:false,
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
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        //login states
        (() => {
            builder.addCase(requestLogin.fulfilled , ({logStatus} , action) => {
             success(logStatus , action);
         });
         builder.addCase(requestLogin.rejected,({logStatus} , action) => {
             failure(logStatus , action);
         });
         builder.addCase(requestLogin.pending , ({logStatus}) => {
             request(logStatus)
         });
        })();

        //logout actions
        (() => {
            (() => {
                builder.addCase(requestLogout.fulfilled , ({logStatus} , action) => {
                 success(logStatus , action);
             });
             builder.addCase(requestLogout.rejected,({logStatus} , action) => {
                 failure(logStatus , action);
             });
             builder.addCase(requestLogout.pending , ({logStatus}) => {
                 request(logStatus)
             });
            })();
        })();
    }
});

function success(state:any , action:any){
    state.isLoading = false;
    state.data = action.payload;
    state.error = null;
    state.loaded =true
}

function failure(state:any , action:any){
    state.isLoading = false;
    state.error = action.payload;
}
function request(state:any){
    state.isLoading = true;
    state.loaded = false;
}

//Log status selectors
export const getIsLogged = (state:any) => state.auth.logStatus.data.isLogged;
export const getIsAdmin = (state:any) => state.auth.logStatus.data.isAdmin;
export const getToken = (state: any) => state.auth.logStatus.data.token;
export const getIsLogging = (state: any) => state.auth.logStatus.isLoading;
export const getLogginError = (state: any) => state.auth.logStatus.error;

export const getState = (state:any) => state.auth.logStatus;



export default authSlice;