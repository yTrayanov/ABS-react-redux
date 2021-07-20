import { postRequest } from "../requests";
import { createSectionActions } from "../store/reducers/sectionReducer";
import { CREATE_SECTION_URL } from "../urls";

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