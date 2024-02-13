export async function getProducts(){
    try {
        const res = await fetch(`http://192.168.189.7:8000/getAllCars`, {
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
        const res = await fetch(`http://192.168.189.7:8000/getAllUnsoldCars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
            },
        });
        return await res.json()
}catch(error){
    return error
}}

export async function getSoldProducts(){
    try {
        const res = await fetch(`http://192.168.189.7:8000/getAllSoldCars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
            },
        });
        return await res.json()
}catch(error){
    return error
}}