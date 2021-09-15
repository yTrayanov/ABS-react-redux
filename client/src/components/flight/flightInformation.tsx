import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import IFlight from '../../interfaces/models/flight.interface';

import SectionInformation from '../section/sectionInformation';

import { getFlightInformation } from "../../store/slices/flight.slice";
import { requestFlightInformation } from '../../actions/flight.actions';
import { useParams } from 'react-router-dom';

export default function FlightInformation() {
    const dispatch = useDispatch();
    const flightInfo: IFlight = useSelector(getFlightInformation);
    const [mappedSections, setMappedSections] = React.useState<object[] | undefined>([]);
    const params: { id: string } = useParams();
    const id: string = params.id;

    React.useEffect(() => {
        dispatch(requestFlightInformation({ id }));
    }, [dispatch, id]);

    React.useEffect(() => {
        setMappedSections(flightInfo?.sections?.map(s => <SectionInformation key={s.id} section={s} />));
    }, [flightInfo]);

    return (
        <div>
            <div className="row admin_flight_details">
                <div>
                    <div className="row">
                        <h2>FlightNumber: {flightInfo?.flightNumber}  Airline:{flightInfo?.airline}</h2>
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