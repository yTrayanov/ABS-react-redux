import { getRequest , postRequest } from "../requests";
import { getFlightDetailsUrl , getFilterdFlightsUrl , CREATE_FLIGHT_URL,ALL_FLIGHTS_URL, getFlightInformationUrl} from "../urls";
import { getFlightActions , filteredFlightsActions , createFlightActions,allFlightsActions , flightInformationActions } from "../store/reducers/flightReducer";


export const requestFlightById = (id:string) => (dispatch:any) => {
    dispatch({ type: getFlightActions.REQUEST });

    const url = getFlightDetailsUrl(id);
    getRequest(url).then((response) => {
        if (!response.success) {
            dispatch({ type: getFlightActions.FAILURE });
            return;
        }

        dispatch({ type: getFlightActions.SUCCESS, payload: response.data });
    })
}

export const requestFilteredFlights = (originAirport: string, destinationAirport: string, departureDate: string, returnDate?: string, membersCount?: string) => (dispatch: any) => {
    dispatch({ type: filteredFlightsActions.REQUEST });

    if (!membersCount) membersCount = '1';

    getRequest(getFilterdFlightsUrl(originAirport, destinationAirport, departureDate, membersCount, returnDate))
        .then(response => {
            if (!response.success) {
                dispatch({ type: filteredFlightsActions.FAILURE });
            }
            dispatch({ type: filteredFlightsActions.SUCCESS, payload: response.data });
        })

}

export const requestCreateFlight = (originAirport: string, destinationAirport: string, airline: string, flightNumber: string, departureDate: string, landingDate: string, clearForm: () => void) =>
    (dispatch: any) => {
        dispatch({ type: createFlightActions.REQUEST });
        postRequest(CREATE_FLIGHT_URL, { originAirport, destinationAirport, airline, flightNumber, departureDate, landingDate })
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
    dispatch({ type: flightInformationActions.REQUEST });

    const url = getFlightInformationUrl(id);

    getRequest(url).then(response => {
        if (!response.success) {
            dispatch({ type: flightInformationActions.FAILURE });
            return;
        }
        dispatch({ type: flightInformationActions.SUCCESS, payload: response.data });

    })
}