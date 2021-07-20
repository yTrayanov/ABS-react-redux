import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import IFlight from '../../interfaces/models/flight.interface';

import SectionInformation from '../section/sectionInformation';

import { getFlightInformation } from "../../store/reducers/flightReducer";
import { requestFlightInformation } from '../../actions/flight.actions';

export default function FlightInformation(props: any) {
    const dispatch = useDispatch();
    const flightInfo: IFlight = useSelector(getFlightInformation);
    const [mappedSections, setMappedSections] = React.useState<any>([]);
    const id: string = props.match.params.id;

    React.useEffect(() => {
        dispatch(requestFlightInformation(id));
    }, [dispatch, id]);

    React.useEffect(() => {
        setMappedSections(flightInfo?.sections?.map(s => <SectionInformation key={s._id} section={s} />));
    }, [flightInfo]);

    return (
        <div>
            <p>FlightNumber: {flightInfo?.flightNumber}  Airline:{flightInfo?.airline.name}</p>
            <p> {flightInfo?.originAirport.name} - {flightInfo?.destinationAirport.name} </p>
            {mappedSections ? mappedSections : null}
        </div>
    )
}