export default function actionCreator(action:any) {

        const values:string[] = ['SUCCESS' , 'FAILURE' , 'REQUEST' , 'CLEAR'];
        const types:{} = values.reduce((acc:{[key:string]:any} , value:string) => {
            const type = `${action}_${value}`;
            acc[value] = type;
            acc[value.toLowerCase()] = (data:any) => ({
                type,
                data
            })

            return acc;
        },{});

        return types;
}