import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/auth.service';

export default function Register() {
    const history = useHistory();
    const [error, setError] = useState(false);
    const usernameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();


    const handleSubmit = (event) => {
        event.preventDefault();

        AuthService.register(usernameInput.current.value, emailInput.current.value, passwordInput.current.value)
            .then(() => {
                history.push('/login')
            }).catch(() => {
                setError(true);
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

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type='text' className="form-control" placeholder="Email" ref={emailInput} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input type="password" className="form-control" placeholder="Password" ref={passwordInput} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" > Sign Up </button>
                        </div>
                    </form>
                    {error ? <span>Invalid from</span> : null}
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    )
}