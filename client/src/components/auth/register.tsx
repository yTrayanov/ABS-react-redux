import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';

import { getIsRegistering } from '../../store/reducers/authReducer';
import { register } from '../../actions/auth.actions';
import LoadingButton from '../loadingButton';
import { ValidateEmail } from '../../utils/validator';


const initialState = {
    passwordError: '',
    usernameError: '',
    emailError: ''
};

const reducer = (state=initialState, action:{type:string}) => {
    switch (action.type) {
        case 'password':
            return { ...state, passwordError: 'Password should be at least 6 characters long and a combination of letters and numbers' }
        case 'username':
            return { ...state, usernameError: 'username should be at least 4 characters long' }
        case 'email':
            return { ...state, emailError: 'Invalid email format' }
        case 'initial':
            return { passwordError: '', emailError: '', usernameError: '' }
        default:
            return state

    }
}




export default function Register() {
    const history = useHistory();
    const  reduxDispatch = useDispatch();

    const usernameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const isLoading = useSelector(getIsRegistering);

    const [state, innerDispatch] = React.useReducer(reducer, initialState);


    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let error = false;

        const passwordRegex = new RegExp(/[A-za-z]+[1-9]+/);

        innerDispatch({ type: "initial" });

        if (usernameInput.current && emailInput.current && passwordInput.current) {
            if (usernameInput.current.value.length < 4) {
                innerDispatch({ type: 'username' });
                error = true;
            }

            if (!ValidateEmail(emailInput.current.value)) {
                innerDispatch({ type: 'email' });
                error = true;
            }


            if (!passwordRegex.test(passwordInput.current.value)) {
                innerDispatch({ type: 'password' });
                error = true;
            }

            if (error) {
                return;
            }

            reduxDispatch(register(usernameInput.current.value , passwordInput.current.value , emailInput.current.value , history));
        }

    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="Username" ref={usernameInput} />
                        </div>
                        {state.usernameError ? <span>{state.usernameError}</span> : null}
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fas fa-envelope-square"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="Email" ref={emailInput} />
                        </div>
                        {state.emailError ? <span>{state.emailError}</span> : null}
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fas fa-unlock-alt"></i> </span>
                            </div>
                            <input type="password" className="form-control" placeholder="Password" ref={passwordInput} />
                        </div>
                        {state.passwordError ? <span>{state.passwordError}</span> : null}
                        <div className="form-group">
                            <LoadingButton text="Sign Up" isLoading={isLoading} type="submit" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    )
}