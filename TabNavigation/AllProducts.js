import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  RefreshControl,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { getProducts } from "../api/getApi";
import { FlashList } from "@shopify/flash-list";
import { RFPercentage } from "react-native-responsive-fontsize";
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
  };
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
  };
  showDetails = (detail) => {
    const { navigate } = this.props;
    console.log("user", this.props.user);
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

  render() {
    return (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin:RFPercentage(1),
    marginTop:RFPercentage(1.5)
  },
  
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  carBox: {
    borderWidth: 1,
    borderColor: "white",
    padding: RFPercentage(1),
    borderRadius: 10,
    // marginBottom: 10,
    height: RFPercentage(30),
    margin:RFPercentage(0.5),
    flex:1,
    backgroundColor:'black'
  },
});

export default AllProducts;
