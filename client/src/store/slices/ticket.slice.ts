import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GetTargetState , initialAsyncState , success, failure , request } from "../../utils/sliceUtils";


import { actions } from '../../actions/ticket.actions';
import ISeat from "../../interfaces/models/seat.interface";

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
        },
        clearTicketSlice:(state) => {
            state = initialState
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
export const getUserTickets = ({tickets:{userTickets}}: any) => userTickets.data;
export const getIsLoadingUserTickets = ({tickets:{userTickets}}: any) => userTickets.isLoading;

export const getIsBooked = ({tickets:{bookSeats}}: any) => bookSeats.data?.booked;
export const getIsCreatingTickets = ({tickets:{bookSeats}}: any) => bookSeats.isLoading;

export const getSelectedSeats = ({tickets:{selectedSeats}}: any) => selectedSeats.data;
export const getReadySeats = ({tickets:{seatsForBooking}}: any) => seatsForBooking.data;

export const { selectSeats, addSeat, removeSeat , clearSeats , clearTicketSlice } = ticketSlice.actions;

export default ticketSlice;