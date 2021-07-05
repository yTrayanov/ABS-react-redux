import { getRequest } from "../../requests";
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";
import { getFilterdFlightsUrl } from '../../urls';

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

const initialState = {
    filteredFlights: initialAsyncState,
}

const filteredFlightsActions = actionCreator("FILTERED_FLIGHTS");

export const flightReducer = (state = initialState, action) => {
    switch (actionCreator.type) {
        case filteredFlightsActions.REQUEST:
        case filteredFlightsActions.SUCCESS:
        case filteredFlightsActions.FAILURE:
            return { ...state, filteredFlights: reducerHandler(state.filteredFlights, action, filteredFlightsActions) };
        default:
            return state;
    }
}


export const getFilteredFlights = state => state.flights.filteredFlights.data?.flights;

export const requestFilteredFlights = (originAirport , destinationAirport , date , setFlights) => dispatch => {
    dispatch({type:filteredFlightsActions.REQUEST});

    getRequest(getFilterdFlightsUrl(originAirport , destinationAirport , date))
        .then(response => {
            if(!response.success){
                dispatch({type: filteredFlightsActions.FAILURE});
            }
            dispatch({type:filteredFlightsActions.SUCCESS , payload:{flights: response.data}});
            setFlights(response.data);
        })

}