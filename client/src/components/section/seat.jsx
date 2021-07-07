import React from 'react';

export default function Seat({ seat, toggleSelect }) {
    const [selected, setSelected] = React.useState(false);


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
        <div onClick={handleClick} className={`col-1 text-${seat.isBooked ? "danger" : selected ? "warning" : "success"}`}>
            <p>{seat.seatNumber}</p>
        </div>
    )
}