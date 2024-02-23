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
  Image
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { getProducts } from "../api/getApi";
import { FlashList } from "@shopify/flash-list";
import { RFPercentage } from "react-native-responsive-fontsize";
import { styles } from "../screens/styles";
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
                    
                     <View style={{flex:0.75 , justifyContent: 'center',   }} >
                     <Image
              source={require('../Images/profile.jpg')}
              style={{width:'100%', height:'100%' , resizeMode:'cover', borderRadius:10}}/>
                     </View>
                     <View style={{backgroundColor:'white',flex:0.35,  }}>
                      <Text>{item.carName}</Text>
                     </View>
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


export default AllProducts;
