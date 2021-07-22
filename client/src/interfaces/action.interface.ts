export interface IAction{
    type:string,
    payload:any
}

export interface IActionType{
    SUCCESS:string,
    FAILURE:string,
    REQUEST:string,
    success:(data?:any) => IAction
    failure:(data?:any) => IAction
    request:(data?:any) => IAction
}