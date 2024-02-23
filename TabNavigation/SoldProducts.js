import { Component } from "react";
import { View,Text, TouchableOpacity, Image,TextInput} from "react-native";
import { getSoldProducts } from "../api/getApi";
import { FlashList } from "@shopify/flash-list";
import { styles } from "../screens/styles";
import { RFPercentage } from "react-native-responsive-fontsize";

class SoldProducts extends Component {
    constructor(props){
        super(props);
        this.state={
            cars : [],
            isFetching : false,
            search:'',
            categories:[{id: 1 , item:'A class'},
            {id: 2 , item:'B class'},
            {id: 3 , item:'C class'},
            {id: 4 , item:'D class'},
          ]
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
export default SoldProducts;
