import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ticket from './ticket';

import { getUserTickets, getIsLoadingUserTickets } from '../../store/slices/ticket.slice';
import { requestUserTickets } from '../../actions/ticket.actions';
import ITicket from '../../interfaces/models/ticket.interface';
import { AppDispatch } from '../../store/store';


export default function UserTickets() {
    const dispatch = useDispatch<AppDispatch>();
    const [mappedTickets, setMappedTickets] = React.useState<React.ReactNode>([]);

    const tickets: ITicket[] = useSelector(getUserTickets);
    const isLoading: boolean = useSelector(getIsLoadingUserTickets);

    React.useEffect(() => {
        dispatch(requestUserTickets());
    }, [dispatch])


    React.useEffect(() => {
        setMappedTickets(tickets?.map(t => <Ticket key={t.id} ticket={t} />))
    }, [tickets]);



    return isLoading ?
        (<div className="center-horizontally">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        )
        :
        (<div className="center-horizontally">
            <ul className="tickets">
                {mappedTickets ? mappedTickets : "There are no tickets"}
            </ul>
        </div>)
}