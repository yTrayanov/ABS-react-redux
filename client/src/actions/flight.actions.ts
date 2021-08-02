import { getRequest , postRequest } from "../requests";
import { getFlightDetailsUrl , getFilterdFlightsUrl , CREATE_FLIGHT_URL,ALL_FLIGHTS_URL, getFlightInformationUrl} from "../urls";
import { getFlightsByIdsActions , filteredFlightsActions , createFlightActions,allFlightsActions , flightInformationActions } from "../store/reducers/flightReducer";


export const requestFlightsByIds = (ids:string[]) => (dispatch:any) => {
    dispatch(getFlightsByIdsActions.request());

    const url = getFlightDetailsUrl(ids);
    getRequest(url).then((response) => {
        if (!response.success) {
            dispatch(getFlightsByIdsActions.failure());
            return;
        }

        dispatch(getFlightsByIdsActions.success(response.data));
    }).catch(err => {
        dispatch(getFlightsByIdsActions.failure(err.message));
    })
}

export const requestFilteredFlights = (originAirport: string, destinationAirport: string, departureDate: string, returnDate?: string, membersCount?: string) => (dispatch: any) => {

    dispatch(filteredFlightsActions.request());

    if (!membersCount) membersCount = '1';

    getRequest(getFilterdFlightsUrl(originAirport, destinationAirport, departureDate, membersCount, returnDate))
        .then(response => {
            if (!response.success) {
                dispatch(filteredFlightsActions.failure());
            }

            console.log(response);
            dispatch(filteredFlightsActions.success(response.data));
        })
        .catch(err => {
            dispatch(filteredFlightsActions.failure(err.message));
        })

}

export const requestCreateFlight = (originAirport: string, destinationAirport: string, airline: string, flightNumber: string, departureDate: string, landingDate: string, clearForm: () => void) =>
    (dispatch: any) => {
        dispatch(createFlightActions.request());
        postRequest(CREATE_FLIGHT_URL, { originAirport, destinationAirport, airline, flightNumber, departureDate, landingDate })
            .then(response => {
                if (!response.success)
                    dispatch(createFlightActions.failure() );

                dispatch(createFlightActions.success(response));
                clearForm();
                alert('Flight created');
            }).catch(err => {
                dispatch(createFlightActions.failure(err.message));
            })
    }

export const requestAllFlights = () => (dispatch: any) => {
    dispatch(allFlightsActions.request());

    getRequest(ALL_FLIGHTS_URL).then(response => {
        if (!response.success) {
            dispatch(allFlightsActions.failure());
            return;
        }

        dispatch(allFlightsActions.success(response.data));
    }).catch(err => {
        dispatch(allFlightsActions.failure(err.message));
    })
}

export const requestFlightInformation = (id: string) => (dispatch: any) => {
    dispatch(flightInformationActions.request());

    const url = getFlightInformationUrl(id);

    getRequest(url).then(response => {
        if (!response.success) {
            dispatch(flightInformationActions.failure());
            return;
        }
        dispatch(flightInformationActions.success(response.data));

    }).catch(err => {
        dispatch(flightInformationActions.failure(err.message));
    })
}