import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../requests";
import { CREATE_SECTION_URL } from "../urls";

interface ICreateSectionModel{
    rows:number;
    columns:number;
    seatClass:string; 
    flightNumber:string; 
}

export const requestCreateSection = createAsyncThunk(
    'sections/createSection',
    (data:ICreateSectionModel , thunkApi) => {
        return postRequest(CREATE_SECTION_URL, data)
            .then(response => response.data )
            .catch(err => {
                return thunkApi.rejectWithValue(err.message);
            })
    })


export const actions = [
    requestCreateSection
]
