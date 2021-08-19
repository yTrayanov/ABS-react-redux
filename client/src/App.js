import { Switch, Route } from 'react-router-dom';

import './App.scss';
import Navigation from './components/navigation';
import Login from './components/auth/login';
import Register from './components/auth/register';
import CreateFlight from './components/flight/createFlight';
import Search from './components/search';
import UserTickets from './components/ticket/userTickets';
import CreateSection from './components/section/createSection';
import AllFlights from './components/flight/allFlights';
import FlightInformation from './components/flight/flightInformation';
import SeatPicker from './components/flight/seatPicker';
import TicketRegistrationForms from './components/ticket/ticketRegistrationForms';
import ForgottenPasswordForm from './components/auth/forgottenPasswordForm';
import ForgottenPassword from './components/auth/forgottenPassword';

import { AdminRoute, PrivateRoute ,PublicRoute } from './routes';


function App() {

  return (
    <div className="App">
        <Navigation />
        <Switch>
          <AdminRoute exact path='/section/create' component={CreateSection} />
          <AdminRoute exact path='/flight/create' component={CreateFlight} />
          <AdminRoute exact path='/flight/all' component={AllFlights} />
          <AdminRoute exact path='/flight/information/:id' component={FlightInformation}/>
          <PrivateRoute exact path='/user/tickets' component={UserTickets} />
          <PrivateRoute exact path='/flight/ticketsForms' component={TicketRegistrationForms}/>
          <PublicRoute exact path='/login' component={Login} />
          <PublicRoute exact path='/register' component={Register} />
          <PublicRoute exact path='/forgotten-password/:id' component={ForgottenPassword}/>
          <Route exact path='/flight/reserve' component={SeatPicker} />
          <Route exact path='/' component={Search} />
          <Route exact path="/forgotten-password" component={ForgottenPasswordForm} />
        </Switch>
    </div>
  );
}

export default App;
