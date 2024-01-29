import { View,Text,TextInput,Pressable} from 'react-native';
// import React, { Component } from 'react';
import React, {Component,PureComponent} from 'react';
import Mainpage from './Mainpage';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            user: null,
            error: false
        }
    }
    render(){
        const {navigation} = this.props;
        
        const handleLoginSubmit = async () => {
            try {
                const response = await fetch(`http://192.168.102.7:8000/loginUser?username=${this.state.username}&password=${this.state.password}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                    },
                }
                
                );
                const json = await response.json();
                console.log(json)
                
                if (json.userID) {
                    this.setState({ user: json, error: false }); // Clear the error state
                  //  this.props.navigation.navigate('MainPage', { user: json.userID });
                  this.props.navigation.navigate('MainPage', {user:json});
                    console.log("id agai");
                    console.log("heyhey"+ json);
                    
                    //console.log("hehe"+ json.userID);
                } else {
                    this.setState({error:true});
                    console.log("id nai ai");
                }
                

            } catch (error) {
                console.error(error);
                this.setState({error:true})
            }
        }

        return(
            <View>
            <Text>Sign in Here:</Text>
            <View>
            <TextInput 
                placeholder="Enter username"
                value={this.state.username}
                onChangeText={(text) => this.setState({username : text})}
            />
              <TextInput 
                placeholder="Enter Password"
                value={this.state.password}
                onChangeText={(text) => this.setState({password : text})}
            />
             <Pressable title='logInSubmit' onPress={() => handleLoginSubmit()}> <Text>Log in</Text></Pressable>
             {this.state.error ? (
  <View>
    <Text>Username or password incorrect!</Text>
  </View>
) : (
  this.state.user && this.state.user.userId ? (
    navigation.navigate('MainPage', { userID: this.state.user.userId })
  ) : (
    <View>
      <Text>Sign in</Text>
    </View>
  )
)}</View>
            </View>

        );
    }
}

export default Login;