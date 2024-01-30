export async function userSignup(username,firstname,lastname,email,password){
    try {
        console.log("handling sign up now")
    const response = await fetch(`http://192.168.181.7:8000/registerUser?username=${username}&firstname=${firstname}&lastname=${lastname}&email=${email}&password=${password}`,{
        method:'POST',
        headers: {
            'Content-Type' : 'Application/json',
        },
        
    })
    
    return await response.json()
    }catch (error) {
        console.error(error);
        return error
    }
}
