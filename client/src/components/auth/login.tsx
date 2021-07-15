import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { login, getLoggingIn, getLogginError } from '../../store/reducers/authReducer';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const isLogging = useSelector(getLoggingIn);
    const loggingError = useSelector(getLogginError);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (usernameInput.current && passwordInput.current)
            dispatch(login(usernameInput.current.value, passwordInput.current.value, history));
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input ref={usernameInput} type='text' className="form-control" placeholder="Username" defaultValue="user1" />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-unlock-alt"></i> </span>
                            </div>
                            <input ref={passwordInput} type="password" className="form-control" placeholder="Password" defaultValue="user123" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" > 
                            {isLogging && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Sign In
                            </button>
                        </div>
                    </form>
                    {loggingError ? <span>{loggingError}</span> : null}
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    )
}