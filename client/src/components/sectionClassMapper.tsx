export default function SectionClassMapper({ seatClass }: { seatClass: string | number }) {

    switch (seatClass) {
        case 0:
            return <>FIRST</>
        case 1:
            return <>BUSSINESS</>
        case 2:
            return <>ECONOMY</>
        default:
            return <>{(seatClass as string).toUpperCase()}</>
    }
}