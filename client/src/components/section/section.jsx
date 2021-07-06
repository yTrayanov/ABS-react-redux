import React from 'react';
import Seat from './seat';

export default function Section({ seats, seatClass , flightId}) {

    const [mappedSections , setMappedSections] = React.useState()


    React.useEffect(() => {
        setMappedSections(seats?.map(s =>  <Seat key={s._id} flightId={flightId}  seatClass={seatClass} seat={s} />))
    },[seats, flightId , seatClass]);


    return (
        <div>
            <p>{seatClass}</p>
            <div className="row">
                {mappedSections ? mappedSections : 'There are no seats'}
            </div>
        </div>
    )
}