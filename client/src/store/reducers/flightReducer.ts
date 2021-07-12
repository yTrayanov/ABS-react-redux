import { getRequest, postRequest } from "../../requests";
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";
import { getFilterdFlightsUrl, CREATE_FLIGHT_URL, ALL_FLIGHTS_URL , getFlightInformationUrl } from '../../urls';

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
}

const filteredFlightsActions: any = actionCreator("FILTERED_FLIGHTS");
const createFlightActions: any = actionCreator("CREATE_FLIGHT");
const allFlightsActions: any = actionCreator("All_Flights");
const flightInformationActions: any = actionCreator("FLIGHT_INFORMATION");

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

        default:
            return state;
    }
}


export const getFilteredFlights = (state: any) => state.flights.filteredFlights.data?.flights;
export const getIsLoadingFilteredFlights = (state: any) => state.flights.filteredFlights.isLoading;
export const getIsCreatingFlight = (state: any) => state.flights.createFlight.isLoading;
export const getAllFlights = (state: any) => state.flights.allFlights?.data;
export const getFlightInformation = (state:any) => state.flights.flightInformation?.data;


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

export const requestAllFlights = () => (dispatch: any) => {
    dispatch({ type: allFlightsActions.REQUEST });

    getRequest(ALL_FLIGHTS_URL).then(response => {
        if (!response.success) {
            dispatch({ type: allFlightsActions.FAILURE });
            return;
        }

        dispatch({ type: allFlightsActions.SUCCESS, payload: response.data });
    })
}

export const requestFlightInformation = (id: string) => (dispatch: any) => {
    dispatch({type:flightInformationActions.REQUEST});

    const url = getFlightInformationUrl(id);

    getRequest(url).then(response => {
        if(!response.success){
            dispatch({type:flightInformationActions.FAILURE});
            return;
        }
        dispatch({type:flightInformationActions.SUCCESS , payload:response.data});

    })
}