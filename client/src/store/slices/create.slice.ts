import { createSlice } from "@reduxjs/toolkit"

import { actions } from '../../actions/airline-airport.actions';
import { generateActionCases , initialAsyncState } from "../../utils/sliceUtils";

const createAirlineAirportSlice= createSlice({
    name: "create",
    initialState: {
        create:initialAsyncState,
    },
    reducers: {},
    extraReducers: (builder) => {
        generateActionCases(builder , actions)
    }
});


//selectors
export const getIsCreating = ({create:{create}}:any) => create.data?.isLoading;
export const getCreateError = ({create:{create}}:any) => create.error;

export default createAirlineAirportSlice;