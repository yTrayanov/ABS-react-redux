import { getRequest, postRequest } from "../../requests";
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";
import { USER_TICKETS_URL, CREATE_TICKET_URL } from '../../urls';

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null
}

const initialState = {
    userTickets: initialAsyncState,
    bookSeat:initialAsyncState
}

const userTicketsActions = actionCreator('USER_TICKETS');
const createTicketActions = actionCreator('CREATE_TICKET');

export const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTicketsActions.REQUEST:
        case userTicketsActions.SUCCESS:
        case userTicketsActions.FAILURE:
            return { ...state, userTickets: reducerHandler(state.userTickets, action, userTicketsActions) };

        case createTicketActions.REQUEST:
        case createTicketActions.SUCCESS:
        case createTicketActions.FAILURE:
            return { ...state, userTickets: reducerHandler(state.userTickets, action, createTicketActions) };
        default:
            return state;
    }

}

export const getUserTickets = state => state.tickets.userTickets.data?.tickets;
export const getIsBooked = state => state.tickets.bookSeat.data?.booked;

export const requestUserTickets = () => (dispatch) => {

    dispatch({ type: userTicketsActions.REQUEST });
    getRequest(USER_TICKETS_URL).then((response) => {
        if (!response.success) {
            dispatch({ type: userTicketsActions.FAILURE });
            return;
        }

        dispatch({ type: userTicketsActions.SUCCESS, payload: { tickets: response.data } });
    });
}

export const requestTicket = (flightId, seatClass, row, column , setBooked) => dispatch => {
    dispatch({type: createTicketActions.REQUEST});

    postRequest(CREATE_TICKET_URL , {flightId , seatClass , row , column})
        .then(response => {
            if(!response.success){
                dispatch({type: createTicketActions.FAILURE });
                return;
            }

            setBooked(true);
            dispatch({type:createTicketActions.SUCCESS });
        })

}

export const clearUserTickets = () => dispatch => {

}