import { Component } from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { getSoldProducts } from "../api/getApi";
import { FlashList } from "@shopify/flash-list";
import { styles } from "../screens/styles";
class SoldProducts extends Component {
    constructor(props){
        super(props);
        this.state={
            cars : [],
            isFetching : false
        }
    }
    componentDidMount(){
        this.soldProducts()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.cars !== prevState.cars && !this.state.isFetching) {
         // console.log("if chal rha hai?");
          this.setState({ isFetching: true }, () => {
            setTimeout(() => {
            //  console.log("fetching true");
              this.setState({ isFetching: false });
              this.soldProducts();
            }, 1000);
          });
        }
      }
      soldProducts = async () => {
        try {
            const response = await getSoldProducts();
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
export default SoldProducts;

// const styles = StyleSheet.create({
//     safeAreaContainer: {
//       flex: 1,
//       backgroundColor: "black",
//     },
//     container: {
//       flex: 1,
//       paddingTop: 20,
//       padding: 20,
//       backgroundColor: "white",
//     },
//     header: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: 10,
//     },
//     username: {
//       fontSize: 18,
//       fontWeight: "bold",
//       textAlign: "left",
//       paddingTop: 20,
//     },
//     logOut: {
//       fontSize: 18,
//       fontWeight: "bold",
//       color: "blue", // or any color you prefer
//       textAlign: "right",
//     },
//     carBox: {
//       borderWidth: 1,
//       borderColor: "gray",
//       padding: 10,
//       borderRadius: 10,
//       marginBottom: 10,
//       marginTop: 20,
//     },
//     carName: {
//       fontSize: 16,
//     },
//     tabBar: {
//       backgroundColor: "lightgrey", // Example background color
//       height: 50, // Example height
//       justifyContent: "center",
//       alignItems: "center",
//     },
//   });
  