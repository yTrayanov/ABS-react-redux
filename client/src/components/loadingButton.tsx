import { useSelector } from "react-redux"


export default function LoadingButton({text ,loadingSelector , type , onClick} : {text:string, loadingSelector:any , type?: 'submit' , onClick?:any }) {

    const isLoading:boolean = useSelector(loadingSelector);

    return (
        <button disabled={isLoading} type={type ? type : undefined} onClick={onClick ? onClick : undefined} className="btn btn-primary btn-block">
            {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
            {text}
        </button>
    )
}