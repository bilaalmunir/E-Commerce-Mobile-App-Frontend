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
      listed: false,
    };
  }
  // componentDidMount(){
   
  //   //const { navigation } = this.props;
  //   //const { route } = this.props;
  //   const { detail } = this.props.route.params;
  //   console.log("didmount mein", this.props.route.params.user);
    
  //   console.log("didmount mein id",productId)
  //   if( )){
  //     this.setState({listed:true})
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.listed !== prevState.listed || this.state.bought !== prevState.bought) {
    }
  }
  
  render() {
    const { navigation } = this.props;
    const { route } = this.props;
    const { detail, user } = route.params;
    console.log("userrrrrrrrrrrrrrrrrrrrrrr",user.userID)
    //const { productId } = detail.id;
   // const {wishlist} = user.wishlist;
    const {wantedProduct} = true
    //console.log("someeeeeeeeeeeeeeeee",products)
    // const isInWishlist = user.wishlist.product.some(product => product.id === detail.id);
    //console.log("detail object", JSON.stringify(detail, null, 2));
    //console.log("car id" + detail.id);
    //console.log("user id" + JSON.stringify(user));
    //console.log("car published by:" + detail.publishedBy);

    const buyCar = async () => {
      console.log("buy car api")
      const response = await buyCarr(detail.id,user.userID)
      //const json = await response.json();
      console.log("json:" + response.id);
      if (response.id) {
        this.setState({ bought: true });
        console.log("itna chal gya");
        console.log("bought state:", this.state.bought)
      }
    };

    const addToWishlist = async () => {
      //console.log(user)
      console.log("wishlist api")
      //console.log(detail.id)
      response = await setWishlistItem(user.userID,detail.id)
      console.log(response)
      if (response.id){
        this.setState({listed:true})
      }

    }
    const deleteCar = async () => {
      const response = await deleteProduct(detail.id)
      if (response !== undefined) {
        console.log("json delete API:" + response);
  
        if (response === 500 || response === 200) {
          //this.props.navigation.replace('Mainpage', { user: user });
          this.props.navigation.goBack();
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
        ):( wantedProduct ?
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
