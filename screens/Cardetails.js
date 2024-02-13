import { Component } from "react";
import { View,Text, TouchableOpacity, StyleSheet } from "react-native";
import { buyCarr} from "../api/putApi";
import { deleteProduct } from "../api/deleteApi";
import { setWishlistItem } from "../api/postApi";
import Mainpage from "../TabNavigation/Mainpage";
class Cardetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bought: false,
      listed:false,
    };
  }
  componentDidUpdate() {
    if (this.state.bought !== this.prevState.bought) {
    }
  }
  
  render() {
    const { navigation } = this.props;
    const { route } = this.props;
    const { detail, user } = route.params;
    const isInWishlist = user.wishlist.product.some(product => product.id === detail.id);
    //console.log("detail object", JSON.stringify(detail, null, 2));
    //console.log("car id" + detail.id);
    //console.log("user id" + JSON.stringify(user));
    //console.log("car published by:" + detail.publishedBy);

    const buyCar = async () => {
      console.log("buy car api")
      const response = await buyCarr(detail.id,user.userID)
      const json = await response.json();
      console.log("json:" + json.ID);
      if (json.ID) {
        this.setState({ bought: true });
        console.log("itna chal gya");
      }
    };
    const addToWishlist = async () => {
      console.log(user)
      console.log("wishlist api")
      
      response = await setWishlistItem(user.userID,detail.id)
      if(response !== undefined){
        console.log("json add to Wishlist API")
      }
      if(response === 200){
        console.log("added to users's wishlist!")
        this.setState({listed:true})
      } else {
        console.error("error adding to wishlist: ", response)
      }
    }
    const deleteCar = async () => {
      const response = await deleteProduct(detail.id)
      if (response !== undefined) {
        console.log("json delete API:" + response);
  
        if (response === 500 || response === 200) {
          this.props.navigation.replace('Mainpage', { user: user });
        }
      } else {
        console.error("Invalid response:", response);
      }
    };

    
    return (
      <View style={carDetailStyles.container}>
      <Text>Published By: {detail.publishedBy}</Text>
      <Text>Model: {detail.model}</Text>
      <Text>Color: {detail.color}</Text>  
      <Text>Price: ${detail.price}</Text>
      {detail.status ? (
        <Text style={carDetailStyles.soldText}>SOLD!</Text>
      ) : (
        <View>
          <Text>STILL ON MARKET!</Text> 
          {detail.publishedBy !== user.userID ? (
            <View>
              <TouchableOpacity onPress={() => buyCar()}>
                <Text style={carDetailStyles.buyNowText}>BUY NOW!</Text> 
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}

      {detail.publishedBy === user.userID ? (
        <View>
          <TouchableOpacity onPress={() => deleteCar()}>
            <Text style={carDetailStyles.removeCarText}>REMOVE CAR NOW!</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {
        detail.publishedBy === user.userID ? (
          null
        ):(isInWishlist?
         (<Text>Added to wishlist!</Text>)
         :
         (<View> 
          <TouchableOpacity onPress={() => addToWishlist()}>
            <Text> Add to wishlist!</Text>
          </TouchableOpacity>
          </View>)
        )
      }
    </View>
    
    );
  }
}
const carDetailStyles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  soldText: {
    color: 'red',
    fontWeight: 'bold',
  },
  buyNowText: {
    color: 'green',
  },
  removeCarText: {
    color: 'red',
  },
});

export default Cardetails;
