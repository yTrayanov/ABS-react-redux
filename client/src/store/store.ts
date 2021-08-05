import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import flightSlice from "./slices/flightSlice";
import sectionSlice from "./slices/sectionSlice";
import ticketSlice from "./slices/ticketSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        flights:flightSlice.reducer,
        sections:sectionSlice.reducer,
        tickets:ticketSlice.reducer
    }
})