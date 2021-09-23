import React from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { FormGroupInput } from '../formInput';
import LoadingButton from '../loadingButton';
import { PopupContext } from '../../App';

import { requestCreate } from '../../actions/airline-airport.actions';
import { getIsCreating , getCreateError } from '../../store/slices/create.slice';

export default function CreateAirline () {
    const dispatch = useDispatch();

    const airlineNameInput = React.useRef<HTMLInputElement>(null);
    const errorMessage = useSelector(getCreateError);

    const {setShowPopup , setPopupText} = React.useContext(PopupContext);

    const createAirline = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nameRegex = new RegExp(/^[A-Z]+$/);

        if(!airlineNameInput.current)
            return;

        const name:string = airlineNameInput.current.value;


        if(name.length > 6 || name.length === 0 || !nameRegex.test(name) ){
            alert('Invalid airline name');
            return;
        }

        const result:any = await dispatch(requestCreate({objectName:airlineNameInput.current.value , objectType:'AIRLINE'}));

        if (result.type === requestCreate.fulfilled.type && airlineNameInput.current){
            airlineNameInput.current.value = '';
            setPopupText("Airline created successfully")
            setShowPopup(true);
        }

    }

    return (
        <>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Create Airline</h1>
                    <form onSubmit={createAirline}>
                        <FormGroupInput type="text" iconClass='fas fa-text' placeholder="Name" ref={airlineNameInput} />
                        <div className="form-group">
                            <LoadingButton type="submit" loadingSelector={getIsCreating} text="Create" />
                        </div>
                    </form>
                    <ul>
                        <li>Must contain only upper cased letters</li>
                        <li>Length must be lower or equal to 6</li>
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
