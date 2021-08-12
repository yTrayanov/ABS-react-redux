import { createSlice } from "@reduxjs/toolkit"
import { GetTargetState , initialAsyncState , success , failure , request } from "../../utils/sliceUtils";

import { actions } from '../../actions/section.actions';

const sectionSlice = createSlice({
    name: "sections",
    initialState: {
        createSection:initialAsyncState,
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

//selectors
export const getIsCreatingSection = (state:any) => state.sections.createSection.isLoading;
export const getHasCreatedSection = (state:any) => state.sections.createSection.loaded;
export const getCreateSectionError = (state:any) => state.sections.createSection.error;


export default sectionSlice;