import React from 'react';
import Section from '../section/section';
import {getFlightSections , requestSections } from '../../store/reducers/sectionReducer';
import { useSelector , useDispatch } from 'react-redux';


export default function FlightDetails(props) {
    const dispatch = useDispatch();
    const [mappedSections, setMappedSections] = React.useState([]);
    const sections = useSelector(getFlightSections);
    const id = props.match.params.id;

    React.useEffect(() => {
        dispatch(requestSections(id));
    }, [dispatch, id]);

    React.useEffect(() => {
        setMappedSections(sections?.map(s => <Section key={s._id} seatClass={s.seatClass} flightId={id} seats={s.seats} />))
    }, [id , sections]);

    return (
        <div className="container">
            {mappedSections ? mappedSections : 'There are no sections'}
        </div>
    )
}