import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image
  
} from "react-native";
import { TabView, SceneMap, TabBar,  } from "react-native-tab-view";
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
      search:'',
      categories:[{id: 1 , item:'A class'},
      {id: 2 , item:'B class'},
      {id: 3 , item:'C class'},
      {id: 4 , item:'D class'},
    ]
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
  handleCategorySelect = (category) => {
    // Handle category selection
    console.log('Selected category:', category);
    // Navigate or perform any action based on the selected category
  };

  render() {
    return (
      <><View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Search here"
          value={this.state.search}
          onChangeText={(text) => this.setState({ search: text })} />

      </View>
      <View style={{flex:1, }}>
      <View style={{flex:0.1 , justifyContent:'center',
         alignItems:'center',}}> 
      <FlashList 
        data={this.state.categories}
        estimatedItemSize={5}
        horizontal={true}
        renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => this.handleCategorySelect(item)}
              style={{width:'100%'}}
            >
              <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={{color: 'black',fontSize: RFPercentage(2.8),fontWeight: 'bold', backgroundColor:'khaki', borderRadius:RFPercentage(1),margin:RFPercentage(0.08), padding:'2%'}}>{item.item}</Text>
              </View>
            </TouchableOpacity>
          )}
      />
      </View>
      <View style={styles.container}>
          {this.state.cars && this.state.cars.length > 0 ? (
            <>
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

                    <View style={{ flex: 0.75, }}>
                      <Image
                        source={require('../Images/profile.jpg')}
                        style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: RFPercentage(0.2) }} />
                    </View>
                    <View style={{ flex: 0.35, justifyContent: 'flex-start' }}>
                      <Text style={styles.CarName}>{item.carName}</Text>
                      <Text>{item.model}</Text>
                      {item.status ? (<Text style={{ color: 'red', fontWeight: 'bold' }}>SOLD!</Text>) : (<Text style={{ color: 'Black', fontWeight: 'bold' }}>On The Market</Text>)}
                    </View>
                  </TouchableOpacity>
                );
              } } /></>
          ) : (
            <Text>No cars available</Text>
          )}
        </View>
        </View></>
    );
  }
}


export default AllProducts;
