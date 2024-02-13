import { Component } from "react";
import { View,Text, TouchableOpacity, StyleSheet } from "react-native";

class Wishlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:[]
        }
    }
    componentDidMount(){

        const { wishlist } = this.props.route.params.user;
        const pro=[]
        wishlist.product.forEach((product, index) => {
            console.log(`Product ${index + 1}:`, product);
            pro.push(product);
        });
        this.setState({
            products:pro})
    }
render (){
    const{route} = this.props;
    const{user} = route.params
    return(
        <View>
        <Text>Wishlist</Text>
        
                {this.state.products.map((product, index) => (
                    <TouchableOpacity key={index}>
                        <Text>{product.carName}</Text>
                    </TouchableOpacity>
                ))}
        
            </View>
    );
}
}
export default Wishlist;