import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {authReducer} from './reducers/authReducer';
import { ticketsReducer } from './reducers/ticketsReducer';
import { sectionReducer } from './reducers/sectionReducer';
import {flightReducer} from './reducers/flightReducer'

export const store = createStore(combineReducers({
    auth:authReducer,
    tickets:ticketsReducer,
    sections:sectionReducer,
    flights:flightReducer
}) , applyMiddleware(thunk));