import ISection from "../../interfaces/models/section.interface";
import SectionClassMapper from "../sectionClassMapper";
import SeatInformation from "./seatInformation";

export default function SectionInformation({section}:{section:ISection}) {

    const mappedSeats = section.seats?.map(s => <SeatInformation key={s.id} seat={s} />);    

    return (
        <div>
            <h2><SectionClassMapper seatClass={section.seatClass} /></h2>
            {mappedSeats ? mappedSeats : null}
        </div>
    )
}