import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions, 
  Image,
  RefreshControl
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { getProducts } from "../api/getApi";
import AllProducts from "./AllProducts";
import UnsoldProducts from "./UnsoldProducts";
import SoldProducts from "./SoldProducts";
import { RFPercentage } from "react-native-responsive-fontsize";

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
        { key: "all", title: "All"  },
        { key: "unsold", title: "Unsold" },
        { key: "sold", title: "Sold" },
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
      indicatorStyle={{ backgroundColor: "khaki", width:RFPercentage(14),borderRadius:RFPercentage(5), height:RFPercentage(5.6),  }}
      style={{ marginTop: RFPercentage(1),
        marginLeft:RFPercentage(2.5),
        backgroundColor: "white", 
        width:RFPercentage(41),
    borderRadius: RFPercentage(4),

    }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: focused ? "Black" : "#004242" , fontWeight: "bold" }}>{route.title}</Text>
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
          <Image
        source={require('../Images/profile.jpg')} 
        style={styles.profile}
      />
            <Text style={styles.username}>Welcome back {user.username}!</Text>
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
    backgroundColor: "#020403",
  },
  profile:{
    width:RFPercentage(6),
    height:RFPercentage(6),
    borderRadius:RFPercentage(6),
    borderWidth:RFPercentage(0.5),
    borderColor:'khaki'
  },
  container: {
    flex: 1,
    paddingTop: 20,
    padding: 20,
    backgroundColor: "#020403",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    textAlign: "left",
    color:"khaki"
    //paddingTop: RFPercentage(1),
  },
  tabBar: {
    //backgroundColor: "yellow",
    //borderRadius: RFPercentage(30), // Example background color
    //height: 50, // Example height
    flex:1,
    justifyContent: "center",
    alignItems: "center",
   // alignContent:'center'
   //paddingLeft:RFPercentage(2)
  },
});

export default Mainpage;
