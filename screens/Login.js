import { View,Text,TextInput,Pressable} from 'react-native';
// import React, { Component } from 'react';
import React, {Component,PureComponent} from 'react';
import Mainpage from './Mainpage';
import { userLogin } from '../api/putApi';


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
           
                const json = await userLogin(this.state.username,this.state.password);
                console.log(json)
                if (json.userID) {
                    this.setState({ user: json, error: false }); 
                  this.props.navigation.navigate('MainPage', {user:json});
                    console.log("id agai");
                    console.log("heyhey"+ json);
                    
                    //console.log("hehe"+ json.userID);
                } else {
                    this.setState({error:true});
                    console.log("id nai ai");
                }        
        }

        return(
            <View>
             {/* <Text>Sign in Here:</Text>  */}
             <Text>Enter Credentials:</Text>
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
             <Pressable  onPress={() => handleLoginSubmit()}> 
             <Text>Enter</Text> 
             </Pressable>
                  {this.state.error ? (

       <Text>Entered login or password is incorrect</Text>
   
  ) : (
   this.state.user && this.state.user.userId ? (
      this.props.navigation.navigate('MainPage', { userID: this.state.user.userId })
    ) : (
        null
    )
  )}
             </View>
            </View>

        );
    }
}

export default Login;