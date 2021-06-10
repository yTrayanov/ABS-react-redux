import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import {store} from './store/store';
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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
