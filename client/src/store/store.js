import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {authReducer} from './reducers/authReducer';
import { ticketsReducer } from './reducers/ticketsReducer';
import { sectionReducer } from './reducers/sectionReducer';
import {flightReducer} from './reducers/flightReducer'


const appReducer = combineReducers({
    auth:authReducer,
    tickets:ticketsReducer,
    sections:sectionReducer,
    flights:flightReducer
})

const rootReducer = (state , action ) => {
    if(action.type === "CLEAR"){
        return appReducer(undefined , action);
    }

    return appReducer(state, action);
}



export const store = createStore(rootReducer , applyMiddleware(thunk));