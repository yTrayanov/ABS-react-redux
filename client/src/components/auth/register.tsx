import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getIsRegistering } from '../../store/slices/auth.slice';
import { requestRegister } from '../../actions/auth.actions';
import LoadingButton from '../loadingButton';
import { ValidateEmail } from '../../utils/validator';
import {FormGroupInput} from '../formInput';
import { AppDispatch } from '../../store/store';


const initialState = {
    passwordError: '',
    usernameError: '',
    emailError: ''
};

const reducer = (state = initialState, action: { type: 'password' | 'username' | 'email' | 'initial' }) => {
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
    const reduxDispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const usernameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const [state, innerDispatch] = React.useReducer(reducer, initialState);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let error = false;

        const passwordRegex = new RegExp(/[A-Za-z]+[1-9]+/);

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

            const result: any = await reduxDispatch(requestRegister({
                username: usernameInput.current.value,
                password: passwordInput.current.value,
                email: emailInput.current.value,
            }));

            if (result.type === requestRegister.fulfilled.type) {
                navigate('/login')
            }
        }

    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>

                        <FormGroupInput type="text" placeholder="Username" defaultValue='user2'  iconClass="fa fa-user" ref={usernameInput}/>
                        {state.usernameError ? <span className="text-danger">{state.usernameError}</span> : null}

                        <FormGroupInput type='text' placeholder="Email" defaultValue="user2@user.bg" iconClass="fas fa-envelope-square"  ref={emailInput}/>
                        {state.emailError ? <span className="text-danger" >{state.emailError}</span> : null}

                        <FormGroupInput type='password' placeholder='password' defaultValue="user123" iconClass="fas fa-unlock-alt" ref={passwordInput}/>
                        {state.passwordError ? <span className="text-danger" >{state.passwordError}</span> : null}
                        
                        <div className="form-group">
                            <LoadingButton text="Sign Up" loadingSelector={getIsRegistering} type="submit" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    )
}