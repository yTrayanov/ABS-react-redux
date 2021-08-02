import { getRequest , postRequest } from "../requests";
import { userTicketsActions , createTicketActions } from "../store/reducers/ticketsReducer";
import { USER_TICKETS_URL , CREATE_TICKET_URL } from "../urls";

import ISeat from "../interfaces/models/seat.interface";

export const requestUserTickets = () => (dispatch: any) => {

    dispatch(userTicketsActions.request());
    getRequest(USER_TICKETS_URL).then((response) => {
        if (!response.success) {
            dispatch(userTicketsActions.failure());
            return;
        }

        dispatch(userTicketsActions.success(response.data));
    });
}

export const requestCreateTickets = (flightIds: string[], seats: ISeat[][] , history:any ) => (dispatch: any) => {
    dispatch(createTicketActions.request());

    postRequest(CREATE_TICKET_URL, { flightIds, seats })
        .then(response => {
            if (!response.success) {
                dispatch(createTicketActions.failure);
                return;
            }
            dispatch(createTicketActions.success());
            history.push('/');
        })
}