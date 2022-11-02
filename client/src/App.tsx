import {useState ,createContext} from 'react';
import {Navigate, Route , Routes } from 'react-router-dom';

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
import CreateAirline from './components/air/createAirline';
import CreateAirport from './components/air/createAirport';
import Popup from './components/popup';

import {getIsAdmin, getIsLogged} from './store/slices/auth.slice';
import { useSelector } from 'react-redux';

interface IContextProps{
  setShowPopup?:any,
  setPopupText?:any
}

export const PopupContext = createContext<IContextProps>({});

export default function App() {

  const isAdmin = useSelector(getIsAdmin);
  const isLogged = useSelector(getIsLogged);

  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState('Success');


  const handlePopupClose = () => {
    setShowPopup(false);
  }


  return (
    <div className="App">
      <PopupContext.Provider 
      value={{
        setShowPopup,
        setPopupText
      }}>
        <Navigation />
        <Popup text={popupText} shouldShow={showPopup} handleClose={handlePopupClose} />
        <Routes>
          <Route path='/section/create' element={RequireAuth((isAdmin), <CreateSection/>, getRedirection(isLogged))} />
          <Route path='/flight/create' element={RequireAuth((isAdmin), <CreateFlight/>, getRedirection(isLogged))} />
          <Route path='/flight/all' element={RequireAuth((isAdmin), <AllFlights/>, getRedirection(isLogged))} />
          <Route path='/flight/information/:id' element={RequireAuth((isAdmin), <FlightInformation/>, getRedirection(isLogged))} />
          <Route path='/airline/create' element={RequireAuth((isAdmin), <CreateAirline/>, getRedirection(isLogged))} />
          <Route path='/airport/create' element={RequireAuth((isAdmin), <CreateAirport/>, getRedirection(isLogged))} />
          <Route path='/user/tickets' element={RequireAuth((isLogged), <UserTickets/>, "/login")} />
          <Route path='/flight/ticketsForms' element={<TicketRegistrationForms/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/forgotten-password/:id' element={<ForgottenPassword/>} />
          <Route path='/flight/reserve' element={<SeatPicker/>} />
          <Route path='/' element={<Search/>} />
          <Route path="/forgotten-password" element={<ForgottenPasswordForm/>} />
        </Routes>
      </PopupContext.Provider>
    </div>
  )
}

function RequireAuth(requirement:boolean,children:React.ReactNode , redirectTo:string) : React.ReactNode{
  return requirement ? children : <Navigate to={redirectTo} />;
}

function getRedirection(isLoggedIn:boolean){
  if(isLoggedIn){
    return "/";
  }
  else{
    return "/login";
  }
}