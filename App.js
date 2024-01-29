import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
 import Login from './screens/Login';
import Signup from './screens/Signup';
import FrontPage from './screens/Frontpage';
import MainPage from './screens/Mainpage';
import Addcar from './screens/Addcar';
import Cardetails from './screens/Cardetails';
const Stack = createNativeStackNavigator();
//import ImagePicker from 'react-native-image-picker';

class App extends Component {
 render() {
   return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Frontpage">
      <Stack.Screen name="Frontpage" component={FrontPage} />
      <Stack.Screen name="Login" component={Login} /> 
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MainPage" component={MainPage}/>
      <Stack.Screen name="Addcar" component={Addcar}/>
      <Stack.Screen name="Cardetails" component={Cardetails}/>
    </Stack.Navigator>
  </NavigationContainer>
   );
 }
}

export default App;

