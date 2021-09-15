import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/auth.slice';
import flightSlice from "./slices/flight.slice";
import sectionSlice from "./slices/section.slice";
import ticketSlice from "./slices/ticket.slice";
import airlineAirportSlice from "./slices/create.slice";


export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        flights:flightSlice.reducer,
        sections:sectionSlice.reducer,
        tickets:ticketSlice.reducer,
        create:airlineAirportSlice.reducer
    }
});
