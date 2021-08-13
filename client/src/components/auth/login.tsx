import React, { useRef } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { requestLogin } from '../../actions/auth.actions';
import LoadingButton from '../loadingButton';
import  {getIsLogging, getLogginError } from '../../store/slices/auth.slice';

export default function Login() {
    const dispatch = useDispatch();

    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const loggingError = useSelector(getLogginError);

    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (usernameInput.current && passwordInput.current)
            dispatch(requestLogin({username:usernameInput.current.value ,password:passwordInput.current.value})); 

    }

    return (
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
                    <Link to="/forgotten-password">Forgot password?</Link>
                    <div className="form-group">
                        <LoadingButton type="submit" loadingSelector={getIsLogging} text="Sign In" />
                    </div>
                </form>
                {loggingError ? <span>{loggingError}</span> : null}
            </div>
        </div>
    )
}