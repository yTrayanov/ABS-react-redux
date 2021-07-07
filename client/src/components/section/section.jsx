import React from 'react';
import Seat from './seat';

export default function Section({ section , toggleSelect}) {

    const [mappedSeats , setMappedSeats] = React.useState();


    React.useEffect(() => {
        setMappedSeats(section.seats?.map(s =>  <Seat key={s._id} seat={s} toggleSelect={toggleSelect}  />))
    },[section , toggleSelect]);

    return (
        <div style={{border:"1px solid" , borderRadius:"10px" , marginTop:"10px" , textAlign:'center'}}>
            <p style={{borderBottom:'1px solid'}}>{section.seatClass}</p>
            <div className="row">
                {mappedSeats ? mappedSeats : 'There are no seats'}
            </div>
        </div>
    )
}