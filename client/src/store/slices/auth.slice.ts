import { createSlice } from "@reduxjs/toolkit"
import {initialAsyncState ,generateActionCases } from "../../utils/sliceUtils";
import { actions } from '../../actions/auth.actions';

const token = window.localStorage.getItem('token');

const initialState =  {
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
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthSlice:(state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        generateActionCases(builder , actions);
    }
});

//Log status selectors
export const getIsLogged = ({auth:{logStatus}}:any) => logStatus.data?.isLogged;
export const getIsAdmin = ({auth:{logStatus}}:any)  => logStatus.data?.isAdmin;
export const getToken = ({auth:{logStatus}}:any)  => logStatus.data?.token;
export const getIsLogging = ({auth:{logStatus}}:any)  => logStatus.isLoading;
export const getLogginError = ({auth:{logStatus}}:any)  => logStatus.error;


//register status selectors
export const getIsRegistering = ({auth:{register}}: any) => register.isLoading;

//Forgotten password and changing email selectors
export const getIsSendingEmail = ({auth:{forgottenPassword}}: any) => forgottenPassword.isLoading;
export const getIsChangingPassowrd = ({auth:{changePassword}}: any) => changePassword.isLoading;

export const {clearAuthSlice} = authSlice.actions;

export default authSlice;