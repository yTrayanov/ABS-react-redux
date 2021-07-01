import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { postRequest } from '../../requests';
import {LOGIN_URL} from '../../urls';
import { ACTIONS  } from '../../store/authReducer';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [error, setError] = useState('');
    const usernameInput = useRef();
    const passwordInput = useRef();



    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(LOGIN_URL);
        postRequest(LOGIN_URL , {username:usernameInput.current.value , password:passwordInput.current.value}).then((response) =>{
            if(!response.success)
                throw new Error(response.message);
                
            window.localStorage.setItem('token', response.token);
            dispatch({ type: ACTIONS.LOGIN, payload: { token: response.token, isAdmin: response.user.isAdmin}});
            history.push('/');
        }).catch(err => {
            setError(err.message);
        })
        
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
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input ref={passwordInput} type="password" className="form-control" placeholder="Password" defaultValue="user123" />
                        </div>
                        <div className="form-group">
                            <button type="submit" href='/' className="btn btn-primary btn-block" > Sign In </button>
                        </div>
                    </form>
                    {error ? <span>{error}</span> : null}
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    )
}