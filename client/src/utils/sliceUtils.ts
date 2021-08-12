export const GetTargetState = (state: any, action: any) => {
    const neededState = action.type.split('/')[1];
    return state[neededState];
}
 
export const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

export const success = (state: any, action: any) => {
    state.isLoading = false;
    state.data = action.payload;
    state.error = null;
    state.loaded = true
}

export const failure = (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
    state.loaded = false;
}
export const request = (state: any) => {
    state.isLoading = true;
    state.loaded = false;
}