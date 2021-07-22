import React from 'react';
import Seat from './seat';

import ISection from '../../interfaces/models/section.interface'; 
import ISeat from '../../interfaces/models/seat.interface';

export default function Section({ section , toggleSelect}:{section:ISection , toggleSelect:(seat:ISeat , selected:boolean) => void}) {

    const [mappedSeats , setMappedSeats] = React.useState<object[]>([]);


    React.useEffect(() => {
        setMappedSeats(section.seats?.map(s =>  <Seat key={s._id} seat={s} toggleSelect={toggleSelect}  />))
    },[section , toggleSelect]);

    return (
        <div className="section">
            <p>{section.seatClass}</p>
            <div className="row">
                {mappedSeats ? mappedSeats : 'There are no seats'}
            </div>
        </div>
    )
}