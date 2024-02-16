import { Component } from "react";
import { View,Text, TouchableOpacity, StyleSheet } from "react-native";
import { removeFromWishlist } from "../api/putApi";

class Wishlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:[],
            meow:false
        }
       // this.showDetails = this.showDetails.bind(this);
    }
    componentDidMount(){
       
        this.getItems()
    }
    componentDidUpdate(prevProps,prevState){
        if(this.state.meow !== prevState.meow){
            this.getItems()
        }
    }
    getItems = () => {
        const { wishlist } = this.props.route.params.user;
        const pro=[]
        wishlist.product.forEach((product, index) => {
            console.log(`Product ${index + 1}:`, product);
            pro.push(product);
        });
        this.setState({
            products:pro})
    }
    RemoveFromWishlist = async (userId, productId) => {
        console.log("wishlist removee ", userId , productId);
        const response = await removeFromWishlist(userId,productId)
        if (response !== undefined) {
            console.log("json delete API:" + response);
      
            if (response === 500 || response === 200) {
                this.setState({meow:true})
              //this.props.navigation.goBack();
            }
          } else {
            console.error("Invalid response:", response);
          }
        };
        showDetails = (detail) => {
            const{navigation} = this.props;
          // console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",this.props.route.params.user)
          if (detail.id) {
          console.log("car id" + detail.id);
          navigation.navigate("Cardetails", {
            detail: detail,
            user: this.props.route.params.user,
          });
          } else {
          console.log("detail id nai ai");
          this.setState({ error: true });
          }
          };
render (){
    
    const{navigate,route} = this.props;
    const{user} = route.params
    return(
        <View>
        <Text>Wishlist</Text>
        
                {this.state.products.map((product, index) => (
                    <View><TouchableOpacity key={product.ID} onPress={() => this.showDetails(product)} >
                        <Text>{product.carName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity key={index} onPress={() => this.RemoveFromWishlist(user.userID,product.id)}>
                        <Text>Remove</Text>
                    </TouchableOpacity></View>
                ))}
        
            </View>
    );
}
}
export default Wishlist;