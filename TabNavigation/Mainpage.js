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
import AllProducts from "./AllProducts";
import UnsoldProducts from "./UnsoldProducts";
import SoldProducts from "./SoldProducts";

class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      cars: [],
      isFetching: false,
      refreshing: false,
      index: 0,
      routes: [
        { key: "all", title: "All Products" },
        { key: "unsold", title: "Unsold Products" },
        { key: "sold", title: "Sold Products" },
      ],
    };
    this.prevState = { cars: [] };
  }

  // componentDidMount() {
  //   this.getP();
  // }
  


  renderAllProducts = () => {
    const { navigation } = this.props;
    const { route } = this.props;
    const { user } = route.params;

    return (

      <AllProducts user={user} navigate={this.props.navigation} />
    );
  };
  
  

  renderUnsoldProducts = () => {
    const { navigation } = this.props;
    const { route } = this.props;
    const { user } = route.params;
    return (
      <UnsoldProducts user={user} navigate={this.props.navigation} />
    );
  };

  renderSoldProducts = () => {
    const { navigation } = this.props;
    const { route } = this.props;
    const { user } = route.params;
    return(
      <SoldProducts user={user} navigate={this.props.navigation}/>);
  };

  renderScene = SceneMap({
    all: this.renderAllProducts,
    unsold: this.renderUnsoldProducts,
    sold: this.renderSoldProducts,
  });
  renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "blue" }}
      style={{ backgroundColor: "white" }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: focused ? "blue" : "black" }}>{route.title}</Text>
      )}
    />
  );
  render() {
    const { navigation } = this.props;
    const { route } = this.props;
    const { user } = route.params;
    console.log("user:" + user.userID);
    //console.log("products data in state:"+ this.state.cars)
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.username}> {user.username}</Text>
          </View>
          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            onIndexChange={(index) => this.setState({ index })}
            initialLayout={{ width: Dimensions.get("window").width }}
            renderTabBar={this.renderTabBar}
            tabBarStyle={styles.tabBar}
          />
          
        </View>
      </SafeAreaView>
    );
  }
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

export default Mainpage;
