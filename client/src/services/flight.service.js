const BASE_URL = 'http://localhost:5000/flight/';


const flightService = {
    create: async (originAirport, destinationAirport, airline, flightNumber, departureDate) => {
        const res = await window.fetch(BASE_URL + 'create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originAirport, destinationAirport, airline, flightNumber, departureDate })
        })
            .catch(error => {
                return error;
            });
        return res.json();
    },

    getFilteredFlights: async (originAirport, destinationAirport, departureDate) => {
        const res = await window.fetch(BASE_URL + `filter/${originAirport}/${destinationAirport}/${departureDate}` , {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });

        return res;
    },
    getFlightById: async (id) =>{
        return await window.fetch(BASE_URL + id , {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }
        });
    }

}

export default flightService;

