import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../requests";
import { CREATE_SECTION_URL } from "../urls";
import { checkResponse } from "../utils/responseUtils";

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
            .then(response => {
                checkResponse(response);
                return response.data;

            }).catch(err => {
                return thunkApi.rejectWithValue(err.message);
            })
    })


export const actions = [
    requestCreateSection
]
