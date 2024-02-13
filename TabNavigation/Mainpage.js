import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { getProducts } from '../api/getApi';

class Mainpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
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

    

    getP = async () => {
        try {
            const json = await getProducts();
            console.log("products:" + json.length);
            if (json) {
                this.setState({ cars: json, isFetching: false });
                //console.log("if :" + this.state.cars);
            } else {
                console.log("data nai aya");
                this.setState({ isFetching: false });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ isFetching: false });
        }
    }

    showDetails = (detail) => {
      const { route } = this.props;
        const { user } = route.params ;
      
        if (detail.id) {
            console.log("car id" + detail.id);
            this.props.navigation.navigate('Cardetails', { detail: detail, user: user });
        } else {
          console.log("detail id nai ai")
            this.setState({ error: true });
        }
    };

    render() {
        const { navigation } = this.props;
        const { route } = this.props;
        const { user } = route.params ;
        console.log("user:" + user.userID);
        //console.log("products data in state:"+ this.state.cars)
        return (
          <SafeAreaView style={styles.safeAreaContainer}>
              <ScrollView style={styles.container}>
                  <View style={styles.header}>
                      <Text style={styles.username}> {user.username}</Text>
                      
                  </View>
                  {this.state.cars && this.state.cars.length > 0 ? (
                      <View>
                          {this.state.cars.map((car) => (
                              <TouchableOpacity key={car.ID} onPress={() => this.showDetails(car)}>
                              
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
          </SafeAreaView>
      );

    }
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'black',
},
    container: {
        flex: 1,
        paddingTop:45,
        padding:20,
        backgroundColor: 'white',
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
    logOut: {
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
