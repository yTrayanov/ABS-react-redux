import React from 'react';

import ticketService from '../../services/ticket.service';
import Ticket from './ticket';

export default function UserTickets(){

    const [tickets, setTickets] = React.useState([]);

    React.useEffect(() =>{
        ticketService.getUserTickets()
                .then(response => response.json())
                .then(({data}) =>{
                    setTickets(data);
                })
                .catch(err => console.log(err))
    },[]);

    const parsedTickets = tickets?.map(t => <Ticket key={t.ticketId} ticket={t}/>)

    return(
        <>
            {parsedTickets ? parsedTickets : "There are no tickets" }
        </>
    )
}