import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getIsLogged } from '../../store/reducers/authReducer';
import Section from '../section/section';
import { getFlightSections, requestSections } from '../../store/reducers/sectionReducer';
import { requestTickets } from '../../store/reducers/ticketsReducer';

export default function FlightDetails(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [mappedSections, setMappedSections] = React.useState([]);
    const [seatsCount, setSeatsCount] = React.useState(0);
    const [seats, setSeats] = React.useState([]);
    const sections = useSelector(getFlightSections);
    const isLogged = useSelector(getIsLogged);
    const flightId = props.match.params.id;





    React.useEffect(() => {
        dispatch(requestSections(flightId));
    }, [dispatch, flightId]);


    React.useEffect(() => {
        const selectedSeats = [];

        const toggleSelect = (seat, selected) => {
            if (!selected) {
                selectedSeats.push(seat);
                setSeatsCount(c => c + 1);
                setSeats(selectedSeats);
            }
            else {

                const index = selectedSeats.indexOf(seat);

                if (index > -1) {
                    selectedSeats.splice(index, 1);
                    setSeatsCount(c => c - 1);
                    setSeats(selectedSeats);
                }
            }
        }
        setMappedSections(sections?.map(s => <Section key={s._id} section={s} toggleSelect={toggleSelect} />));
    }, [sections]);

    const bookSeats = (event) => {
        event.preventDefault();

        if (isLogged) {
            dispatch(requestTickets(flightId, seats));
        }
        else {
            history.push('./login');
        }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <p>Selected seats: {seatsCount}</p>
                    <button className="btn btn-primary btn-block" onClick={bookSeats}>Purchase</button>
                </div>
                <div className="col-lg-8">
                    {mappedSections ? mappedSections : 'There are no sections'}
                </div>
            </div>
        </div>
    )
}