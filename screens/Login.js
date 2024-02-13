import { View,Text,TextInput,Pressable,StyleSheet,} from 'react-native';
// import React, { Component } from 'react';
import React, {Component,PureComponent} from 'react';
import Mainpage from '../TabNavigation/Mainpage';
import { userLogin } from '../api/postApi';
import Constants from 'expo-constants';


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
            console.log("heyhey"+ json);
          this.props.navigation.replace('Tabs', {user:json});
            
            
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
            <View style={styles.upper}></View>
            <Text style={styles.heading}>Sign In</Text>
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
                <View style={styles.buttonContainer}> 
                <Pressable style={
                ({ pressed }) => [
                            styles.button,
                            { backgroundColor: pressed ? 'gray' : 'white' }
                        ]} onPress={() => this.handleLoginSubmit()}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </Pressable></View>
                
            </View>
            {this.state.error && <Text style={styles.errorText}>Incorrect login or password</Text>}
            <Pressable onPress={()=> this.props.navigation.replace('Signup') }>
                    <Text style={styles.switchPage}>do not have an account?</Text>
                </Pressable>
        </View>
        


        );
    }
}
// const windowWidth = Dimensions.get('window').width;
// const upperWidth = windowWidth * 0.3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor:'#1f8f9f'
    },
    // upper: {
    //     position: 'absolute',
    //     top: 0,
    //     alignItems:'center',
    //     backgroundColor: 'black',
    //     height: Constants.statusBarHeight, // Adjust the height as needed
    //     width: upperWidth,
    // },
    buttonContainer: {
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center'
    },
    heading: {
        fontSize:28,
        fontWeight: 'bold',
        marginBottom: 25,
        color:'white'
    },
    subheading: {
        fontSize: 16,
        marginBottom: 20,
        color:'peru'
    },
    inputContainer: {
        width: '90%',
    },
    input: {
        height: 40,
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
        width:100
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    switchPage: {
        marginTop:10,
        color: 'white',
        opacity: 0.5,
        textDecorationLine:'underline'
    }
});

export default Login;