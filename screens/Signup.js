import { View,Text,Button, TextInput, Pressable, useState} from 'react-native';
// import React, { Component } from 'react';
import React, {Component,PureComponent} from 'react';
import { userSignup } from '../api/postApi';
import Login from './Login';

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
            res:false,
        }
    }
    render(){
        const {navigation} = this.props;
         
        const handleSubmit = async () => {
            this.setState({
                loading: true
            })
            response = await userSignup(this.state.username,this.state.firstname,this.state.lastname,this.state.email,this.state.password)
            if(response){
                this.setState({
                    loading: false,
                    res:true
                })
                 console.log("this is sign up response in if statement:",response)
            }

        }
        return(

            <View>
            <Text>To Register Enter details!</Text>
            <TextInput 
                placeholder="Enter username"
                value={this.state.username}
                onChangeText={(text) => this.setState({username : text})}
            />
            <TextInput 
                placeholder="Enter Firstname"
                value={this.state.firstname}
                onChangeText={(text) => this.setState({firstname : text})}
            />
             <TextInput 
                placeholder="Enter LastName"
                value={this.state.lastname}
                onChangeText={(text) => this.setState({lastname : text})}
            />
             <TextInput 
                placeholder="Enter Email"
                value={this.state.email}
                onChangeText={(text) => this.setState({email : text})}
            />
             <TextInput 
                placeholder="Enter Password"
                value={this.state.password}
                onChangeText={(text) => this.setState({password : text})}
            />
            <Pressable title='Submit' onPress={() => handleSubmit()}><Text>Submit here</Text></Pressable>
            {this.state.res?(
                this.props.navigation.navigate('Login',{uName : this.state.username})
            ):(this.state.loading?(<Text>please wait...</Text>):(null))}
            </View>

        );
    }
}

export default Signup;