const BASE_URL = 'http://localhost:5000/ticket/';

const ticketService = {
    createTicket: async (flightId, seatClass, row, column) => {
        const res = await window.fetch(BASE_URL + 'create', {
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ flightId, seatClass, row, column})
        }).catch(e => {
            return e;
        })

        return res;
    },
    
    getUserTickets: async () => {
        const res = await window.fetch(BASE_URL + `user/tickets` , {
            method:'GET',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
        });

        return res;
    },
    deleteTicket: async (ticketId) =>{
        const res = await window.fetch(BASE_URL + 'remove' , {
            method: 'DELETE',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({ticketId})
        }).catch(e => {
            return e;
        });

        return res;
    }
}

export default ticketService;