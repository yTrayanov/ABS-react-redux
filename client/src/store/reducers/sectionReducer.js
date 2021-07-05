import { getRequest } from "../../requests";
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";
import { getFlightDetailsUrl } from '../../urls';

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

const initialState = {
    flightSections: initialAsyncState,
}

const getSectionsActions = actionCreator("GET_SECTIONS")


export const getFlightSections = state => state.sections.flightSections.data?.sections;

export const sectionReducer = (state = initialState, action) => {

    switch (action.type) {
        case getSectionsActions.REQUEST:
        case getSectionsActions.SUCCESS:
        case getSectionsActions.FAILURE:
            return { ...state, flightSections: reducerHandler(state.flightSections, action, getSectionsActions) };
        default:
            return state;
    }
}

export const requestSections = (id) => dispatch => {
    dispatch({ type: getSectionsActions.REQUEST });

    const url = getFlightDetailsUrl(id);
    getRequest(url).then((response) => {
        if (!response.success) {
            dispatch({ type: getSectionsActions.FAILURE });
            return;
        }

        dispatch({ type: getSectionsActions.SUCCESS, payload: { sections: response.data.sections } });
    })
}