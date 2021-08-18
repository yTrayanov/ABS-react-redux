import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsCreatingSection, getHasCreatedSection, getCreateSectionError } from '../../store/slices/section.slice';
import { requestCreateSection } from '../../actions/section.actions';
import LoadingButton from '../loadingButton';
import { FormGroupInput } from '../formInput';

export default function CreateSection() {
    const dispatch = useDispatch();

    const rowsInput = React.useRef<HTMLInputElement>(null);
    const columnsInput = React.useRef<HTMLInputElement>(null);
    const seatClassInput = React.useRef<HTMLSelectElement>(null);
    const flightNumberInput = React.useRef<HTMLInputElement>(null);

    const hasCreatedSection = useSelector(getHasCreatedSection);
    const error = useSelector(getCreateSectionError);

    if (hasCreatedSection)
        if (rowsInput.current && columnsInput.current && seatClassInput.current && flightNumberInput.current) {
            rowsInput.current.value = '';
            columnsInput.current.value = '';
            seatClassInput.current.value = '';
            flightNumberInput.current.value = '';
        }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (rowsInput.current && columnsInput.current && seatClassInput.current && flightNumberInput.current) {
            const rows: number = Number.parseInt(rowsInput.current.value);
            const columns: number = Number.parseInt(columnsInput.current.value);
            const seatClass: string = seatClassInput.current.value;
            const flightNumber: string = flightNumberInput.current.value;

            dispatch(requestCreateSection({
                rows,
                columns,
                seatClass,
                flightNumber
            }));
        }

    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Create Section</h1>
                    <form onSubmit={handleSubmit}>
                        <FormGroupInput type='number' iconClass="fas fa-columns" placeholder="Rows" ref={rowsInput} />
                        <FormGroupInput type='number' iconClass="fas fa-columns" placeholder="Columns" ref={columnsInput} />
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fas fa-users-class"></i> </span>
                            </div>
                            <select className="form-control" defaultValue="FIRST" ref={seatClassInput}>
                                <option value="first" >FIRST</option>
                                <option value="bussiness">BUSSINESS</option>
                                <option value="economy">ECONOMY</option>
                            </select>
                        </div>
                        <FormGroupInput type='text' iconClass="fas fa-fingerprint" placeholder="FlightNumber" ref={flightNumberInput} />

                        <div className="form-group">
                            <LoadingButton type="submit" loadingSelector={getIsCreatingSection} text="Create" />
                        </div>
                        {error ? <p>{error}</p> : null}
                    </form>
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    )
}