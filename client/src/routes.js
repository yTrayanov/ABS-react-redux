import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';

import {getIsAdmin , getIsLogged } from './store/reducers/authReducer'

export const AdminRoute = ({ component: Component, ...res }) => {
    const history = useHistory();
    const isAdmin = useSelector(getIsAdmin);

    return (
        <Route  {...res} render={props => (isAdmin ? (<Component {...props} />) : (history.push('/')))} />
    )
}

export const PrivateRoute = ({ component: Component, ...res }) => {
    const history = useHistory();
    const isLogged = useSelector(getIsLogged);

    return (
        <Route  {...res} render={props => (isLogged ? (<Component {...props} />) : (history.push('/')))} />
    )
}

export const PublicRoute = ({ component: Component, ...res }) => {
    const history = useHistory();
    const isLogged = useSelector(getIsLogged);

    return (
        <Route  {...res} render={props => (!isLogged ? (<Component {...props} />) : (history.push('/')))} />
    )
}