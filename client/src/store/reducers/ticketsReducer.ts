import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";

import {IAction,IActionType} from "../../interfaces/action.interface";

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null
}

const initialState = {
    userTickets: initialAsyncState,
    bookSeats: initialAsyncState,
    selectedSeats: { ...initialAsyncState, data: { seats: null } }
}

export const userTicketsActions: IActionType = actionCreator('USER_TICKETS');
export const createTicketActions: IActionType = actionCreator('CREATE_TICKET');
export const selectSeatsActions: IActionType = actionCreator('CHOOSE_SEATS');

export const ticketsReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case userTicketsActions.REQUEST:
        case userTicketsActions.SUCCESS:
        case userTicketsActions.FAILURE:
            return { ...state, userTickets: reducerHandler(state.userTickets, action, userTicketsActions) };

        case createTicketActions.REQUEST:
        case createTicketActions.SUCCESS:
        case createTicketActions.FAILURE:
            return { ...state, bookSeats: reducerHandler(state.bookSeats, action, createTicketActions) };

        case selectSeatsActions.REQUEST:
        case selectSeatsActions.SUCCESS:
        case selectSeatsActions.FAILURE:
            return { ...state, selectedSeats: reducerHandler(state.selectedSeats, action, selectSeatsActions) };
        default:
            return state;
    }

}

export const getUserTickets = (state: any) => state.tickets.userTickets.data;
export const getIsBooked = (state: any) => state.tickets.bookSeats.data?.booked;
export const getIsCreatingTickets = (state: any) => state.tickets.bookSeats.isLoading;
export const getSelectedSeats = (state: any) => state.tickets.selectedSeats.data;

