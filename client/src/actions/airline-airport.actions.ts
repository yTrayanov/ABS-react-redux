import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../requests";
import { CREATE_AIRLINE_URL, CREATE_AIRPORT_URL } from "../urls";



export const requestCreate = createAsyncThunk(
    'create/create',
    (data:{objectName:string ,objectType:'AIRPORT'| 'AIRLINE' }, thunkApi) => {

        const url:string = data.objectType === 'AIRPORT' ?  CREATE_AIRPORT_URL : CREATE_AIRLINE_URL;

        return postRequest(url, {name:data.objectName})
            .then(response => {
                return response.data
            }).catch(err => {
                return thunkApi.rejectWithValue(err.message);
            })
    })


export const actions = [
    requestCreate,
]
