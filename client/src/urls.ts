const BASE_URL:string = 'http://localhost:5000/';
const AUTH_BASE_URL:string = BASE_URL + 'auth/';
const FLIGHT_BASE_URL:string = BASE_URL + 'flight/';
const TICKET_BASE_URL:string = BASE_URL + 'ticket/';
//const SECTION_BASE_URL:string = BASE_URL + 'section/';
const CREATE_BASE_URL = BASE_URL + 'create/';

//auth
export const LOGIN_URL:string = AUTH_BASE_URL + 'login';
export const REGISTER_URL:string = AUTH_BASE_URL + 'register';
export const LOGOUT_URL:string = AUTH_BASE_URL + 'logout';
export const FORGOTTEN_PASSWORD_URL:string = AUTH_BASE_URL + 'forgottenPassword';
export const getChangePasswordUrl = (id:string) => AUTH_BASE_URL + `changePassword/${id}`;

//flight
export const CREATE_FLIGHT_URL:string = FLIGHT_BASE_URL + 'create';
export const getFilterdFlightsUrl = (originAirport:string , destinationAirport:string , departureDate:string ,membersCount:string ,returnDate?:string | null) => FLIGHT_BASE_URL + `filter/${originAirport}/${destinationAirport}/${departureDate}/${membersCount}/${returnDate ? returnDate : ''}`;
export const getFlightDetailsUrl = (flightId:string[] | string) => FLIGHT_BASE_URL + flightId; 
export const ALL_FLIGHTS_URL = FLIGHT_BASE_URL + "information/all";
export const getFlightInformationUrl = (flightId:string) => FLIGHT_BASE_URL + `information/${flightId}`;

//sections
//export const CREATE_SECTION_URL:string = SECTION_BASE_URL + 'create';
export const CREATE_SECTION_URL:string = CREATE_BASE_URL + 'section';

//tickets
export const USER_TICKETS_URL:string =  TICKET_BASE_URL + 'user';
export const CREATE_TICKET_URL:string = TICKET_BASE_URL+'create';
//export const REMOVE_TICKET_URL = TICKET_BASE_URL + 'remove';