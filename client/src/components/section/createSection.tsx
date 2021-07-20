import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsCreatingSection } from '../../store/reducers/sectionReducer';
import { requestCreateSection } from '../../actions/section.action';

export default function CreateSection() {
    const dispatch = useDispatch();

    const rowsInput = React.useRef<HTMLInputElement>(null);
    const columnsInput = React.useRef<HTMLInputElement>(null);
    const seatClassInput = React.useRef<HTMLSelectElement>(null);
    const flightNumberInput = React.useRef<HTMLInputElement>(null);

    const isLoading:string = useSelector(getIsCreatingSection);
    
    const clearForm = React.useCallback(() => {
        if (rowsInput.current && columnsInput.current && seatClassInput.current && flightNumberInput.current) {
            rowsInput.current.value = '';
            columnsInput.current.value = '';
            seatClassInput.current.value = '';
            flightNumberInput.current.value = '';
        }
    }, []);


    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (rowsInput.current && columnsInput.current && seatClassInput.current && flightNumberInput.current) {
            const rows:number = Number.parseInt(rowsInput.current.value);
            const columns:number = Number.parseInt(columnsInput.current.value);
            const seatClass:string = seatClassInput.current.value;
            const flightNumber:string = flightNumberInput.current.value;

            dispatch(requestCreateSection(rows, columns, seatClass, flightNumber, clearForm));
        }

    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Create Section</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fas fa-columns"></i> </span>
                            </div>
                            <input type='number' className="form-control" placeholder="Rows" ref={rowsInput} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fas fa-columns"></i> </span>
                            </div>
                            <input type='number' className="form-control" placeholder="Columns" ref={columnsInput} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fas fa-users-class"></i> </span>
                            </div>
                            <select className="form-control" ref={seatClassInput}>
                                <option value="first" selected >FIRST</option>
                                <option value="bussiness">BUSSINESS</option>
                                <option value="economy">ECONOMY</option>
                            </select>
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fas fa-fingerprint"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="FlightNumber" ref={flightNumberInput} />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" >
                                {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    )
}

//<input type='text'  placeholder="Seat Class" ref={seatClassInput} />
//