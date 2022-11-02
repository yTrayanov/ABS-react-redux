import React from 'react';
import { useDispatch } from 'react-redux';
import { requestForgottenPassword } from '../../actions/auth.actions';
import { getIsSendingEmail } from '../../store/slices/auth.slice';
import { AppDispatch } from '../../store/store';
import { ValidateEmail } from '../../utils/validator';
import { FormGroupInput } from '../formInput';

import LoadingButton from '../loadingButton';

export default function ForgottenPasswordForm() {

    const dispatch = useDispatch<AppDispatch>();

    const [emailLink, setEmailLink] = React.useState("");

    const emailInput = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (emailInput.current && ValidateEmail(emailInput.current.value)) {
            const response:any = await dispatch(requestForgottenPassword({ email: emailInput.current.value }));
            if(response.type === requestForgottenPassword.fulfilled.type)
                setEmailLink(response.payload.data);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Enter your email here</h1>
                    <form onSubmit={handleSubmit}>
                        <FormGroupInput ref={emailInput} type='text' iconClass="fas fa-envelope-square" placeholder="Email" defaultValue="oogami@abv.bg" />
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