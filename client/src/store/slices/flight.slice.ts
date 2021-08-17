import { createSlice } from "@reduxjs/toolkit"
import { initialAsyncState , generateActionCases } from "../../utils/sliceUtils";

import { actions } from '../../actions/flight.actions';

const initialState = {
    filterFlights: initialAsyncState,
    flightsByIds: initialAsyncState,
    createFlight: initialAsyncState,
    allFlights: initialAsyncState,
    flightInfo: initialAsyncState,
}

const flightSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        clearFlightSlice:(state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        generateActionCases(builder , actions);
    }
});

//selectors
export const getFilteredFlights = ({flights:{filterFlights}}: any) => filterFlights.data;
export const getIsLoadingFilteredFlights = ({flights:{filterFlights}}: any) => filterFlights.isLoading;

export const getFlightsByIds = ({flights:{flightsByIds}}: any) => flightsByIds.data;
export const getIsGettingFlightsByIds = ({flights:{flightsByIds}}: any) => flightsByIds.isLoading;

export const getIsCreatingFlight = ({flights:{createFlight}}: any) => createFlight.isLoading;
export const getHasCreatedFlight = ({flights:{createFlight}}: any) => createFlight.loaded;

export const getAllFlights = ({flights:{allFlights}}: any) => allFlights.data;

export const getFlightInformation = ({flights:{flightInfo}}: any) => flightInfo?.data;

export const {clearFlightSlice} = flightSlice.actions;

export default flightSlice;