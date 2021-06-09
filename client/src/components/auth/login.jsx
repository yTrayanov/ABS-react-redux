import React , {useState,useRef} from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import AuthService from '../../services/auth.service';
import {ACTIONS} from '../../store/authReducer';

export default function Login(props){
    const dispatch = useDispatch();

    const [error , setError] = useState(false); 
    const usernameInput = useRef();
    const passwordInput = useRef();
    const history = useHistory();


    const handleSubmit = async (event) =>{
        event.preventDefault();

        await AuthService.login(usernameInput.current.value , passwordInput.current.value).then((data) => {
            dispatch({type:ACTIONS.LOGIN , payload:{token:data.token , isAdmin:data.user.isAdmin , userId:data.user.userId}});
            history.push('/');
        }).catch(() => {
            setError(true)
        })
    }

    return(
        <div>
        <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
                <h1>Sign In</h1>
                <form onSubmit ={handleSubmit}>
                    <div className="form-group input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input ref={usernameInput} type='text' className="form-control" placeholder="Username" />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input ref={passwordInput} type="password" className="form-control"  placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <button type="submit" href='/' className="btn btn-primary btn-block" > Sign In </button>
                        </div>
                </form>
                {error? <span>Wrong email or passowrd</span> : null}
            </div>
        </div>
        <div className="col-lg-4"></div>
    </div>
    )
}