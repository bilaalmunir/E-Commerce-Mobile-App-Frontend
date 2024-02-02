export async function deleteProduct(productId){
    try{
        const response = await fetch(
        `http://192.168.181.7:8000/deleteCar?carId=${productId}`,
        {
          method: "DELETE",
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