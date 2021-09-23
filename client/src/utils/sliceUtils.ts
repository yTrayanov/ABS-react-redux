
export const initialAsyncState = {
    isLoading: false,
    loaded: false,
    error: null,
    data: null,
}

export const generateActionCases = (builder: any, actions: any) => {
    for (let item of actions) {
        (() => {
            builder.addCase((item.fulfilled), (state:any, action:any) => {

                const targetState = GetTargetState(state, action);
                success(targetState, action);
            });
            builder.addCase((item.rejected), (state:any, action:any) => {
                const targetState = GetTargetState(state, action);
                failure(targetState, action);
            });
            builder.addCase((item.pending), (state:any, action:any) => {
                const targetState = GetTargetState(state, action);
                request(targetState);
            });
        })();
    }
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

function GetTargetState(state: any, action: any) {
    const neededState = action.type.split('/')[1];
    return state[neededState];
}

