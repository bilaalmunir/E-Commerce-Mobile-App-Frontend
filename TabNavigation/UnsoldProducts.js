import { Component } from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { getUnsoldProducts } from "../api/getApi";
import { styles } from "../screens/styles";
import { FlashList } from "@shopify/flash-list";
class UnsoldProducts extends Component {
    constructor(props){
        super(props);
        this.state={
            cars : [],
            isFetching : false
        }
    }
    componentDidMount(){
        this.unsoldProducts()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.cars !== prevState.cars && !this.state.isFetching) {
         // console.log("if chal rha hai?");
          this.setState({ isFetching: true }, () => {
            setTimeout(() => {
            //  console.log("fetching true");
              this.setState({ isFetching: false });
              this.unsoldProducts();
            }, 1000);
          });
        }
      }
      unsoldProducts = async () => {
        try {
            const response = await getUnsoldProducts();
            if (response) {
                this.setState({ cars: response, isFetching: false });
                //console.log("carssssssssss", this.state.cars);
            } else {
                console.log("No data received");
                this.setState({ isFetching: false });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ isFetching: false });
        }
    }
showDetails = (detail) => {
    const{navigate} = this.props;
   console.log("user",this.props.user)
  if (detail.id) {
  console.log("car id" + detail.id);
  navigate.navigate("Cardetails", {
    detail: detail,
    user: this.props.user,
  });
  } else {
  console.log("detail id nai ai");
  this.setState({ error: true });
  }
  }
    render(){
        return(
          <View style={styles.container}>
          {this.state.cars && this.state.cars.length > 0 ? (
            <FlashList
              data={this.state.cars}
              estimatedItemSize={10}
              numColumns={2}
              renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                      key={item.ID}
                      onPress={() => this.showDetails(item)}
                      style={styles.carBox}
                    >
                      
                       <View style={{backgroundColor:'gray',flex:0.75,  }} ></View>
                       <View style={{backgroundColor:'white',flex:0.35,  }}></View>
                    </TouchableOpacity>
                );
              }}
            />
          ) : (
            <Text>No cars available</Text>
          )}
        </View>
        );
    }
}
export default UnsoldProducts;
