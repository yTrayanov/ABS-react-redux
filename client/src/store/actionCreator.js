export default function actionCreator(action) {

        const values = ['SUCCESS' , 'FAILURE' , 'REQUEST' , 'CLEAR'];
        const types = values.reduce((acc , value) => {
            const type = `${action}_${value}`;
            acc[value] = type;
            acc[value.toLowerCase()] = data => ({
                type,
                data
            })

            return acc;
        },{});

        return types;
}