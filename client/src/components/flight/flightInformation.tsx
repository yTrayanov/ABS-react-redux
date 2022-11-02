import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import IFlight from '../../interfaces/models/flight.interface';

import SectionInformation from '../section/sectionInformation';

import { getFlightInformation } from "../../store/slices/flight.slice";
import { requestFlightInformation } from '../../actions/flight.actions';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../store/store';

export default function FlightInformation() {
    const dispatch = useDispatch<AppDispatch>();
    const flightInfo: IFlight = useSelector(getFlightInformation);
    const [mappedSections, setMappedSections] = React.useState<React.ReactNode | undefined>([]);
    const {id} = useParams();

    React.useEffect(() => {
        if(id){
            dispatch(requestFlightInformation({ id }));
        }
    }, [dispatch, id]);

    React.useEffect(() => {
        setMappedSections(flightInfo?.sections?.map(s => <SectionInformation key={s.id} section={s} />));
    }, [flightInfo]);

    return (
        <div>
            <div className="row admin_flight_details">
                <div>
                    <div className="row">
                        <h2>{`FlightNumber: ${flightInfo?.flightNumber}  Airline:${flightInfo?.airline}`}</h2>
                    </div>
                    <div className="row center-horizontally">
                        <h2> {flightInfo?.originAirport} - {flightInfo?.destinationAirport} </h2>
                    </div>
                </div>
            </div>
            <div className="center-horizontally">
                <div className="row admin_flight_sections">
                    {mappedSections ? mappedSections : null}
                </div>
            </div>
        </div>
    )
}