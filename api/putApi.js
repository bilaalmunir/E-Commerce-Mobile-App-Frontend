const link="192.168.191.7"
export async function buyCarr(productId,userId){
    try{const response = await fetch(
        `http://${link}:8000/buyCar?ID=${productId}&userID=${userId}`,
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

export async function removeFromWishlist(userId,productId){
  try{
    const response = await fetch(
    `http://${link}:8000/removeWishlistItem?userId=${userId}&productId=${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.status;
}catch(error){
    return error
}
}