export default function reducerHandler (state, action, actionHandler, initialState) {

    switch (action.type) {
        case actionHandler.REQUEST:
            return { ...state, isLoading: true }
        case actionHandler.SUCCESS:
            return { ...state, isLoading: false, data: action.payload, error: null }
        case actionHandler.FAILURE:
            return { ...state, isLoading: false, error: action.payload}
            case actionHandler.CLEAR:
                return initialState;
        default:
            return state;
    }
}