import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../requests";
import { ALL_FLIGHTS_URL, CREATE_FLIGHT_URL, getFilterdFlightsUrl, getFlightDetailsUrl, getFlightInformationUrl } from "../urls";
import { checkResponse } from "../utils/responseUtils";

interface IFilteredFlightsModel {
    originAirport: string;
    destinationAirport: string;
    departureDate: string;
    returnDate?: string;
    membersCount?: string;
}

interface ICreateFlightModel {
    originAirport: string;
    destinationAirport: string;
    airline: string, flightNumber: string;
    departureDate: string;
    landingDate: string;
}


export const requestFlightsByIds = createAsyncThunk(
    'flights/flightsByIds',
    (data: { ids: string[] }, thunkApi) => {

        const url = getFlightDetailsUrl(data.ids);
        return getRequest(url).then((response) => {
            checkResponse(response);

            return response.data;
        }).catch(err => {
            return thunkApi.rejectWithValue(err.message);
        })
    });

export const requestFilteredFlights = createAsyncThunk(
    'flights/filterFlights',
    (data: IFilteredFlightsModel, thunkApi) => {
        const { originAirport, destinationAirport, departureDate, returnDate } = data
        let { membersCount } = data;

        if (!membersCount) membersCount = '1';

        return getRequest(getFilterdFlightsUrl(originAirport, destinationAirport, departureDate, membersCount, returnDate))
            .then(response => {
                checkResponse(response);

                return response.data;
            }).catch(err => {
                return thunkApi.rejectWithValue(err.message);
            })

    })

export const requestCreateFlight = createAsyncThunk(
    'flights/createFlight',
    (data: ICreateFlightModel, thunkApi) => {

        return postRequest(CREATE_FLIGHT_URL, data)
            .then(response => {
                checkResponse(response);

                return response.data;
            }).catch(err => {
                return thunkApi.rejectWithValue(err.message);
            })
    })

export const requestAllFlights = createAsyncThunk(
    'flights/allFlights',
    (data?, thunkApi?) => {

        return getRequest(ALL_FLIGHTS_URL).then(response => {
            checkResponse(response);

            return response.data;
        }).catch(err => {
            return thunkApi.rejectWithValue(err.message);
        })
    });

    
export const requestFlightInformation = createAsyncThunk(
    'flights/flightInfo',
    (data:{id: string} , thunkApi)=> {

    const url = getFlightInformationUrl(data.id);

    return getRequest(url).then(response => {
        checkResponse(response);

        return response.data;

    }).catch(err => {
        return thunkApi.rejectWithValue(err.message);
    })
})

export const actions = [
    requestFlightsByIds,
    requestFilteredFlights,
    requestCreateFlight,
    requestAllFlights,
    requestFlightInformation
]
