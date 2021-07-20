
export default function LoadingButton({text ,isLoading , type , onClick} : {text:string, isLoading:boolean , type?: 'submit' , onClick?:any }) {


    return (
        <button type={type ? type : undefined} onClick={onClick ? onClick : undefined} className="btn btn-primary btn-block">
            {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
            {text}
        </button>
    )
}