import IAction from "../interfaces/action.interface";

export default function reducerHandler(state: any, action: IAction, actionHandler: any) {

    switch (action.type) {
        case actionHandler.REQUEST:
            return { ...state, isLoading: true }
        case actionHandler.SUCCESS:
            return { ...state, isLoading: false, data: action.payload, error: null }
        case actionHandler.FAILURE:
            return { ...state, isLoading: false, error: action.payload }
        default:
            return state;
    }
}