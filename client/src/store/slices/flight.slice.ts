import { createSlice } from "@reduxjs/toolkit"
import { GetTargetState , initialAsyncState , success,failure , request } from "../../utils/sliceUtils";

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