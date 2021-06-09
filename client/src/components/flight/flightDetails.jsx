import React from 'react';
import Section from '../section/section';

import flightService from '../../services/flight.service';
 
export default function FlightDetails(props){
    const id = props.match.params.id;
    const [sections , setSections] = React.useState([]);
    
    React.useEffect(() =>{
        flightService.getFlightById(id)
        .then((response) =>response.json())
        .then(({data}) =>{
            setSections(data.sections?.map(s => <Section key={s._id} seatClass={s.seatClass} flightId={id} seats={s.seats}/> ))
        });
    }, [id]);


    return(
        <div className="container">
            {sections.length>0 ? sections : 'There are no sections'}
        </div>
    )
} 