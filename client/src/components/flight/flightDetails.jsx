import React from 'react';
import Section from '../section/section';

import { getRequest } from '../../requests';
import { getFlightDetailsUrl } from '../../urls';

export default function FlightDetails(props) {
    const [sections, setSections] = React.useState([]);

    const id = props.match.params.id;
    const url = getFlightDetailsUrl(id);


    React.useEffect(() => {
        getRequest(url).then(({ data }) => {
            setSections(data.sections?.map(s => <Section key={s._id} seatClass={s.seatClass} flightId={id} seats={s.seats} />))
        });
    }, [url, id]);


    return (
        <div className="container">
            {sections ? sections : 'There are no sections'}
        </div>
    )
}