import React from 'react';

import Section from '../section/section';

import ISeat from '../../interfaces/models/seat.interface';
import IFlight from '../../interfaces/models/flight.interface';


export default function FlightDetails({ flight, setSeats }: { flight: IFlight , setSeats:any }) {

    const [mappedSections, setMappedSections] = React.useState<any>([]);

    React.useEffect(() => {
        const selectedSeats: ISeat[] = [];

        const toggleSelect = (seat: ISeat, selected: boolean) => {
            if (!selected) {
                selectedSeats.push(seat);
            }
            else {
                const index = selectedSeats.indexOf(seat);

                if (index > -1) {
                    selectedSeats.splice(index, 1);
                }
            }
            
            setSeats([...selectedSeats]);
        }

        setMappedSections(flight?.sections?.map(s => <Section key={s._id} section={s} toggleSelect={toggleSelect} />));
    }, [flight , setSeats]);

    return (
        <div className="section">
                <div>
                    {mappedSections ? mappedSections : 'There are no sections'}
                </div>
        </div>
    )
}