import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getIsAdmin } from '../store/slices/auth.slice';
import { requestLogout } from '../actions/auth.actions';
import { AppDispatch } from '../store/store';

export default function Navigation() {
    const dispatch = useDispatch<AppDispatch>();

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
                                <Link to='/' className='logo'>AirlineBookingSystem</Link>
                            </li>
                            {(isLogged && !isAdmin) && <li className='nav-link'><Link to="/user/tickets" >Tickets</Link></li>}
                            {(isLogged && isAdmin) && <li className='nav-link'><Link to='/flight/all'>All Flights</Link></li>}

                            {(isLogged && isAdmin) &&
                                <li className="dropdown">
                                    <p className="dropbtn">Create</p>
                                    <div className="dropdown-content">
                                        <Link to='/flight/create'>Flight</Link>
                                        <Link to="/section/create" >Section</Link>
                                        <Link to="/airline/create">Airline</Link>
                                        <Link to="/airport/create">Airport</Link>
                                    </div>
                                </li>}

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
