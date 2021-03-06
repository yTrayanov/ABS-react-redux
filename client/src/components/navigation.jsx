import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getIsAdmin } from '../store/authReducer';
import { ACTIONS } from '../store/authReducer';


import { postRequest } from '../requests';
import { LOGOUT_URL } from '../urls';

export default function Navigation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogged = useSelector(getIsLogged);
    const isAdmin = useSelector(getIsAdmin);

    const Logout = () => {
        postRequest(LOGOUT_URL, {})
        .then(() => {
            dispatch({ type: ACTIONS.LOGOUT });
        }).then(() => {
            history.push('/');
        })

    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="navbar-collapse collapse" >
                    <ul className="navbar-nav mr-auto">
                        <li className='nav-link'>
                            <span to='/' >AirlineBookingSystem</span>
                        </li>
                        <li className='nav-link'>
                            <Link to='/'>Home</Link>
                        </li>
                        {!isLogged ? <li className='nav-link'><Link to='/login'>Login</Link></li> : null}
                        {!isLogged ? <li className='nav-link'><Link to='/register'>Register</Link></li> : null}
                        {isLogged && !isAdmin ? <li className='nav-link'><Link to="/user/tickets" >Tickets</Link></li> : null}
                        {(isLogged && isAdmin) ? <li className='nav-link'><Link to='/flight/create'>Create Flight</Link></li> : null}
                        {isLogged && isAdmin ? <li className='nav-link'><Link to="/section/create" >Create Section</Link></li> : null}
                        {isLogged ? <li className='nav-link'><a href="/" onClick={Logout}>Logout</a></li> : null}

                    </ul>
                </div>
            </nav>
        </header>
    )
}
