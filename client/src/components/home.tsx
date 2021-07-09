import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Flight from './flight/flight';

import { getFilteredFlights, requestFilteredFlights, getIsLoadingFilteredFlights } from '../store/reducers/flightReducer';
import IFlight from '../interfaces/models/flight.interface';

export default function Home() {
    const dispatch = useDispatch();
    const [mappedFlights, setMappedFlights] = React.useState<any>([]);
    const isLoading = useSelector(getIsLoadingFilteredFlights);

    const originAirportInput = React.useRef<HTMLInputElement>(null);
    const destinationAirportInput = React.useRef<HTMLInputElement>(null);
    const dateInput = React.useRef<HTMLInputElement>(null);

    const flights : IFlight[] = useSelector(getFilteredFlights);



    React.useEffect(() => {
        setMappedFlights(
            flights?.map(flight => (
            <Flight originAirportName={flight.originAirport.name}
                destinationAirportName={flight.destinationAirport.name}
                airlineName={flight.airline.name}
                departureDate={flight.departureDate}
                key={flight.flightNumber}
                id={flight._id} />
        )));
    }, [flights])




    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(originAirportInput.current && destinationAirportInput.current && dateInput.current)
        dispatch(requestFilteredFlights(originAirportInput.current.value, destinationAirportInput.current.value, dateInput.current.value));
    }

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
                            <button type="submit" className="btn btn-primary btn-block" >
                            {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Find
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container col-lg-8" style={{ textAlign: 'center', marginTop: '40px', border: mappedFlights ? '1px solid' : 'none', borderRadius: '30px' }}>
                <ul className="container" style={{ listStyle: "none", justifyContent: 'center', padding: 0 }}>
                    {mappedFlights ? mappedFlights : null}
                </ul>
            </div>
        </div>
    );
}