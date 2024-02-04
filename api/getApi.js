export async function getProducts(){
    try {
        const res = await fetch(`http://192.168.205.7:8000/getAllCars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
            },
        });
        return await res.json()
}catch(error){
    return error
}}

export async function getProductInfo(productId,userId){
    try{const response = await fetch(
        `http://192.168.205.7:8000/buyCar?ID=${productId}&userID=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      return await response.json()
    }catch(error){
        return error
    }
}