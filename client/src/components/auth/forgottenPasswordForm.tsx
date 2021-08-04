import React from 'react';
import { useDispatch } from 'react-redux';
import { requestForgottenPassword } from '../../actionsWithRTK/auth.actions';
import {getIsSendingEmail } from '../../store/slices/authSlice';
import { ValidateEmail } from '../../utils/validator';

import LoadingButton from '../loadingButton';

export default function ForgottenPasswordForm() {

    const dispatch = useDispatch();

    const [emailLink , setEmailLink] = React.useState("");

    const emailInput = React.useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(emailInput.current && ValidateEmail(emailInput.current.value)){
            dispatch(requestForgottenPassword({email:emailInput.current.value , setEmailLink}));
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Enter your email here</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">  <i className="fas fa-envelope-square"></i></span>
                            </div>
                            <input ref={emailInput} type='text' className="form-control" placeholder="Email" defaultValue="oogami@abv.bg"/>
                        </div>

                        <div className="form-group">
                            <LoadingButton type="submit" loadingSelector={getIsSendingEmail} text="Continue" />
                        </div>
                    </form>
                    {emailLink ? <a href={emailLink} >Email here</a> : null}
                </div>
            </div>
        </>
    )
}