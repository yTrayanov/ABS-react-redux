import './App.css';
import {useDispatch} from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Login from './components/auth/login';
import Register from './components/auth/register';
import CreateFlight from './components/flight/createFlight';
import Home from './components/home';
import UserTickets from './components/ticket/userTickets';
import FlightDetails from './components/flight/flightDetails';
import CreateSection from './components/section/createSection';

import { AdminRoute, PrivateRoute} from './routes';
import {ACTIONS} from './store/authReducer';



function App() {

  const dispatch = useDispatch();

    const token = window.localStorage.getItem('token');
    if (token)
      window.fetch('http://localhost:5000/auth/stat', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then(response => response.json())
      .then(({data}) => {
          dispatch({type:ACTIONS.SET_ADMIN  , payload:{isAdmin:data.isAdmin}});
      });

      
  return (
      <div className="App">
        <>
          <Navigation />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <AdminRoute exact path='/flight/create' component={CreateFlight} />
            <Route exact path='/flight/:id' component={FlightDetails} />
            <PrivateRoute exact path='/user/tickets' component={UserTickets} />
            <AdminRoute exact path='/section/create' component={CreateSection} />
          </Switch>
        </>
      </div>
  );
}

export default App;
