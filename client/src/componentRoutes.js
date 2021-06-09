import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogged, getIsAdmin } from './store/authReducer';

export const PrivateRoute = ({ component: Component, ...res }) => {

    const isLogged = useSelector(getIsLogged);

    return (
        <Route {...res} render={props => (
            isLogged ? (<Component {...props} />)
                : (<Redirect to={{ pathname: '/login' }} />)
        )} />
    )
}

export const AdminRoute = ({ component: Component, ...res }) => {

    const isAdmin = useSelector(getIsAdmin);

    return (
        <Route {...res} render={props => (
            isAdmin ? (<Component {...props} />)
                : props.history.push('/')
        )} />
    )
}