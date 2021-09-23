import React from 'react';

interface IProps{
    shouldShow:boolean;
    text:string;
    handleClose:any
}

export default function Popup({shouldShow , text , handleClose}:IProps) {

    return (
        <div className={`popup ${shouldShow ? '' : 'hide'}`}>
            <div className='popup_inner'>
                <p>{text}</p>
                <button onClick={handleClose}><i className="fas fa-times"></i></button>
            </div>
        </div>
    )
}