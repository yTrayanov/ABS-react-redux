import { getRequest, postRequest } from "../../requests";
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";
import { getFilterdFlightsUrl, CREATE_FLIGHT_URL } from '../../urls';

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

const filteredFlightsActions = actionCreator("FILTERED_FLIGHTS");
const createFlightActions = actionCreator("CREATE_FLIGHT");

export const flightReducer = (state = initialState, action) => {
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


export const getFilteredFlights = state => state.flights.filteredFlights.data?.flights;

export const requestFilteredFlights = (originAirport, destinationAirport, date) => (dispatch) => {
    dispatch({ type: filteredFlightsActions.REQUEST });


    getRequest(getFilterdFlightsUrl(originAirport, destinationAirport, date))
        .then(response => {
            if (!response.success) {
                dispatch({ type: filteredFlightsActions.FAILURE });
            }

            dispatch({ type: filteredFlightsActions.SUCCESS, payload: { flights: response.data } });
        })

}

export const requestCreateFlight = (originAirport, destinationAirport, airline, flightNumber, departureDate, callback) => dispatch => {
    dispatch({ type: createFlightActions.REQUEST });
    postRequest(CREATE_FLIGHT_URL, { originAirport, destinationAirport, airline, flightNumber, departureDate })
        .then(response => {
            if (!response.success)
                dispatch({ type: createFlightActions.FAILURE });

            dispatch({ type: createFlightActions.SUCCESS, payload: response });
            callback();
        })
}