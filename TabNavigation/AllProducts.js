import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions, 
  RefreshControl
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { getProducts } from "../api/getApi";

class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: false,
          cars: [],
          isFetching: false,
          refreshing: false,
          index: 0,
        };
        this.prevState = { cars: [] };
      }
    
      componentDidMount() {
        this.getP();
      }
      componentDidUpdate(prevProps, prevState) {
        if (this.state.cars !== prevState.cars && !this.state.isFetching) {
          //console.log("if chal rha hai?");
          this.setState({ isFetching: true }, () => {
            setTimeout(() => {
           //   console.log("fetching true");
              this.setState({ isFetching: false });
              this.getP();
            }, 1000);
          });
        }
      }
      handleRefresh = () => {
        this.setState({ refreshing: true }, () => {
            this.getP(); 
        });
    }
    getP = async () => {
      try {
          const json = await getProducts();
         // console.log("products:", JSON.stringify(json));
          if (json) {
              this.setState({ cars: json, isFetching: false, refreshing: false });
          } else {
              console.log("data nai aya");
              this.setState({ isFetching: false, refreshing: false });
          }
      } catch (error) {
          console.error("Error fetching data:", error);
          this.setState({ isFetching: false, refreshing: false });
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
};
render (){
  return (
      <View>
          {this.state.cars && this.state.cars.length > 0 ? (
              <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                  {this.state.cars.map((car, index) => (
                      <TouchableOpacity key={car.ID} onPress={() => this.showDetails(car)}>
                          <View style={[styles.carBox, index % 2 !== 0 && styles.rightMargin]}>
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
};

   

  
}
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
  // carBox: {
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   padding: 10,
  //   borderRadius: 10,
  //   marginBottom: 10,
  //   marginTop: 20,
  // },
  // carName: {
  //   fontSize: 16,
  // },
  tabBar: {
    backgroundColor: "lightgrey", // Example background color
    height: 50, // Example height
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
},
carBox: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    width: "50%", // Each product occupies half of the container's width
},
carName: {
    fontSize: 16,
},
rightMargin: {
    marginRight: 10, // Add right margin to every second product
},
});

export default AllProducts;