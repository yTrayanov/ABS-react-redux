const BASE_URL = 'http://localhost:5000/auth/';

const AuthService ={
    login:async (username , password) =>{
        const res = await window.fetch(BASE_URL + 'login' , {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username,password})
        })
        .catch(error =>{
            return error;
        });

        return res.json();
    },

    register:async (username , email , password) =>{
        const res = await window.fetch(BASE_URL + 'register' , {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username,email ,password})
        }).catch(error =>{
            return error;
        })

        return res.json();
    }
}

export default AuthService;