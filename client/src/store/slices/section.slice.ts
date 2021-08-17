import { createSlice } from "@reduxjs/toolkit"
import { initialAsyncState ,generateActionCases } from "../../utils/sliceUtils";

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
        generateActionCases(builder , actions);
    }
});

//selectors
export const getIsCreatingSection = ({sections:{createSection}}:any) => createSection.isLoading;
export const getHasCreatedSection = ({sections:{createSection}}:any) => createSection.loaded;
export const getCreateSectionError = ({sections:{createSection}}:any) => createSection.error;

export const {clearSectionSlice} = sectionSlice.actions;
export default sectionSlice;