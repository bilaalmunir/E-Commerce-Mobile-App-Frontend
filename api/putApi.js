export async function userLogin(username,password){
    try {
        const response = await fetch(`http://192.168.205.7:8000/loginUser?username=${username}&password=${password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
        }
        
        );
        return await response.json()
}
catch(error){
    console.log(error)
}}