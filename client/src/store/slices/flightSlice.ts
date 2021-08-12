import { createSlice } from "@reduxjs/toolkit"
import { GetTargetState , initialAsyncState , success,failure , request } from "../../utils/sliceUtils";

import { actions } from '../../actions/flight.actions';

const flightSlice = createSlice({
    name: "flights",
    initialState: {
        filterFlights: initialAsyncState,
        flightsByIds: initialAsyncState,
        createFlight: initialAsyncState,
        allFlights: initialAsyncState,
        flightInfo: initialAsyncState,
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
export const getFilteredFlights = (state: any) => state.flights.filterFlights.data;
export const getIsLoadingFilteredFlights = (state: any) => state.flights.filterFlights.isLoading;

export const getFlightsByIds = (state: any) => state.flights.flightsByIds.data;
export const getIsGettingFlightsByIds = (state: any) => state.flights.flightsByIds.isLoading;

export const getIsCreatingFlight = (state: any) => state.flights.createFlight.isLoading;
export const getHasCreatedFlight = (state: any) => state.flights.createFlight.loaded;

export const getAllFlights = (state: any) => state.flights.allFlights.data;

export const getFlightInformation = (state: any) => state.flights.flightInfo?.data;

export default flightSlice;