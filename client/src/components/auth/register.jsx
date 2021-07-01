import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { postRequest } from '../../requests';
import { REGISTER_URL } from '../../urls';


const initialState = {
    passwordError: '',
    usernameError: '',
    emailError: ''
};

const reducer = (state, action) => {
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

    const usernameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();

    const [state, dispatch] = React.useReducer(reducer, initialState);


    const handleSubmit = (event) => {
        event.preventDefault();
        let error = false;

        const passwordRegex = new RegExp(/[A-za-z]+[1-9]+/);

        dispatch({ type: "initial" });

        if (usernameInput.current.value.length < 4) {
            dispatch({ type: 'username' });
            error = true;
        }


        const emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]+)\])/);

        if (!emailRegex.test(emailInput.current.value)) {
            dispatch({ type: 'email' });
            error = true;
        }


        if (!passwordRegex.test(passwordInput.current.value)) {
            dispatch({ type: 'password' });
            error = true;
        }

        if (error) {
            return;
        }

        postRequest(REGISTER_URL, {username:usernameInput.current.value, email:emailInput.current.value, password:passwordInput.current.value})
            .then((response) => {
                if (response.success)
                    history.push('/login')

                console.log('Registration failed');
            })

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
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="Email" ref={emailInput} />
                        </div>
                        {state.emailError ? <span>{state.emailError}</span> : null}
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type="password" className="form-control" placeholder="Password" ref={passwordInput} />
                        </div>
                        {state.passwordError ? <span>{state.passwordError}</span> : null}
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" > Sign Up </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    )
}