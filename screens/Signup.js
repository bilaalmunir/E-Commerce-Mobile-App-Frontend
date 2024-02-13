import React, { Component } from 'react';
import { View, Text, TextInput, Pressable,Image, StyleSheet, Button } from 'react-native';

import { userSignup } from '../api/postApi';
import * as ImagePicker from 'expo-image-picker';
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
                    <Text style={styles.picker}>choose picture</Text>
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
                    <Text style={styles.switchPage}>do you have an account?</Text>
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
        backgroundColor:'#1f8f9f'
    },
    picCon:{
        flexDirection:'row',
        justifyContent:'center'    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width:'70%',
        borderColor: 'white',
        color:'white',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingLeft: 20,
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        width:'30%'
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontStyle: 'italic',
    },
    switchPage: {
        marginTop:10,
        color: 'white',
        opacity: 0.5,
        textDecorationLine:'underline'
    },
    picker: {
        backgroundColor: 'white',
        padding: 10,
        alignItems:'flex-end',
        borderRadius: 5,
        width:'100%',
        marginBottom:5
        
    }
});

export default Signup;
