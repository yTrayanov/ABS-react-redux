import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getIsAdmin } from '../store/slices/authSlice';
import { requestLogout } from '../actionsWithRTK/auth.actions';

export default function Navigation() {
    const dispatch = useDispatch();
    const history = useHistory();


    const isLogged: boolean = useSelector(getIsLogged);
    const isAdmin: boolean = useSelector(getIsAdmin);


    const Logout = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(requestLogout([]));


    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="navbar-collapse navigation-container" >
                    <ul className="navbar-nav mr-auto navigation-list">
                        <div className="link-container">
                            <li className='nav-link'>
                                <span>AirlineBookingSystem</span>
                            </li>
                            <li className='nav-link'>
                                <Link to='/'>Home</Link>
                            </li>
                            {(isLogged && !isAdmin) && <li className='nav-link'><Link to="/user/tickets" >Tickets</Link></li>}
                            {(isLogged && isAdmin) && <li className='nav-link'><Link to='/flight/create'>Create Flight</Link></li>}
                            {(isLogged && isAdmin) && <li className='nav-link'><Link to="/section/create" >Create Section</Link></li>}
                            {(isLogged && isAdmin) && <li className='nav-link'><Link to='/flight/all'>All Flights</Link></li> }
                        </div>

                        <div className="link-container">
                            {!isLogged && <li className='nav-link'><Link to='/login'>Login</Link></li>}
                            {!isLogged && <li className='nav-link'><Link to='/register'>Register</Link></li>}
                            {isLogged && <li className='nav-link'><a href="/" onClick={Logout}>Logout</a></li>}
                        </div>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
