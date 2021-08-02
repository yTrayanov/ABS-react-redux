import { postRequest } from "../requests";
import { createSectionActions } from "../store/reducers/sectionReducer";
import { CREATE_SECTION_URL } from "../urls";

export const requestCreateSection = (rows:number, columns:number, seatClass:string, flightNumber:string , callback:() =>void ) => (dispatch:any) => {
    dispatch(createSectionActions.request());

    postRequest(CREATE_SECTION_URL , {rows, columns, seatClass, flightNumber})
        .then(response => {
            if(!response.success)
                dispatch(createSectionActions.failure())

            dispatch(createSectionActions.success());
            alert("Section created");
            callback();
        }).catch(err => {
            dispatch(createSectionActions.failure(err.message));
        })
}