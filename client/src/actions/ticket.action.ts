import { getRequest , postRequest } from "../requests";
import { userTicketsActions , createTicketActions } from "../store/reducers/ticketsReducer";
import { USER_TICKETS_URL , CREATE_TICKET_URL } from "../urls";

import ISeat from "../interfaces/models/seat.interface";

export const requestUserTickets = () => (dispatch: any) => {

    dispatch({ type: userTicketsActions.REQUEST });
    getRequest(USER_TICKETS_URL).then((response) => {
        if (!response.success) {
            dispatch({ type: userTicketsActions.FAILURE });
            return;
        }

        dispatch({ type: userTicketsActions.SUCCESS, payload: { tickets: response.data } });
    });
}

export const requestCreateTickets = (flightIds: string[], seats: ISeat[] ) => (dispatch: any) => {
    dispatch({ type: createTicketActions.REQUEST });

    postRequest(CREATE_TICKET_URL, { flightIds, seats })
        .then(response => {
            if (!response.success) {
                dispatch({ type: createTicketActions.FAILURE });
                return;
            }
            dispatch({ type: createTicketActions.SUCCESS });
        })
}