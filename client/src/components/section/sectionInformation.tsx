import ISection from "../../interfaces/models/section.interface";
import SeatInformation from "./seatInformation";

export default function SectionInformation({section}:{section:ISection}) {

    const mappedSeats = section.seats?.map(s => <SeatInformation key={s._id} seat={s} />);    

    return (
        <div>
            <h2>{section.seatClass.toUpperCase()}</h2>
            {mappedSeats ? mappedSeats : null}
        </div>
    )
}