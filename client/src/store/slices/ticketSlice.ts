import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GetTargetState , initialAsyncState , success, failure , request } from "../../utils/sliceUtils";


import { actions } from '../../actions/ticket.actions';
import ISeat from "../../interfaces/models/seat.interface";

const initialBookingState = {
    data: [[],[]]
}

const ticketSlice = createSlice({
    name: "tickets",
    initialState: {
        userTickets: initialAsyncState,
        bookSeats: initialAsyncState,
        selectedSeats: initialBookingState,
        seatsForBooking: initialBookingState
    },
    reducers: {
        selectSeats: (state: any, action: PayloadAction<ISeat[][]>) => {
            state.selectedSeats.data = action.payload;
        },
        addSeat: (state: any, action: PayloadAction<{seat:ISeat , index:number}>) => {
            
            const {seat , index} = action.payload;
            state.seatsForBooking.data[index].push(seat);
        },
        removeSeat: (state: any, action: PayloadAction<{seat:ISeat , index:number}>) => {

            const {seat , index} = action.payload;

            const seatIndex = state.seatsForBooking.data[index].indexOf(seat);
            state.seatsForBooking.data[index].splice(seatIndex, 1);
        },
        clearSeats:(state:any ) => {
            state.seatsForBooking.data = [[],[]];
        }
    },
    extraReducers: (builder) => {
        for (let item of actions) {
            (() => {
                builder.addCase((item.fulfilled), (state, action) => {

                    const targetState = GetTargetState(state, action);
                    success(targetState, action);
                });
                builder.addCase((item.rejected), (state, action) => {
                    const targetState = GetTargetState(state, action);
                    failure(targetState, action);
                });
                builder.addCase((item.pending), (state, action) => {
                    const targetState = GetTargetState(state, action);
                    request(targetState);
                });
            })();
        }
    }
});

//selectors
export const getUserTickets = (state: any) => state.tickets.userTickets.data;
export const getIsLoadingUserTickets = (state: any) => state.tickets.userTickets.isLoading;

export const getIsBooked = (state: any) => state.tickets.bookSeats.data?.booked;
export const getIsCreatingTickets = (state: any) => state.tickets.bookSeats.isLoading;
export const getHasBookedSeats = (state: any) => state.tickets.bookSeats.loaded;

export const getSelectedSeats = (state: any) => state.tickets.selectedSeats.data;
export const getReadySeats = (state: any) => state.tickets.seatsForBooking.data;

export const { selectSeats, addSeat, removeSeat , clearSeats } = ticketSlice.actions;

export default ticketSlice;