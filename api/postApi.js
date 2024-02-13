export async function userSignup(username, firstname, lastname, email, password, profilePicture) {
    try {
        console.log("handling sign up now");

        const formData = new FormData();
        formData.append('username', username);
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profilePicture', profilePicture);

        const response = await fetch('http://192.168.189.7:8000/registerUser', {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function userLogin(username,password){
    try {
        const response = await fetch(`http://192.168.189.7:8000/loginUser?username=${username}&password=${password}`, {
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

export async function addProduct(carName,model,color,userId){
    try{
        const carInfo = await fetch(`http://192.168.205.7:8000/addCar?carName=${carName}&model=${model}&color=${color}&userId=${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                    },
                }
                );
                if (carInfo.ok) {
                    return await carInfo.json();
                } else {
                    throw new Error('Failed to add car');
                }
            } catch (error) {
                console.error('Error adding car:', error);
                return { error: 'Failed to add car' };
            }
}

export async function setWishlistItem(userId,productId){
    try{
        const response = await fetch(`http://192.168.205.7:8000/setWishlistItem?userId=${userId}&productId=${productId}`,
    {
        method: 'POST',
        headers: {
            'content-Type' : 'Application/json',
        },
    });
    if (response.ok) {
        const jsonResponse = await response.json();
  
        if (jsonResponse === "added to watchlist!") {
          return response;
        } else {
          throw new Error("Unexpected response from the server");
        }
      } else {
        throw new Error("Error adding to wishlist!");
      }
    } catch (error) {
      return error;
    }
  }
