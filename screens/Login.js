import { View,Text,TextInput,Pressable,StyleSheet} from 'react-native';
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
    handleLoginSubmit = async () => {
           
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

    render(){
        const {navigation} = this.props;
         
        return(
            <View style={styles.container}>
            <Text style={styles.heading}>Sign In</Text>
            <Text style={styles.subheading}>Enter Credentials:</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                />
                <Pressable style={styles.button} onPress={() => this.handleLoginSubmit()}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </Pressable>
            </View>
            {this.state.error && <Text style={styles.errorText}>Incorrect login or password</Text>}
        </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheading: {
        fontSize: 16,
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default Login;