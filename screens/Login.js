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
//import piclogin from '../Images/piclogin';
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
        source={require('../Images/piclogin.jpg')} 
        style={styles.heading}
      />
          {/* <Text style={styles.heading}>Sign In.</Text> */}
        </View>
        <View style={styles.lowerPortion}>
          <View style={styles.inputContainer}>
          <View style={{flex:0.3, alignItems:'center'}}>
          <View style={{ borderRadius: RFPercentage(444.2), overflow: 'hidden' , }}>
          <FontAwesome name="user-o" size={RFPercentage(2.5)} backgroundColor='white'  width={RFPercentage(4.2)}  padding={RFPercentage(1)} color="blue"  />
          </View></View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
            />
            <AntDesign name="lock" size={RFPercentage(2.7)} padding={RFPercentage(1)} color="red" paddingLeft={RFPercentage(16.5)} />
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
               <AntDesign name="login" size={RFPercentage(3.2)} color="blue" />
            </Pressable>
            {error && <Text style={styles.errorText}>Incorrect login or password</Text>}
          <Pressable onPress={() => this.props.navigation.replace('Signup')}>
            <Text style={styles.switchPage}>Need to Sign up?</Text>
          </Pressable>
          </View>
          
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
        backgroundColor:'white'
    },
    // blur: {
    //     ...StyleSheet.absoluteFillObject,
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //     borderColor:'white'
    //   },
    upperPortion: {
        flex: 0.6,
           height: Constants.statusBarHeight,
        width: Dimensions.get('window').width,
       // backgroundColor: '#D0D0D0',
        borderBottomLeftRadius:RFPercentage(5),
        borderBottomRightRadius:RFPercentage(5),
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
        //borderRadius:RFPercentage(10),
        //borderColor:'black'
        
    },
    lowerPortion: {
        flex: 0.4,
//backgroundColor: '#1B212B',
        alignItems:'center',
        justifyContent:'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,

       
        
    },
    
    heading: {
        width:RFPercentage(50),
        height:RFPercentage(30),
      
    },
    subheading: {
        fontSize: 16,
        marginBottom: 20,
        color:'peru'
    },
    inputContainer: {
        width: RFPercentage(40),
        height:RFPercentage(40),
        alignContent:'center',
        justifyContent:'flex-end',
        borderColor:'gray',
        borderRadius:RFPercentage(2),
        padding:RFPercentage(2)

    },
    icon: {
      
    },
    input: {
        height: RFPercentage(6),
        borderColor: 'gray',
        color:'black',
        backgroundColor:'white',
        borderWidth: RFPercentage(0.2),
        borderRadius: RFPercentage(2),
        paddingLeft: RFPercentage(2),
    },
    buttonContainer: {
        width:RFPercentage(50),
         height:RFPercentage(50),
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
    },
    button: {
        alignItems: 'center',
        marginBottom:RFPercentage(2)

    },
    buttonText: {
        color: '#1B212E',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: '2%',
    },
    switchPage: {
        marginBottom:RFPercentage(40),
        color: 'black',
        textDecorationLine:'underline'
    }
});

export default Login;