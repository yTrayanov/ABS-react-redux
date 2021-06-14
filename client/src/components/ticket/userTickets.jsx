import React from 'react';

import Ticket from './ticket';

import { getRequest } from '../../requests';
import {USER_TICKETS_URL} from '../../urls';

export default function UserTickets(){

    const [tickets, setTickets] = React.useState([]);

    React.useEffect(() =>{
        getRequest(USER_TICKETS_URL).then(response =>{
            setTickets(response.data?.map(t => <Ticket key={t.ticketId} ticket={t}/>))
        }).catch(err => console.log(err))
    },[]);

    return(
        <>
            {tickets ? tickets : "There are no tickets" }
        </>
    )
}