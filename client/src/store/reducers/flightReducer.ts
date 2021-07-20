import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";

import IAction from "../../interfaces/action.interface";

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

const initialState = {
    filteredFlights: initialAsyncState,
    createFlight: initialAsyncState,
    allFlights: initialAsyncState,
    flightInformation: initialAsyncState,
    getFlight:initialAsyncState,
    setFlights:initialAsyncState,
}

export const filteredFlightsActions: any = actionCreator("FILTERED_FLIGHTS");
export const createFlightActions: any = actionCreator("CREATE_FLIGHT");
export const allFlightsActions: any = actionCreator("All_Flights");
export const flightInformationActions: any = actionCreator("FLIGHT_INFORMATION");
export const getFlightActions: any = actionCreator("GET_FLIGHT");

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

        case allFlightsActions.REQUEST:
        case allFlightsActions.SUCCESS:
        case allFlightsActions.FAILURE:
            return { ...state, allFlights: reducerHandler(state.allFlights, action, allFlightsActions) };

        case flightInformationActions.REQUEST:
        case flightInformationActions.SUCCESS:
        case flightInformationActions.FAILURE:
            return { ...state, flightInformation: reducerHandler(state.flightInformation, action, flightInformationActions) };

        case getFlightActions.REQUEST:
        case getFlightActions.SUCCESS:
        case getFlightActions.FAILURE:
            return { ...state, getFlight: reducerHandler(state.getFlight, action, getFlightActions) };
        case getFlightActions.CLEAR:
            return {...state , getFlight:reducerHandler(initialAsyncState , action , getFlightActions)}

        default:
            return state;
    }
}


export const getFilteredFlights = (state: any) => state.flights.filteredFlights.data;
export const getIsLoadingFilteredFlights = (state: any) => state.flights.filteredFlights.isLoading;
export const getIsCreatingFlight = (state: any) => state.flights.createFlight.isLoading;
export const getAllFlights = (state: any) => state.flights.allFlights?.data;
export const getFlightInformation = (state: any) => state.flights.flightInformation?.data;
export const getFlight = (state:any) => state.flights.getFlight.data;
