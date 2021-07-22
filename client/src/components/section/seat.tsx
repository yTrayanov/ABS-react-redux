import React from 'react';
import ISeat from '../../interfaces/models/seat.interface';


export default function Seat({ seat, toggleSelect } : {seat:ISeat , toggleSelect:(seat:ISeat , selected:boolean) => void}) {
    
    const [selected, setSelected] = React.useState<boolean>(false);


    const handleClick = () => {
        if (!seat.isBooked) {
            if (!selected) {
                setSelected(true);
                toggleSelect(seat, selected);
            }
            else {
                setSelected(false);
                toggleSelect(seat , selected);
            }
        }
    }

    return (
        <div onClick={handleClick} className={`col-1 text-${seat.isBooked ? "danger" : (selected ? "warning" : "success")}`}>
            <p>{seat.seatNumber}</p>
        </div>
    )
}