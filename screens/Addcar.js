import { useRoute } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';


class Addcar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carName: "",
            model: "",
            color: "",
            car: null,
            error: false,
        };
        
    }


    upload = async () => {
        const { route, navigation } = this.props;
    const { user } = route.params;
        try {
            const carInfo = await fetch(`http://localhost:8000/addCar?carName=${this.state.carName}&model=${this.state.model}&color=${this.state.color}&userId=${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                    },
                }
                );

            const json = await carInfo.json();
            console.log(json);

            if (json.carName) {
                this.setState({ car: json, error: false });
                this.props.navigation.navigate('MainPage', { user: this.props.route.params.user });
                console.log("car: " + json.carName);
            } else {
                this.setState({ error: true });
                console.log("car nai ai");
            }
        } catch (error) {
            console.error(error);
            this.setState({ error: true });
        }
    };

    render() {
        const { navigation } = this.props;
        const { route } = this.props;
        const { User } = route.params;
        console.log("add user:" + User.userID);
        
        return (
            <View>
                <Text>addcar</Text>

                <TextInput
                    placeholder="carName"
                    value={this.state.carName}
                    onChangeText={(text) => this.setState({ carName: text })}
                />
                <TextInput
                    placeholder="model"
                    value={this.state.model}
                    onChangeText={(text) => this.setState({ model: text })}
                />
                <TextInput
                    placeholder="color"
                    value={this.state.color}
                    onChangeText={(text) => this.setState({ color: text })}
                />

                <TouchableOpacity title='upload' onPress={this.upload}>
                    <Text>ADD</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Addcar;
