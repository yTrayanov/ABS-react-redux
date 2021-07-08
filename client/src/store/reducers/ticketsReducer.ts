import { getRequest, postRequest } from "../../requests";
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";
import { USER_TICKETS_URL, CREATE_TICKET_URL } from '../../urls';
import { requestSections } from "./sectionReducer";

import ISeat from "../../interfaces/models/seat.interface";
import IAction from "../../interfaces/action.interface";

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null
}

const initialState = {
    userTickets: initialAsyncState,
    bookSeats:initialAsyncState
}

const userTicketsActions:any = actionCreator('USER_TICKETS');
const createTicketActions:any = actionCreator('CREATE_TICKET');

export const ticketsReducer = (state = initialState, action:IAction) => {
    switch (action.type) {
        case userTicketsActions.REQUEST:
        case userTicketsActions.SUCCESS:
        case userTicketsActions.FAILURE:
            return { ...state, userTickets: reducerHandler(state.userTickets, action, userTicketsActions) };

        case createTicketActions.REQUEST:
        case createTicketActions.SUCCESS:
        case createTicketActions.FAILURE:
            return { ...state, bookSeats: reducerHandler(state.bookSeats, action, createTicketActions) };
        default:
            return state;
    }

}

export const getUserTickets = (state:any) => state.tickets.userTickets.data?.tickets;
export const getIsBooked = (state:any )=> state.tickets.bookSeats.data?.booked;
export const getIsCreatingTicket = (state:any) => state.tickets.bookSeats.isLoading;

export const requestUserTickets = () => (dispatch:any) => {

    dispatch({ type: userTicketsActions.REQUEST });
    getRequest(USER_TICKETS_URL).then((response) => {
        if (!response.success) {
            dispatch({ type: userTicketsActions.FAILURE });
            return;
        }

        dispatch({ type: userTicketsActions.SUCCESS, payload: { tickets: response.data } });
    });
}

export const requestTickets = (flightId:string, seats:ISeat[] , setSeatCount:(value:number)=>void) => (dispatch:any) => {
    dispatch({type: createTicketActions.REQUEST});

    postRequest(CREATE_TICKET_URL , {flightId, seats})
        .then(response => {
            if(!response.success){
                dispatch({type: createTicketActions.FAILURE });
                return;
            }
            dispatch({type:createTicketActions.SUCCESS });
            dispatch(requestSections(flightId));

            setSeatCount(0);
        })

}
