import { createSlice } from "@reduxjs/toolkit"
import { GetTargetState , initialAsyncState , success ,failure , request } from "../../utils/sliceUtils";
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