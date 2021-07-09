import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Section from '../section/section';

import ISeat from '../../interfaces/models/seat.interface';
import ISection from '../../interfaces/models/section.interface';

import { getIsLogged } from '../../store/reducers/authReducer';
import { getFlightSections, requestSections } from '../../store/reducers/sectionReducer';
import { selectSeatsActions } from '../../store/reducers/ticketsReducer';


export default function FlightDetails(props:any) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [mappedSections, setMappedSections] = React.useState<any>([]);
    const [seatsCount, setSeatsCount] = React.useState<number>(0);
    const [seats, setSeats] = React.useState<ISeat[]>([]);

    const sections:ISection[] = useSelector(getFlightSections);
    const isLogged:boolean = useSelector(getIsLogged);

    const flightId:string = props.match.params.id;

    React.useEffect(() => {
        dispatch(requestSections(flightId));
    }, [dispatch, flightId]);

    React.useEffect(() => {
        const selectedSeats:ISeat[] = [];

        const toggleSelect = (seat:ISeat, selected:boolean) => {
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

    const bookSeats = useCallback((event) => {
        event.preventDefault();

        if (isLogged) {
            if (seats.length > 0) {
                dispatch({type:selectSeatsActions.SUCCESS , payload:{seats:seats}});
                history.push(`/flight/${flightId}/ticketsForms`);
            }
            else {
                alert("Please select seat");
            }
        }
        else {
            alert("Can not book seats while not logged")
        }

    },[seats,isLogged, dispatch , history , flightId]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <p>Selected seats: {seatsCount}</p>
                    <button className="btn btn-primary btn-block" onClick={bookSeats}>
                        Continue
                    </button>
                </div>
                <div className="col-lg-8">
                    {mappedSections ? mappedSections : 'There are no sections'}
                </div>
            </div>
        </div>
    )
}