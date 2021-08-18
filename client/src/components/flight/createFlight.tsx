import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsCreatingFlight, getHasCreatedFlight } from '../../store/slices/flight.slice';
import { requestCreateFlight } from '../../actions/flight.actions';
import LoadingButton from '../loadingButton';
import { FormGroupInput } from '../formInput';

export default function CreateFlight() {
    const dispatch = useDispatch();

    const flightWasCreated: boolean = useSelector(getHasCreatedFlight);

    const originAirportInput = React.useRef<HTMLInputElement>(null);
    const destinationAirportInput = React.useRef<HTMLInputElement>(null);
    const airlineInput = React.useRef<HTMLInputElement>(null);
    const flightNumberInput = React.useRef<HTMLInputElement>(null);
    const departureDateInput = React.useRef<HTMLInputElement>(null);
    const landingDateInput = React.useRef<HTMLInputElement>(null);

    if (flightWasCreated)
        if (originAirportInput.current && destinationAirportInput.current && airlineInput.current && flightNumberInput.current && departureDateInput.current && landingDateInput.current) {
            originAirportInput.current.value = "";
            destinationAirportInput.current.value = "";
            airlineInput.current.value = "";
            flightNumberInput.current.value = "";
            departureDateInput.current.value = "";
            landingDateInput.current.value = "";
        }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (originAirportInput.current && destinationAirportInput.current && airlineInput.current && flightNumberInput.current && departureDateInput.current && landingDateInput.current) {

            const originAirport = originAirportInput.current.value
            const destinationAirport = destinationAirportInput.current.value
            const airline = airlineInput.current.value
            const flightNumber = flightNumberInput.current.value
            const departureDate = departureDateInput.current.value
            const landingDate = landingDateInput.current.value;

            dispatch(requestCreateFlight({
                originAirport,
                destinationAirport,
                airline,
                flightNumber,
                departureDate,
                landingDate
            }));
        }

    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Create Flight</h1>
                    <form onSubmit={handleSubmit}>
                        <FormGroupInput type="text" iconClass='fas fa-plane-departure' placeholder="From" ref={originAirportInput} defaultValue="LAA" />
                        <FormGroupInput type='text' iconClass="fas fa-plane-arrival" placeholder="To" ref={destinationAirportInput} defaultValue="NYC" />
                        <FormGroupInput type='text' iconClass="fas fa-building" placeholder="Airline" ref={airlineInput} defaultValue="DELTA" />
                        <FormGroupInput type='text' iconClass="fas fa-fingerprint" placeholder="FlightNumber" ref={flightNumberInput} defaultValue="1" />
                        <FormGroupInput type='datetime-local' iconClass="fas fa-calendar-times" ref={departureDateInput} defaultValue="2025-07-10T10:30" />
                        <FormGroupInput type='datetime-local' iconClass="fas fa-calendar-times" ref={landingDateInput} defaultValue="2025-07-10T11:33" />
                        <div className="form-group">
                            <LoadingButton type="submit" loadingSelector={getIsCreatingFlight} text="Create" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    );
}