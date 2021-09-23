import { createSlice } from "@reduxjs/toolkit"
import { initialAsyncState, generateActionCases } from "../../utils/sliceUtils";


import { actions } from '../../actions/ticket.actions';

const initialBookingState = {
    data: [[],[]]
}

const initialState = {
    userTickets: initialAsyncState,
    bookSeats: initialAsyncState,
    selectedSeats: initialBookingState,
    seatsForBooking: initialBookingState
};

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        clearTicketSlice:(state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        generateActionCases(builder , actions);
    }
});

//selectors
export const getUserTickets = ({tickets:{userTickets}}: any) => userTickets.data;
export const getIsLoadingUserTickets = ({tickets:{userTickets}}: any) => userTickets.isLoading;

export const getIsBooked = ({tickets:{bookSeats}}: any) => bookSeats.data?.booked;
export const getIsCreatingTickets = ({tickets:{bookSeats}}: any) => bookSeats.isLoading;

export const getSelectedSeats = ({tickets:{selectedSeats}}: any) => selectedSeats.data;
export const getReadySeats = ({tickets:{seatsForBooking}}: any) => seatsForBooking.data;

export const { clearTicketSlice } = ticketSlice.actions;

export default ticketSlice;