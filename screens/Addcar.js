import { useRoute } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity,StyleSheet, Alert} from 'react-native';
import { addProduct } from "../api/postApi";


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
        const { navigation, route } = this.props;
        const { User } = route.params;
        if (!this.state.carName || !this.state.model || !this.state.color) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
          }
        try {
            const json = await addProduct(this.state.carName, this.state.model, this.state.color, User.userID);
    
            if (json.carName) {
                this.setState({ car: json, error: false, carName: '', model: '', color: '' });
                await navigation.navigate('MainPage', { user: User });
                console.log("car: " + json.carName);
            } else {
                this.setState({ error: true });
                console.log("car nai ai");
            }
        } catch (error) {
            console.error('Error adding car:', error);
            // Handle the error as needed
            this.setState({ error: true });
        }
    };

    render() {
        const { navigation } = this.props;
        const { route } = this.props;
        const { User } = route.params;
        console.log("add user:" + User.userID);
        const UID = User.userID
        
        return (
            <View style={carFormStyles.container}>
            <Text style={carFormStyles.heading}>Add Car</Text>
    
            <TextInput
              style={carFormStyles.input}
              placeholder="Car Name"
              value={this.state.carName}
              onChangeText={(text) => this.setState({ carName: text })}
            />
            <TextInput
              style={carFormStyles.input}
              placeholder="Model"
              value={this.state.model}
              onChangeText={(text) => this.setState({ model: text })}
            />
            <TextInput
              style={carFormStyles.input}
              placeholder="Color"
              value={this.state.color}
              onChangeText={(text) => this.setState({ color: text })}
            />
    
            <TouchableOpacity style={carFormStyles.addButton} onPress={this.upload}>
              <Text style={carFormStyles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>
        );
    }
}
const carFormStyles = StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 15,
      paddingLeft: 10,
    },
    addButton: {
      backgroundColor: '#3498db',
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default Addcar;
