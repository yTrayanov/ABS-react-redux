import React from 'react';

import { postRequest } from '../../requests';
import { CREATE_FLIGHT_URL } from '../../urls';

export default function CreateFlight() {

    const [error, setError] = React.useState('');
    const originAirportInput = React.useRef();
    const destinationAirportInput = React.useRef();
    const airlineInput = React.useRef();
    const flightNumberInput = React.useRef();
    const departureDateInput = React.useRef();

    const handleSubmit = (event) => {

        event.preventDefault();
        const originAirport = originAirportInput.current.value
        const destinationAirport = destinationAirportInput.current.value
        const airline = airlineInput.current.value
        const flightNumber = flightNumberInput.current.value
        const departureDate = departureDateInput.current.value

        postRequest(CREATE_FLIGHT_URL, { originAirport, destinationAirport, airline, flightNumber, departureDate })
            .then(response => {
                if (!response.success)
                    throw new Error(response.message);

                originAirportInput.current.value = '';
                destinationAirportInput.current.value = '';
                airlineInput.current.value = '';
                flightNumberInput.current.value = '';
                departureDateInput.current.value = '';

            }).catch((error) => {
                setError(error.message);
            })
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Create Flight</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="From" ref={originAirportInput} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="To" ref={destinationAirportInput} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="Airline" ref={airlineInput} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="FlightNumber" ref={flightNumberInput} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='date' className="form-control" ref={departureDateInput} />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" > Create </button>
                        </div>
                    </form>
                    {error ? <span>{error}</span> : null}
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    );
}