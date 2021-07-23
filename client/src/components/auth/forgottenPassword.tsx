import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { requestChangePassword } from '../../actions/auth.actions';
import { getIsChangingPassowrd } from '../../store/reducers/authReducer';
import LoadingButton from '../loadingButton';

export default function ForgottenPassword () {
    const params:{id:string} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const id = params.id;

    const isLoading = useSelector(getIsChangingPassowrd);

    const passwordInput = React.useRef<HTMLInputElement>(null);
    const confirmPasswordInput = React.useRef<HTMLInputElement>(null);


    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(passwordInput.current && confirmPasswordInput.current && passwordInput.current.value === confirmPasswordInput.current.value){
            dispatch(requestChangePassword(passwordInput.current.value , id));

            if(!isLoading){
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
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">  <i className="fas fa-envelope-square"></i></span>
                            </div>
                            <input ref={passwordInput} type='text' className="form-control" placeholder="New password" />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">  <i className="fas fa-envelope-square"></i></span>
                            </div>
                            <input ref={confirmPasswordInput} type='text' className="form-control" placeholder="New password" />
                        </div>

                        <div className="form-group">
                            <LoadingButton type="submit" isLoading={isLoading} text="Change password+" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}