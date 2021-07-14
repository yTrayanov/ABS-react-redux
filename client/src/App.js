import { Switch, Route } from 'react-router-dom';

import './App.scss';
import Navigation from './components/navigation';
import Login from './components/auth/login';
import Register from './components/auth/register';
import CreateFlight from './components/flight/createFlight';
import Home from './components/home';
import UserTickets from './components/ticket/userTickets';
import FlightDetails from './components/flight/flightDetails';
import CreateSection from './components/section/createSection';
import RegisterTickets from './components/ticket/registerTickets';
import AllFlights from './components/flight/allFlights';
import FlightInformation from './components/flight/flightInformation';

import { AdminRoute, PrivateRoute ,PublicRoute } from './routes';


function App() {

  return (
    <div className="App">
      <>
        <Navigation />
        <Switch>
          <AdminRoute exact path='/section/create' component={CreateSection} />
          <AdminRoute exact path='/flight/create' component={CreateFlight} />
          <AdminRoute exact path='/flight/all' component={AllFlights} />
          <AdminRoute exact path='/flight/information/:id' component={FlightInformation}/>
          <PrivateRoute exact path='/user/tickets' component={UserTickets} />
          <PrivateRoute exact path='/flight/:id/ticketsForms' component={RegisterTickets}/>
          <PublicRoute exact path='/login' component={Login} />
          <PublicRoute exact path='/register' component={Register} />
          <Route exact path='/' component={Home} />
          <Route exact path='/flight/:id' component={FlightDetails} />
        </Switch>
      </>
    </div>
  );
}

export default App;
