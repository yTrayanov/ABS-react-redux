import React from 'react';
import Seat from './seat';

export default function Section({ section}) {

    const [mappedSeats , setMappedSeats] = React.useState()


    React.useEffect(() => {
        setMappedSeats(section.seats?.map(s =>  <Seat key={s._id} flightId={section.flightId}  seatClass={section.seatClass} seat={s} />))
    },[section]);


    return (
        <div>
            <p>{section.seatClass}</p>
            <div className="row">
                {mappedSeats ? mappedSeats : 'There are no seats'}
            </div>
        </div>
    )
}