import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import IFlight from '../../interfaces/models/flight.interface';

import SectionInformation from '../section/sectionInformation';

import { getFlightInformation } from "../../store/reducers/flightReducer";
import { requestFlightInformation } from '../../actions/flight.actions';
import { useParams } from 'react-router-dom';

export default function FlightInformation() {
    const dispatch = useDispatch();
    const flightInfo: IFlight = useSelector(getFlightInformation);
    const [mappedSections, setMappedSections] = React.useState<any>([]);
    const params:{id:string} = useParams();
    const id: string =params.id;

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