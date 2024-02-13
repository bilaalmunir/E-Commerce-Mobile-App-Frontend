import { useRoute } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, Image, Button,TextInput, TouchableOpacity,StyleSheet, Alert} from 'react-native';
import { addProduct } from "../api/postApi";
import * as ImagePicker from 'expo-image-picker';

class Addcar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carName: "",
            model: "",
            color: "",
            price:"",
            car: null,
            error: false,
            selectedImage: null ,
        };
        
    }
    componentDidMount() {
      this.getPermissionAsync();
    }
    getPermissionAsync = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access media library was denied');
      }
    };

    upload = async () => {
        const { navigation, route } = this.props;
        const { user } = route.params;
        if (!this.state.carName || !this.state.model || !this.state.color || !this.state.price) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
          }
        try {
            const json = await addProduct(this.state.carName, this.state.model, this.state.color,this.state.price, user.userID);
    
            if (json.carName) {
                this.setState({ car: json, error: false, carName: '', model: '', color: '' ,price:''});
                await navigation.goBack();
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
    openImagePicker = async() => {
      // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      this.setState({ selectedImage: result.assets[0].uri });
    }
    };

    render() {
        const { navigation } = this.props;
        const { route } = this.props;
        const { user } = route.params ;
        console.log("user:" + user.userID);
        console.log("add page mein user ka data:" + user.userID);
        const UID = user.userID
        
        return (
            <><View style={carFormStyles.container}>
            <Text style={carFormStyles.heading}>Add Car</Text>

            <TextInput
              style={carFormStyles.input}
              placeholder="Car Name"
              value={this.state.carName}
              onChangeText={(text) => this.setState({ carName: text })} />
            <TextInput
              style={carFormStyles.input}
              placeholder="Model"
              value={this.state.model}
              onChangeText={(text) => this.setState({ model: text })} />
            <TextInput
              style={carFormStyles.input}
              placeholder="Color"
              value={this.state.color}
              onChangeText={(text) => this.setState({ color: text })} />
              <TextInput
              style={carFormStyles.input}
              placeholder="Price"
              value={this.state.price}
              onChangeText={(text) => this.setState({ price: text })} />
              

            <TouchableOpacity style={carFormStyles.addButton} onPress={this.upload}>
              <Text style={carFormStyles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>
          <View>
          
        <Button title="Open Image Picker" onPress={this.openImagePicker} />
        {console.log(this.state.selectedImage)}
        {this.state.selectedImage && (
          <Image source={{ uri: this.state.selectedImage }} style={{ width: 200, height: 200 }} />
        )}
            </View>
            </>
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
