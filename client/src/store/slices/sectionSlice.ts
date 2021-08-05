import { createSlice } from "@reduxjs/toolkit"

import {
    requestCreateSection
} from "../../actions/section.actions";

import { actions } from '../../actions/section.actions';

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

function GetTargetState(state: any, action: any) {

    if (action.type.includes(requestCreateSection.typePrefix))
        return state.createSection;
    else
        return state.generalState;

}

const sectionSlice = createSlice({
    name: "sections",
    initialState: {
        createSection:initialAsyncState,
        generalState:initialAsyncState,
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
                    const targetState = GetTargetState(state, action);
                    failure(targetState, action);
                });
                builder.addCase((item.pending), (state, action) => {
                    const targetState = GetTargetState(state, action);
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


//selectors
export const getIsCreatingSection = (state:any) => state.sections.createSection.isLoading;
export const getHasCreatedSection = (state:any) => state.sections.createSection.loaded;
export const getCreateSectionError = (state:any) => state.sections.createSection.error;


export default sectionSlice;