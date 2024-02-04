import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Addcar from '../screens/Addcar';
//import getProducts from '../api/getApi';
import { getProducts } from '../api/getApi';

class Mainpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error:false,
            cars: null,
            isFetching: false,
        };
        this.prevState = { cars: null };
    }

    componentDidMount() {
        this.getP();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.cars !== prevState.cars && !this.state.isFetching) {
            console.log("if chal rha hai?")
            this.setState({ isFetching: true }, () => {
                setTimeout(() => {
                    if (this.state.isFetching) {
                        console.log("fetching true")
                        this.setState({ isFetching: false });
                        this.getP()
                    }
                }, 5000);
            });
        }
    }
    carPage = () => {
        const { navigation } = this.props;
        const { route } = this.props;
        const { user } = route.params;
        //console.log("add page mein jatay huvay user ka data"+user.userID)
        !this.state.error? navigation.navigate('Addcar', { User: user }) : null
    };
    getP = async () => {
        try{
            const json = await getProducts()
            console.log("products:"+json.length);
            if (json) {
                this.setState({ cars: json, isFetching: false });
                //console.log("if :" + this.state.cars);
            } else {
                console.log("data nai aya");
                this.setState({ isFetching: false });
            }
        }catch(error){
            console.error("Error fetching data:", error);
        this.setState({ isFetching: false });
        }
            
        
    }

    render() {
        const { navigation } = this.props;
        const { route } = this.props;
        const { user } = route.params;
        console.log("user:" + user.userID);
        //console.log("products data in state:"+ this.state.cars)
        

        const showDetails = (detail) => {
            if (true) {
                console.log("car id" + detail.ID);
                this.props.navigation.navigate('Cardetails', { detail: detail, user: user });
            } else {
                this.state({ error: true });
            }
        };

        return (
            <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.username}>User name: {user.username}</Text>
          <TouchableOpacity onPress={() => this.carPage()}>
            <Text style={styles.addCarButton}>Add Car</Text>
          </TouchableOpacity>
        </View>

        {this.state.cars && this.state.cars.length > 0 ? (
          <View>
            {this.state.cars.map((car) => (
              <TouchableOpacity key={car.ID} onPress={() => showDetails(car)}>
                <View style={styles.carBox}>
                  <Text style={styles.carName}>Car Name: {car.carName}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text>No cars available</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  addCarButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue', // or any color you prefer
    textAlign: 'right',
  },
  carBox: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  carName: {
    fontSize: 16,
  },
});
export default Mainpage;
