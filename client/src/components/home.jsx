import React from 'react';
import flightService from '../services/flight.service';
import Flight from './flight/flight';

export default function Home() {


    const [error, setError] = React.useState('');
    const [flights, setFlights] = React.useState([]);

    const originAirportInput = React.useRef();
    const destinationAirportInput = React.useRef();
    const dateInput = React.useRef();


    const handleSubmit = (event) => {
        event.preventDefault();
        flightService.getFilteredFlights(originAirportInput.current.value, destinationAirportInput.current.value, dateInput.current.value)
            .then(data => data.json())
            .then(flights => {
                setFlights(flights);
            })
            .catch(error => {
                setError(error);
            })
    }

    const models = flights.map((flight) => (
        <Flight originAirportName={flight.originAirport.name}
            destinationAirportName={flight.destinationAirport.name}
            airlineName={flight.airline.name}
            departureDate={flight.departureDate}
            key={flight.flightNumber} 
            id={flight._id} />
    ))

    return (
        <div>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Find flights</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="From" ref={originAirportInput} defaultValue='LAA' />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type="text" className="form-control" placeholder="To" ref={destinationAirportInput} defaultValue='NYC' />
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type="Date" className="form-control" placeholder="Departure Date" ref={dateInput} defaultValue="2021-07-10" />
                        </div>
                        <div className="form-group">
                            <button type="submit" href='/' className="btn btn-primary btn-block" > Find </button>
                        </div>
                    </form>
                    {error ? <span>{error}</span> : null}
                </div>
            </div>
            <div>
                <ul>
                    {models}
                </ul>
            </div>
        </div>
    );
}