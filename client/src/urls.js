const BASE_URL = 'http://localhost:5000/';
const AUTH_BASE_URL = BASE_URL + 'auth/';
const FLIGHT_BASE_URL = BASE_URL + 'flight/';
const TICKET_BASE_URL = BASE_URL + 'ticket/';
const SECTION_BASE_URL = BASE_URL + 'section/';
// const CREATE_BASE_URL = BASE_URL + 'create/';

//auth
export const LOGIN_URL = AUTH_BASE_URL + 'login';
export const REGISTER_URL = AUTH_BASE_URL + 'register';
export const LOGOUT_URL = AUTH_BASE_URL + 'logout';

//flight
export const CREATE_FLIGHT_URL = FLIGHT_BASE_URL + 'create';
export const getFilterdFlightsUrl = (originAirport , destinationAirport , departureDate) =>  FLIGHT_BASE_URL + `filter/${originAirport}/${destinationAirport}/${departureDate}`;
export const getFlightDetailsUrl = (flightId) => FLIGHT_BASE_URL + '/' + flightId; 

//sections
export const CREATE_SECTION_URL = SECTION_BASE_URL + 'create';

//tickets
export const USER_TICKETS_URL =  TICKET_BASE_URL + 'user';
export const CREATE_TICKET_URL = TICKET_BASE_URL+'create';
//export const REMOVE_TICKET_URL = TICKET_BASE_URL + 'remove';