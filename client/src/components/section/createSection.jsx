import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestCreateSection, getIsCreatingSection } from '../../store/reducers/sectionReducer';

export default function CreateSection() {
    const dispatch = useDispatch();

    const rowsInput = React.useRef();
    const columnsInput = React.useRef();
    const seatClassInput = React.useRef();
    const flightNumberInput = React.useRef();

    const isLoading = useSelector(getIsCreatingSection);

    const clearForm = () => {
        rowsInput.current.value = '';
        columnsInput.current.value = '';
        seatClassInput.current.value = '';
        flightNumberInput.current.value = '';
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const rows = rowsInput.current.value;
        const columns = columnsInput.current.value;
        const seatClass = seatClassInput.current.value;
        const flightNumber = flightNumberInput.current.value;

        dispatch(requestCreateSection(rows, columns, seatClass, flightNumber, clearForm));
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
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='number' className="form-control" placeholder="Rows" ref={rowsInput} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='number' className="form-control" placeholder="Columns" ref={columnsInput} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="Seat Class" ref={seatClassInput} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
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