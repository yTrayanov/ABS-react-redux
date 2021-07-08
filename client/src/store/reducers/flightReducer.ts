import { getRequest, postRequest } from "../../requests";
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";
import { getFilterdFlightsUrl, CREATE_FLIGHT_URL } from '../../urls';

import IAction from "../../interfaces/action.interface";

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

const initialState = {
    filteredFlights: initialAsyncState,
    createFlight: initialAsyncState
}

const filteredFlightsActions: any = actionCreator("FILTERED_FLIGHTS");
const createFlightActions: any = actionCreator("CREATE_FLIGHT");

export const flightReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case filteredFlightsActions.REQUEST:
        case filteredFlightsActions.SUCCESS:
        case filteredFlightsActions.FAILURE:
            return { ...state, filteredFlights: reducerHandler(state.filteredFlights, action, filteredFlightsActions) };


        case createFlightActions.REQUEST:
        case createFlightActions.SUCCESS:
        case createFlightActions.FAILURE:
            return { ...state, createFlight: reducerHandler(state.createFlight, action, createFlightActions) };

        default:
            return state;
    }
}


export const getFilteredFlights = (state: any) => state.flights.filteredFlights.data?.flights;
export const getIsLoadingFilteredFlights = (state: any) => state.flights.filteredFlights.isLoading;
export const getIsCreatingFlight = (state: any) => state.flights.createFlight.isLoading;

export const requestFilteredFlights = (originAirport: string, destinationAirport: string, date: string) => (dispatch: any) => {
    dispatch({ type: filteredFlightsActions.REQUEST });


    getRequest(getFilterdFlightsUrl(originAirport, destinationAirport, date))
        .then(response => {
            if (!response.success) {
                dispatch({ type: filteredFlightsActions.FAILURE });
            }

            dispatch({ type: filteredFlightsActions.SUCCESS, payload: { flights: response.data } });
        })

}

export const requestCreateFlight = (originAirport: string, destinationAirport: string, airline: string, flightNumber: string, departureDate: string, clearForm: () => void) =>
    (dispatch: any) => {
        dispatch({ type: createFlightActions.REQUEST });
        postRequest(CREATE_FLIGHT_URL, { originAirport, destinationAirport, airline, flightNumber, departureDate })
            .then(response => {
                if (!response.success)
                    dispatch({ type: createFlightActions.FAILURE });

                dispatch({ type: createFlightActions.SUCCESS, payload: response });
                clearForm();
                alert('Flight created');
            })
    }