export default function actionCreator(action:string) {

        const values:string[] = ['SUCCESS' , 'FAILURE' , 'REQUEST'];
        const types:any = values.reduce((acc:{[key:string]:any} , value:string) => {
            const type:string = `${action}_${value}`;
            acc[value] = type;
            acc[value.toLowerCase()] = (payload:any) => ({
                type,
                payload
            })

            return acc;
        },{});

        return types;
}