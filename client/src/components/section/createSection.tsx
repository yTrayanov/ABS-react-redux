import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsCreatingSection, getCreateSectionError } from '../../store/slices/section.slice';
import { requestCreateSection } from '../../actions/section.actions';
import LoadingButton from '../loadingButton';
import { FormGroupInput } from '../formInput';
import { PopupContext } from '../../App';
import { AppDispatch } from '../../store/store';

export default function CreateSection() {
    const dispatch = useDispatch<AppDispatch>();

    const rowsInput = React.useRef<HTMLInputElement>(null);
    const columnsInput = React.useRef<HTMLInputElement>(null);
    const seatClassInput = React.useRef<HTMLSelectElement>(null);
    const flightNumberInput = React.useRef<HTMLInputElement>(null);

    
    const {setPopupText , setShowPopup} = React.useContext(PopupContext);
    const errorMessage = useSelector(getCreateSectionError);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (rowsInput.current && columnsInput.current && seatClassInput.current && flightNumberInput.current) {
            const rows: number = Number.parseInt(rowsInput.current.value);
            const columns: number = Number.parseInt(columnsInput.current.value);
            const seatClass: string = seatClassInput.current.value;
            const flightNumber: string = flightNumberInput.current.value;

            const result: any = await dispatch(requestCreateSection({
                rows,
                columns,
                seatClass,
                flightNumber
            }));


            if (result.type === requestCreateSection.fulfilled.type) {
                rowsInput.current.value = '';
                columnsInput.current.value = '';
                seatClassInput.current.value = '';
                flightNumberInput.current.value = '';

                setPopupText('Section created successfully!')
                setShowPopup(true);
            }
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
                        <div className="center-horizontally text-danger">
                            <h3>
                                {errorMessage}
                            </h3>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    )
}