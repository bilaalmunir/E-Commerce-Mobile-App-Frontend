export async function buyCarr(productId,userId){
    try{const response = await fetch(
        `http://192.168.189.7:8000/buyCar?ID=${productId}&userID=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      //console.log(response.json())
      const resu = await response.json()
      //console.log("resuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", resu)
      return  resu
    }catch(error){
        return error
    }
}