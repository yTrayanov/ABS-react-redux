import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../requests";
import { LOGIN_URL, LOGOUT_URL } from "../urls";

export const requestLogin = createAsyncThunk(
    'auth/login',
    (data:object, thunkApi ) => {
       return postRequest(LOGIN_URL , data).then(response => {
           checkResponse(response , thunkApi);

           window.localStorage.setItem('token', response.data.token)
           response.data.isLogged = true;
            return response.data;
       }).catch(err => {
           thunkApi.rejectWithValue(err.message);
       });
    }
)

export const requestLogout = createAsyncThunk( 'auth/logout', (data?:object , thunkApi?):any => {
    return getRequest(LOGOUT_URL).then(response => {
        checkResponse(response , thunkApi)

        window.localStorage.clear();
        return { isLogged: false, isAdmin: false, token: "" };
    }).catch(err => {
        thunkApi.rejectWithValue(err.message);
    })
})


function checkResponse(response:any ,thunkApi:any){
    if(!response.success)
        thunkApi.rejectWithValue(response.message);
}