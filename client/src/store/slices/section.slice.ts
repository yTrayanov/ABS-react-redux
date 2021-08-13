import { createSlice } from "@reduxjs/toolkit"
import { GetTargetState , initialAsyncState , success , failure , request } from "../../utils/sliceUtils";

import { actions } from '../../actions/section.actions';

const initialState = {
    createSection:initialAsyncState
}

const sectionSlice = createSlice({
    name: "sections",
    initialState,
    reducers: {
        clearSectionSlice:(state) => {
            state = initialState
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

//selectors
export const getIsCreatingSection = ({sections:{createSection}}:any) => createSection.isLoading;
export const getHasCreatedSection = ({sections:{createSection}}:any) => createSection.loaded;
export const getCreateSectionError = ({sections:{createSection}}:any) => createSection.error;

export const {clearSectionSlice} = sectionSlice.actions;
export default sectionSlice;