import { getRequest, postRequest } from "../../requests";
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";
import { CREATE_SECTION_URL, getFlightDetailsUrl } from '../../urls';

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

const initialState = {
    flightSections: initialAsyncState,
    createSection: initialAsyncState,
}

const getSectionsActions = actionCreator("GET_SECTIONS")
const createSectionActions = actionCreator("CREATE_SECTION");


export const getFlightSections = state => state.sections.flightSections.data?.sections;

export const sectionReducer = (state = initialState, action) => {

    switch (action.type) {
        case getSectionsActions.REQUEST:
        case getSectionsActions.SUCCESS:
        case getSectionsActions.FAILURE:
            return { ...state, flightSections: reducerHandler(state.flightSections, action, getSectionsActions) };

        case createSectionActions.REQUEST:
        case createSectionActions.SUCCESS:
        case createSectionActions.FAILURE:
            return { ...state, createSection: reducerHandler(state.createSection, action, createSectionActions) };

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

export const requestCreateSection = (rows, columns, seatClass, flightNumber , callback) => dispatch => {
    dispatch({type:createSectionActions.REQUEST});

    postRequest(CREATE_SECTION_URL , {rows, columns, seatClass, flightNumber})
        .then(response => {
            if(!response.success)
                dispatch({type:createSectionActions.FAILURE})

            dispatch({type:createSectionActions.SUCCESS});
            alert("Section created");
            callback();
        })
}