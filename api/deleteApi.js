const link="192.168.76.7"

export async function deleteProduct(productId){
    try{
        const response = await fetch(
        `http://${link}:8000/deleteCar?carId=${productId}`,
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



