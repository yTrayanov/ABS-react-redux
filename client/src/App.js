import { Switch, Route } from 'react-router-dom';

import './App.css';
import Navigation from './components/navigation';
import Login from './components/auth/login';
import Register from './components/auth/register';
import CreateFlight from './components/flight/createFlight';
import Home from './components/home';
import UserTickets from './components/ticket/userTickets';
import FlightDetails from './components/flight/flightDetails';
import CreateSection from './components/section/createSection';
import { AdminRoute, PrivateRoute } from './routes';


function App() {
  return (
    <div className="App">
      <>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/flight/create' component={CreateFlight} />
          <Route exact path='/flight/:id' component={FlightDetails} />
          <Route exact path='/user/tickets' component={UserTickets} />
          <Route exact path='/section/create' component={CreateSection} />
        </Switch>
      </>
    </div>
  );
}

export default App;
