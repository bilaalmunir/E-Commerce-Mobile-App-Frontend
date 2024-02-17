import React, { Component } from 'react';
import { View, Text, TextInput, Pressable,Image, StyleSheet, Button, Alert } from 'react-native';

import { userSignup } from '../api/postApi';
import * as ImagePicker from 'expo-image-picker';
import { RFPercentage } from 'react-native-responsive-fontsize';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            loading: false,
            res: false,
            selectedImage:null,
        };
    }
    getPermissionAsync = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access media library was denied');
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
      handleSubmit = async () => {
        this.setState({
            loading: true,
        });
    
        let profilePictureBase64 = null;
        if (this.state.selectedImage) {
            let response = await fetch(this.state.selectedImage);
            let profilePictureBlob = await response.blob();
            profilePictureBase64 = await this.blobToBase64(profilePictureBlob);
        }
        if(this.state.username !== "" || this.state.firstname !== "" ||this.state.username !== "" ||this.state.lastname !== "" ||this.state.email !== "" ||this.state.password !== "" ){
            const response = await userSignup(
                this.state.username,
                this.state.firstname,
                this.state.lastname,
                this.state.email,
                this.state.password,
                profilePictureBase64
            );
        
            if (response) {
                this.setState({
                    loading: false,
                    res: true,
                });
                console.log("Sign up response:", response);
            }
        }else{
            Alert.alert("Please fill in all fields.");
        }
            
        
        
    };

    blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    };
    render() {
        return (
            <><View style={styles.container}>
                <Text style={styles.title}>To Register, Enter Details:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Firstname"
                    value={this.state.firstname}
                    onChangeText={(text) => this.setState({ firstname: text })} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter LastName"
                    value={this.state.lastname}
                    onChangeText={(text) => this.setState({ lastname: text })} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    secureTextEntry={true} />

                    <View style={styles.picCon}>
                    <Pressable onPress={this.openImagePicker}>
                    <Text style={styles.picker}>Profile Picture</Text>
                </Pressable>
                {this.state.selectedImage && (
                        <Image source={{ uri: this.state.selectedImage }} style={{ width: 50, height: 50, marginLeft:5, borderRadius:4,marginBottom:10 }} />
                    )}
                </View>


                <Pressable style={
                ({ pressed }) => [
                            styles.button,
                            { backgroundColor: pressed ? 'gray' : 'white' }
                        ]} onPress={this.handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                {this.state.res ? (
                    this.props.navigation.replace('Login', { uName: this.state.username })
                ) : this.state.loading ? (
                    <Text style={styles.loadingText}>Please wait...</Text>
                ) : null}
                <Pressable onPress={() => this.props.navigation.replace('Login')}>
                    <Text style={styles.switchPage}>Go to Login?</Text>
                </Pressable>
                
            </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'wite'
    },
    picCon:{
        flexDirection:'row',
        justifyContent:'center'    },
    title: {
        fontSize: RFPercentage(3),
        fontWeight: 'bold',
        marginBottom: RFPercentage(2),
    },
    input: {
        height: RFPercentage(5),
        width:RFPercentage(35),
        borderColor: '#36454F',
        color:'#36454F',
        borderWidth: RFPercentage(0.1),
        borderRadius: RFPercentage(1),
        marginBottom: RFPercentage(1),
        paddingLeft: RFPercentage(2),
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        width:'30%'
    },
    buttonText: {
        color: 'black',
        fontSize: RFPercentage(2),
        fontWeight: 'bold',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontStyle: 'italic',
    },
    switchPage: {
        marginTop:RFPercentage(2),
        color: 'black',
        opacity: 0.8,
        textDecorationLine:'underline'
    },
    picker: {
        backgroundColor: 'white',
        color:'black',
        padding: RFPercentage(1.4),
        alignItems:'flex-end',
        borderRadius: 5,
        width:RFPercentage(14),
        marginBottom:RFPercentage(1)
        
    }
});

export default Signup;
