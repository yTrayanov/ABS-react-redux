import {postRequest } from "../../requests";
import actionCreator from "../actionCreator";
import reducerHandler from "../reducerHandler";
import { CREATE_SECTION_URL } from '../../urls';
import IAction from "../../interfaces/action.interface";

const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

const initialState = {
    createSection: initialAsyncState,
}

const createSectionActions:any = actionCreator("CREATE_SECTION");


export const sectionReducer = (state = initialState, action:IAction) => {

    switch (action.type) {

        case createSectionActions.REQUEST:
        case createSectionActions.SUCCESS:
        case createSectionActions.FAILURE:
            return { ...state, createSection: reducerHandler(state.createSection, action, createSectionActions) };

        default:
            return state;
    }
}

export const getIsCreatingSection = (state:any) => state.sections.createSection.isLoading;


export const requestCreateSection = (rows:number, columns:number, seatClass:string, flightNumber:string , callback:() =>void ) => (dispatch:any) => {
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