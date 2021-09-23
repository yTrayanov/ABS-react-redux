import React from 'react';

interface PropsType{
    type: 'text' | 'password' | 'datetime-local' | 'number',
    iconClass:string
    placeholder?:string,
    defaultValue?:string,
    disabled?:boolean,
    onChange?:any,
    onBlur?:any
}

export const FormGroupInput = React.forwardRef((props:PropsType , ref:any) => {

    return (
        <div className="form-group input-group">
            <div className="input-group-prepend">
                <span className="input-group-text"> <i className={props.iconClass}></i> </span>
            </div>
            <input type={props.type} 
            disabled={props.disabled}
             className="form-control" 
             placeholder={props.placeholder}
              defaultValue={props.defaultValue} 
              ref={ref} 
              onChange={props.onChange} 
              onBlur={props.onBlur} />
        </div>
    )
})