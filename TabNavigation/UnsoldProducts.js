import { Component } from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { getUnsoldProducts } from "../api/getApi";
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
            <View>
            {this.state.cars && this.state.cars.length > 0 ? (
                    <ScrollView>
                        {this.state.cars.map((car) => (
                            <TouchableOpacity key={car.ID} onPress={() => this.showDetails(car)}>
                            
                                <View style={styles.carBox}>
                                    <Text style={styles.carName}>Car Name: {car.carName}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : (
                    <Text>No cars available</Text>
                )}
          </View>
        );
    }
}
export default UnsoldProducts;

const styles = StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: "black",
    },
    container: {
      flex: 1,
      paddingTop: 20,
      padding: 20,
      backgroundColor: "white",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    username: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "left",
      paddingTop: 20,
    },
    logOut: {
      fontSize: 18,
      fontWeight: "bold",
      color: "blue", // or any color you prefer
      textAlign: "right",
    },
    carBox: {
      borderWidth: 1,
      borderColor: "gray",
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      marginTop: 20,
    },
    carName: {
      fontSize: 16,
    },
    tabBar: {
      backgroundColor: "lightgrey", // Example background color
      height: 50, // Example height
      justifyContent: "center",
      alignItems: "center",
    },
  });
  