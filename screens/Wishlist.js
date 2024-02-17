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
    if (wishlist && wishlist.product) {
        const pro = wishlist.product.map((product, index) => {
            console.log(`Product ${index + 1}:`, product);
            return product;
        });
        this.setState({
            products: pro
        });
    } else {
        console.log("Wishlist or product is null or undefined");
        this.setState({
            products: []
        });
    }
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
    return (
        <View>
            <Text>Wishlist</Text>
    
            {this.state.products.length > 0 || this.state.products !== "null"? (
                <View>
                    {this.state.products.map((product, index) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => this.showDetails(product)} >
                                <Text>{product.carName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.RemoveFromWishlist(user.userID, product.id)}>
                                <Text>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ) : (<Text>nothing!</Text>)}
        </View>
    );
}
}
export default Wishlist;