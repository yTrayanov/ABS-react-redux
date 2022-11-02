import React from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { FormGroupInput } from '../formInput';
import LoadingButton from '../loadingButton';
import { PopupContext } from '../../App';
import { getIsCreating, getCreateError } from '../../store/slices/create.slice';
import { requestCreate } from '../../actions/airline-airport.actions';
import { AppDispatch } from '../../store/store';

export default function CreateAirport() {
    const dispatch = useDispatch<AppDispatch>();
    const airportNameInput = React.useRef<HTMLInputElement>(null);
    const { setShowPopup, setPopupText } = React.useContext(PopupContext);
    const errorMessage = useSelector(getCreateError);

    const createAirport = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nameRegex = new RegExp(/^[A-Z]{3}$/);

        if (!airportNameInput.current)
            return;

        const name: string = airportNameInput.current.value;

        if (name.length !== 3 || !nameRegex.test(name)) {
            alert('Invalid airport name');
            return;
        }

        const result: any = await dispatch(requestCreate({ objectName: airportNameInput.current.value, objectType: 'AIRPORT' }));

        if (result.type === requestCreate.fulfilled.type && airportNameInput.current) {
            airportNameInput.current.value = '';
            setPopupText('Airport created successfully');
            setShowPopup(true);
        }

    }

    return (
        <>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Create Airprot</h1>
                    <form onSubmit={createAirport}>
                        <FormGroupInput type="text" iconClass='fas fa-text' placeholder="Name" ref={airportNameInput} />
                        <div className="form-group">
                            <LoadingButton type="submit" loadingSelector={getIsCreating} text="Create" />
                        </div>
                    </form>

                    <ul>
                        <li>Must contain only upper cased letters</li>
                        <li>Must be have length of 3</li>
                    </ul>

                </div>
            </div>
            <div className="row">
                <div className="col-4"></div>
                <h3 className="text-danger">{errorMessage}</h3>
            </div>
        </>
    )
}