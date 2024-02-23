import { useRoute } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, Image, Button,TextInput, TouchableOpacity, Alert} from 'react-native';
import { addProduct } from "../api/postApi";
import * as ImagePicker from 'expo-image-picker';
import { styles } from "../screens/styles";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Picker } from '@react-native-picker/picker';
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
            selectedOption:''
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

   // console.log(result);

    if (!result.canceled) {
      this.setState({ selectedImage: result.assets[0].uri });
    }
    };

    render() {
        const { navigation } = this.props;
        const { route } = this.props;
        const { user } = route.params ;
        //console.log("user:" + user.userID);
       // console.log("add page mein user ka data:" + user.userID);
        const UID = user.userID
        
        return (
            <>
            <View style={styles.AddCarContainer}>
            <View  style={styles.AddFormUpperPortion} >
            <Text style={styles.AddCarTitle}>Add Car</Text>
            </View>
            <View style={styles.AddFormLowerPortion} >
            <Text style={{marginBottom:'15%',marginTop:'4%' , fontWeight:'bold'}}>To publish your product , Fill the given input fields!</Text>
            <TextInput
              style={styles.input}
              placeholder="Car Name"
              value={this.state.carName}
              onChangeText={(text) => this.setState({ carName: text })} />
            <TextInput
              style={styles.input}
              placeholder="Model"
              value={this.state.model}
              onChangeText={(text) => this.setState({ model: text })} />
            <TextInput
              style={styles.input}
              placeholder="Color"
              value={this.state.color}
              onChangeText={(text) => this.setState({ color: text })} />
              <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="number-pad"
              keyboardAppearance="default"
             // keyboardAppearance="light"
              
              value={this.state.price}
              onChangeText={(text) => this.setState({ price: text })} />
              
              <Picker
          selectedValue={this.state.selectedOption}
          onValueChange={(itemValue) =>
            this.setState({ selectedOption: itemValue })
          }
          style={styles.picker}
        >
          <Picker.Item label="Select an option" value="" />
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
          <Picker.Item label="Option 3" value="option4" />
          {/* Add more options as needed */}
        </Picker>
        <Text style={styles.selectedOptionText}>
          Selected option: {this.state.selectedOption}
        </Text>

            <TouchableOpacity  onPress={this.upload} style={styles.AddCarButton}>
              <Text style={{color:'white', fontWeight:'bold' , fontSize:RFPercentage(1.5)}}>POST</Text>
            </TouchableOpacity>
          </View>
          <View>
          
        <Button title="Open Image Picker" onPress={this.openImagePicker} />
        
        {this.state.selectedImage && (
          <Image source={{ uri: this.state.selectedImage }} style={{ width: 200, height: 200 }} />
        )}
            </View>
            </View>
            </>
        );
    }
}
// const carFormStyles = StyleSheet.create({
//     container: {
//       padding: 16,
//       borderRadius: 8,
//       borderWidth: 1,
//       borderColor: '#ccc',
//       marginBottom: 16,
//     },
//     input: {
//       height: 40,
//       borderColor: 'gray',
//       borderWidth: 1,
//       marginBottom: 15,
//       paddingLeft: 10,
//     },
//     addButton: {
//       backgroundColor: '#3498db',
//       padding: 10,
//       alignItems: 'center',
//       borderRadius: 5,
//       marginTop: 10,
//     },
//     addButtonText: {
//       color: 'white',
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//   });
export default Addcar;
