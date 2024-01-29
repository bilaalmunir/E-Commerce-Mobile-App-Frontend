import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Mainpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: null,
            isFetching: false,
        };
        this.prevState = { cars: null };
    }

    componentDidMount() {
        this.getCars();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.cars !== prevState.cars && !this.state.isFetching) {
            this.setState({ isFetching: true }, () => {
                setTimeout(() => {
                    if (this.state.isFetching) {
                        this.getCars();
                    }
                }, 5000);
            });
        }
    }

    getCars = async () => {
        try {
            const res = await fetch(`http://localhost:8000/getAllCars`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                },
            });
            const json = await res.json();
            console.log(json);
            if (json) {
                this.setState({ cars: json, isFetching: false });
               // console.log("if :" + this.state.cars);
            } else {
                console.log("data nai aya");
            }
        } catch {
            console.log("hehehehuhuhuhuhahahahhaha catch");
        }
    };

    render() {
        const { navigation } = this.props;
        const { route } = this.props;
        const { user } = route.params;
        console.log("user:" + user.userID);

        const carPage = () => {
            if (true) {
                this.props.navigation.navigate('Addcar', { user: user });
            } else {
                this.state({ error: true });
            }
        };

        const showDetails = (detail) => {
            if (true) {
                console.log("car id" + detail.ID);
                this.props.navigation.navigate('Cardetails', { detail: detail, user: user });
            } else {
                this.state({ error: true });
            }
        };

        return (
            <View>
              <Text>User name: {user.username} </Text>
              <TouchableOpacity title="addCar" onPress={() => carPage()}>
                <Text>Add Car</Text>
              </TouchableOpacity>
          
              {this.state.cars ? (
                <View>
                  {this.state.cars.map((car) => (
                    <TouchableOpacity key={car.ID} onPress={() => showDetails(car)}>
                      <Text>Car Name: {car.carName}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text>No cars available</Text>
              )}
            </View>
          );
          
    }
}

export default Mainpage;
