const BASE_URL = 'http://localhost:5000/auth/';

const аuthService ={
    login:async (username , password) =>{
        const res = await window.fetch(BASE_URL + 'login' , {
            method:'POST',
            credentials:'include',
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
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username,email ,password})
        }).catch(error =>{
            return error;
        })

        return res.json();
    },

    logout: async () =>{
        await window.fetch(BASE_URL + 'logout',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
}

export default аuthService;