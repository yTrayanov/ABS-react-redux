import { createAsyncThunk } from "@reduxjs/toolkit";
import ISeat from "../interfaces/models/seat.interface";
import { getRequest, postRequest } from "../requests";
import { CREATE_TICKET_URL, USER_TICKETS_URL } from "../urls";


interface ICreateTicketModel{
    flightIds:string[],
    seats:ISeat[][],
}

export const requestUserTickets = createAsyncThunk(
    'tickets/userTickets',
    (data?, thunkApi?) => {
        return getRequest(USER_TICKETS_URL)
            .then(response =>  response.data)
            .catch(err => {
                return thunkApi.rejectWithValue(err.message);
            })
    })

export const requestCreateTickets = createAsyncThunk(
    'tickets/bookSeats',
    (data:ICreateTicketModel, thunkApi) => {
        return postRequest(CREATE_TICKET_URL, data)
            .then(response => response.data)
            .catch(err => {
                return thunkApi.rejectWithValue(err.message);
            })
    })

export const actions = [
    requestUserTickets,
    requestCreateTickets
];