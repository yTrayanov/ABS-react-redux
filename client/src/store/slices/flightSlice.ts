import { createSlice } from "@reduxjs/toolkit"

import {
    requestFilteredFlights,
    requestFlightsByIds,
    requestCreateFlight,
    requestAllFlights,
    requestFlightInformation
} from "../../actions/flight.actions";

import { actions } from '../../actions/flight.actions';

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

function GetTargetState(state: any, action: any) {

    if (action.type.includes(requestFilteredFlights.typePrefix))
        return state.filteredFlights;
    else if (action.type.includes(requestFlightsByIds.typePrefix))
        return state.flightsById;
    else if (action.type.includes(requestCreateFlight.typePrefix))
        return state.createFlight;
    else if (action.type.includes(requestAllFlights.typePrefix))
        return state.allFlights;
    else if (action.type.includes(requestFlightInformation.typePrefix))
        return state.flightInformation;
    else
        return state.generalState;

}

const flightSlice = createSlice({
    name: "flights",
    initialState: {
        filteredFlights: initialAsyncState,
        flightsById: initialAsyncState,
        createFlight: initialAsyncState,
        allFlights: initialAsyncState,
        flightInformation: initialAsyncState,
        generalState: initialAsyncState
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
export const getFilteredFlights = (state: any) => state.flights.filteredFlights.data;
export const getIsLoadingFilteredFlights = (state: any) => state.flights.filteredFlights.isLoading;

export const getFlightsByIds = (state: any) => state.flights.flightsById.data;
export const getIsGettingFlightsByIds = (state: any) => state.flights.flightsById.isLoading;

export const getIsCreatingFlight = (state: any) => state.flights.createFlight.isLoading;
export const getHasCreatedFlight = (state: any) => state.flights.createFlight.loaded;

export const getAllFlights = (state: any) => state.flights.allFlights.data;

export const getFlightInformation = (state: any) => state.flights.flightInformation?.data;

export default flightSlice;