import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FlightView from './flight/flightsViewer';
import LoadingButton from './loadingButton';

import { getFilteredFlights, getIsLoadingFilteredFlights } from '../store/slices/flightSlice';
import { requestFilteredFlights } from '../actions/flight.actions';

import IFlight from '../interfaces/models/flight.interface';

export default function Home() {
    const dispatch = useDispatch();
    const [oneWay, setOneWay] = React.useState<boolean>(true);
    const [mappedFlights, setMappedFlights] = React.useState<object[]>([]);

    const originAirportInput = React.useRef<HTMLInputElement>(null);
    const destinationAirportInput = React.useRef<HTMLInputElement>(null);
    const departureDateInput = React.useRef<HTMLInputElement>(null);
    const returnDateInput = React.useRef<HTMLInputElement>(null);
    const membersInput = React.useRef<HTMLInputElement>(null);

    const flights: IFlight[][] = useSelector(getFilteredFlights);


    React.useEffect(() => {
        setMappedFlights(
            flights?.map((flight, index) => (
                <FlightView flights={flight}
                    key={index} 
                    oneWay = {oneWay}
                    membersCount = { membersInput.current?.value || 1} />
            )));
    }, [flights , oneWay])


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (originAirportInput.current && destinationAirportInput.current && departureDateInput.current && returnDateInput.current && membersInput.current) {
            if (!oneWay && !returnDateInput.current.value) {
                alert('Please set return date');
                return;
            }

            dispatch(requestFilteredFlights({
                originAirport:originAirportInput.current.value, 
                destinationAirport:destinationAirportInput.current.value, 
                departureDate:departureDateInput.current.value, 
                returnDate:returnDateInput.current.value,
                membersCount:membersInput.current.value
            }));
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

                    <input type="Date" className="form-control short-input" ref={departureDateInput} defaultValue="2025-07-10" />

                    <input disabled={oneWay} type="Date" className="form-control short-input" ref={returnDateInput} />

                    <div className="checkbox-container">
                        <label htmlFor="oneWayCheck">One way</label>
                        <input type="checkbox" name="oneWayCheck" defaultChecked onClick={handleCheckOneWay} />
                    </div>


                    <input type="Number" className="form-control" placeholder="Members" ref={membersInput}></input>

                    <LoadingButton type="submit" text="Search" loadingSelector={getIsLoadingFilteredFlights}/>
                </form>
            </div>

            <div className={`center-horizontally`}>
                <ul className="home_flights" >
                    {mappedFlights ? mappedFlights : null}
                </ul>
            </div>
        </div>
    );
}