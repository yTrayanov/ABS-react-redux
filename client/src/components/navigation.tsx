import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getIsAdmin, logout } from '../store/reducers/authReducer';

export default function Navigation() {
    const dispatch = useDispatch();
    const history = useHistory();

    
    const isLogged:boolean = useSelector(getIsLogged);
    const isAdmin:boolean  = useSelector(getIsAdmin);

    const Logout = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(logout(history));
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="navbar-collapse collapse" >
                    <ul className="navbar-nav mr-auto">
                        <li className='nav-link'>
                            <span>AirlineBookingSystem</span>
                        </li>
                        <li className='nav-link'>
                            <Link to='/'>Home</Link>
                        </li>
                        {!isLogged ? <li className='nav-link'><Link to='/login'>Login</Link></li> : null}
                        {!isLogged ? <li className='nav-link'><Link to='/register'>Register</Link></li> : null}
                        {isLogged && !isAdmin ? <li className='nav-link'><Link to="/user/tickets" >Tickets</Link></li> : null}
                        {(isLogged &&  isAdmin) ? <li className='nav-link'><Link to='/flight/create'>Create Flight</Link></li> : null}
                        {isLogged && isAdmin ? <li className='nav-link'><Link to="/section/create" >Create Section</Link></li> : null}
                        {(isLogged &&  isAdmin) ? <li className='nav-link'><Link to='/flight/all'>All Flights</Link></li> : null}
                        {isLogged ? <li className='nav-link'><a href="/" onClick={Logout}>Logout</a></li> : null}
                    </ul>
                </div>
            </nav>
        </header>
    )
}
