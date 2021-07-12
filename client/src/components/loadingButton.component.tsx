    export default function LoadingButton({isLoading , text , handleClick} : {isLoading:boolean , text:string , handleClick:null | ((event:any) => void)}) {


    return (
        <div>
            <button type={handleClick ? undefined : 'submit'} className="btn btn-primary btn-block" onClick={handleClick ? handleClick : undefined} >
                {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                {text}
            </button>
        </div>
    )
}