const link="192.168.191.7"
export async function getProducts(){
    try {
        const res = await fetch(`http://${link}:8000/getAllCars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
            },
        });
        return await res.json()
}catch(error){
    return error
}}


export async function getUnsoldProducts(){
    try {
        const res = await fetch(`http://${link}:8000/getAllUnsoldCars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
            },
        });
        
        const response = await res.json()
        //console.log("Unsoldddddddddddddddddd",response)
        return response
}catch(error){
    return error
}
}

export async function getSoldProducts(){
    try {
        const res = await fetch(`http://${link}:8000/getAllSoldCars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
            },
        });
        
        const response = await res.json()
        //console.log("soldddddddddddddddddd",response)
        return response
}catch(error){
    return error
}}

export async function getCommentsForPost(productId){
    try {
        const res = await fetch(`http://${link}:8000/getComments?porductId=${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
            },
        });
        const response = await res.json()
        console.log("get commmentsssssssssssssssss: ",response)
        return response
}catch(error){
    return error
}}
