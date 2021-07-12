import { Link } from 'react-router-dom';


export default function Flight({originAirportName, destinationAirportName, airlineName, departureDate, url }
        :{ originAirportName:string ,destinationAirportName:string , airlineName:string , departureDate:Date , url:string}) {
    return (
        <Link className="flightLink" to={url} style={{ textDecoration: 'none', color: 'black'}}>
            <li style={{ borderBottom: "1px solid" }}>
                <div className="row flightLink">
                    <div className="col-lg-4">
                        <p style={{ "margin": 0 }} >{originAirportName} - {destinationAirportName}</p>
                        <p>{airlineName}</p>
                    </div>
                    <div className="col-lg-4">{new Date(departureDate).toLocaleString()}</div>
                </div>
            </li>
        </Link>
    )
}