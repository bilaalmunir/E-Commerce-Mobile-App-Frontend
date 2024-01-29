import { View,Text,Button, TextInput, Pressable, useState} from 'react-native';
// import React, { Component } from 'react';
import React, {Component,PureComponent} from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        }
    }
    render(){
        const {navigation} = this.props;
            
            // const [state, setState] = useState({
            //     bilal: 0
            // })
            // setState({
            //     ...state,
            //     bilal:
            // })
         
        const handleSubmit = async () => {
            try {
                console.log("handling sign up now")
            const response = await fetch(`http://localhost:8000/registerUser?username=${this.state.username}&firstname=${this.state.firstname}&lastname=${this.state.lastname}&email=${this.state.email}&password=${this.state.password}`,{
                method:'POST',
                headers: {
                    'Content-Type' : 'Application/json',
                },
                
            })
            console.log("this is sign up response:",response)
        }catch (error) {
                console.error(error);
            }


        }
        return(

            <View>
            <Text>Sign Up</Text>
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
            <Pressable title='Submit' onPress={() => handleSubmit()}> <Text>Signup</Text></Pressable>
            </View>

        );
    }
}

export default Signup;