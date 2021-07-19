import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FlightView from './flight/flightsViewer';

import { getFilteredFlights, requestFilteredFlights, getIsLoadingFilteredFlights } from '../store/reducers/flightReducer';

import IFlight from '../interfaces/models/flight.interface';

export default function Home() {
    const dispatch = useDispatch();
    const [oneWay, setOneWay] = React.useState<any>(true);
    const [mappedFlights, setMappedFlights] = React.useState<any>([]);
    const isLoading = useSelector(getIsLoadingFilteredFlights);

    const originAirportInput = React.useRef<HTMLInputElement>(null);
    const destinationAirportInput = React.useRef<HTMLInputElement>(null);
    const departureDateInput = React.useRef<HTMLInputElement>(null);
    const returnDateInput = React.useRef<HTMLInputElement>(null);
    const membersInput = React.useRef<HTMLInputElement>(null);

    const hide = React.useRef<string>('hide');

    const flights: IFlight[][] = useSelector(getFilteredFlights);


    React.useEffect(() => {
        setMappedFlights(
            flights?.map((flight, index) => (
                <FlightView flights={flight}
                    key={index} 
                    oneWay = {oneWay}/>
            )));

        if (flights?.length > 0) {
            hide.current = '';
        }
        else {
            hide.current = 'hide';
        }

    }, [flights, hide , oneWay])




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (originAirportInput.current && destinationAirportInput.current && departureDateInput.current && returnDateInput.current && membersInput.current) {
            if (!oneWay && !returnDateInput.current.value) {
                alert('Please set return date');
                return;
            }

            dispatch(requestFilteredFlights(originAirportInput.current.value, destinationAirportInput.current.value, departureDateInput.current.value, returnDateInput.current.value, membersInput.current.value));
        }
    }

    const handleCheckOneWay = () => {
        setOneWay(!oneWay);
        if (returnDateInput.current)
            returnDateInput.current.value = '';
    }

    return (
        <div className="home">
            <div className="home_search center-horizontally">
                <form onSubmit={handleSubmit}>

                    <input type='text' className="form-control long-input" placeholder="From" ref={originAirportInput} defaultValue='LAA' />

                    <input type="text" className="form-control long-input" placeholder="To" ref={destinationAirportInput} defaultValue='NYC' />

                    <input type="Date" className="form-control short-input" ref={departureDateInput} defaultValue="2021-07-10" />

                    <input disabled={oneWay} type="Date" className="form-control short-input" ref={returnDateInput} />

                    <div className="checkbox-container">
                        <label htmlFor="oneWayCheck">One way</label>
                        <input type="checkbox" name="oneWayCheck" defaultChecked onClick={handleCheckOneWay} />
                    </div>


                    <input type="Number" className="form-control" placeholder="Members" ref={membersInput}></input>

                    <button type="submit" className="btn btn-primary btn-block">
                        {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Search
                    </button>
                </form>
            </div>

            <div className={`center-horizontally ${hide.current}`}>
                <ul className="home_flights" >
                    {mappedFlights ? mappedFlights : null}
                </ul>
            </div>
        </div>
    );
}