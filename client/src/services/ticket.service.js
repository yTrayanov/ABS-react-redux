const BASE_URL = 'http://localhost:5000/ticket/';

const ticketService = {
    createTicket: async (flightId, seatClass, row, column , userId) => {
        const res = await window.fetch(BASE_URL + 'create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ flightId, seatClass, row, column , userId})
        }).catch(e => {
            return e;
        })

        return res;
    },
    
    getUserTickets: async (userId) => {
        const res = await window.fetch(BASE_URL + `user/${userId}` , {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        });

        return res;
    },
    deleteTicket: async (ticketId) =>{
        const res = await window.fetch(BASE_URL + 'remove' , {
            method: 'DELETE',
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