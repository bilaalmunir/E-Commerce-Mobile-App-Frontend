//import { View,Text,TextInput,Pressable,StyleSheet,Dimensions,upperWidth, useWindowDimensions, StatusBar} from 'react-native';
// import React, { Component } from 'react';
//import React, {Component,PureComponent} from 'react';
import Mainpage from '../TabNavigation/Mainpage';
import { userLogin } from '../api/postApi';
//import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { AntDesign,FontAwesome } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Dimensions, StatusBar, Keyboard, Animated, Image } from 'react-native';
import Constants from 'expo-constants';
//import { SafeAreaView } from 'react-native-safe-area-context';
//import { RFPercentage } from 'react-native-responsive-fontsize';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      user: null,
      error: false,
      blurOpacity: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    Animated.timing(this.state.blurOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  _keyboardDidHide = () => {
    Animated.timing(this.state.blurOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  handleLoginSubmit = async () => {
    const { username, password } = this.state;
    const json = await userLogin(username, password);
    if (json.userID) {
      this.setState({ user: json, error: false });
      this.props.navigation.replace('Tabs', { user: json });
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    const { blurOpacity, error } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <Animated.View style={[styles.blur, { opacity: blurOpacity }]} />
        <View style={styles.upperPortion}>
        <Image
        source={require('../Images/icons8-car.gif')} 
        style={styles.gif}
      />
          <Text style={styles.heading}>Sign In.</Text>
        </View>
        <View style={styles.lowerPortion}>
          <View style={styles.inputContainer}>
          <FontAwesome name="user-o" size={RFPercentage(2.5)} color="blue" />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
            />
            <AntDesign name="lock" size={RFPercentage(2.5)} color="red" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? 'gray' : 'white' }
              ]}
              onPress={() => this.handleLoginSubmit()}
            >
               <AntDesign name="login" size={28} color="blue" />
            </Pressable>
          </View>
          {error && <Text style={styles.errorText}>Incorrect login or password</Text>}
          <Pressable onPress={() => this.props.navigation.replace('Signup')}>
            <Text style={styles.switchPage}>Do not have an account?</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //flexDirection: 'column',
        //padding: 20,
        height: Dimensions.get('window').height,
        //backgroundColor:'#1B212B'
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 1)',
      },
    upperPortion: {
        flex: 0.5,
           height: Constants.statusBarHeight,
        width: Dimensions.get('window').width,
       // backgroundColor: '#D0D0D0',
        borderBottomLeftRadius:RFPercentage(5),
        borderBottomRightRadius:RFPercentage(5),
        //borderRadius:RFPercentage(10),
        //borderColor:'black'
        
    },
    lowerPortion: {
        flex: 0.5,
//backgroundColor: '#1B212B',
        alignItems:'center',
        justifyContent:'flex-end',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
       
        
    },
    
    heading: {
        fontSize:RFPercentage(15),
        fontWeight: 'bold',
        paddingTop: RFPercentage(12),
        //marginBottom: 25,
        //color:'#1B212B'
    },
    subheading: {
        fontSize: 16,
        marginBottom: 20,
        color:'peru'
    },
    inputContainer: {

        width: '70%',
        //backgroundColor:'black',
        alignContent:'center',
        justifyContent:'center',
        //alignItems:'center'
        //marginBottom:'0%'
        //paddingBottom:'2%'
    },
    input: {
        height: RFPercentage(6),
        //backgroundColor:'#80839C',
        borderColor: 'white',
        color:'white',
        borderWidth: RFPercentage(0.1),
        borderRadius: RFPercentage(2),
        marginBottom: "2%",
        paddingLeft: RFPercentage(2),
    },
    buttonContainer: {
        width:RFPercentage(50),
        // height:RFPercentage(20),
        //backgroundColor:'black',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        //marginTop:0
       // backgroundColor:'black'
    },
    button: {
        //backgroundColor: '#80839C',(pressable mein color hai)
        //color:'blue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor:'white',
        width:'28%',
        marginBottom:'40%'

    },
    buttonText: {
        color: '#1B212E',
        //backgroundColor:'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: '2%',
    },
    switchPage: {
        marginBottom:RFPercentage(2),
        color: 'white',
        textDecorationLine:'underline'
    }
});

export default Login;