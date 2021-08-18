import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { requestChangePassword } from '../../actions/auth.actions';
import { getIsChangingPassowrd } from '../../store/slices/auth.slice';
import { FormGroupInput } from '../formInput';
import LoadingButton from '../loadingButton';

export default function ForgottenPassword() {
    const params: { id: string } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const id = params.id;

    const passwordInput = React.useRef<HTMLInputElement>(null);
    const confirmPasswordInput = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (passwordInput.current && confirmPasswordInput.current && passwordInput.current.value === confirmPasswordInput.current.value) {
            const result: any = await dispatch(requestChangePassword({ password: passwordInput.current.value, requestId: id }));

            if (result.type === requestChangePassword.fulfilled.type) {
                history.push('/login');
            }
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1>Change your password</h1>
                    <form onSubmit={handleSubmit}>
                        <FormGroupInput ref={passwordInput} type='password' iconClass="fas fa-unlock-alt" placeholder="New password" />
                        <FormGroupInput ref={confirmPasswordInput} type='password' iconClass="fas fa-unlock-alt" placeholder="Confirm password" />
                        <div className="form-group">
                            <LoadingButton type="submit" loadingSelector={getIsChangingPassowrd} text="Change password" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}