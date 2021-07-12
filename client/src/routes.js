import { Route , Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';

import {getIsAdmin , getIsLogged } from './store/reducers/authReducer'

export const AdminRoute = ({ component: Component, ...res }) => {
    const isAdmin = useSelector(getIsAdmin);

    return (
        <Route  {...res} render={props => (isAdmin ? (<Component {...props} />) : (<Redirect to={{pathname:'/', state: {from:props.location}}} />))} />
    )
}

export const PrivateRoute = ({ component: Component, ...res }) => {
    const isLogged = useSelector(getIsLogged);

    return (
        <Route  {...res} render={props => (isLogged ? (<Component {...props} />) : (<Redirect to={{pathname:'/', state: {from:props.location}}} />))} />
    )
}

export const PublicRoute = ({ component: Component, ...res }) => {
    const isLogged = useSelector(getIsLogged);

    return (
        <Route  {...res} render={props => (!isLogged ? (<Component {...props} />) : (<Redirect to={{pathname:'/', state: {from:props.location}}} />))} />
    )
}