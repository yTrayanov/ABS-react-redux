import React from 'react';
import Seat from './seat';

export default function Section({ seats, seatClass , flightId}) {


    const parsedSeats = seats?.map(s => {
        return <Seat key={s._id} flightId={flightId}  seatClass={seatClass} seat={s} />;
    })


    return (
        <div>
            <p>{seatClass}</p>
            <div className="row">
                {parsedSeats.length > 0 ? parsedSeats : 'There are no seats'}
            </div>
        </div>
    )
}