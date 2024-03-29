import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
 import Login from './screens/Login';
import Signup from './screens/Signup';
import FrontPage from './screens/Frontpage';
import MainPage from './TabNavigation/Mainpage';
import Addcar from './TabNavigation/Addcar';
import Cardetails from './screens/Cardetails';
import Tabs from './TabNavigation/Tabs';
import Wishlist from './screens/Wishlist';
import Ownedcars from './screens/Ownedcars';
const Stack = createNativeStackNavigator();
//import ImagePicker from 'react-native-image-picker';
//login say reg mein jara hai tou push ho
//register mein login mien arha hai tou back ho
//
const Tab = createBottomTabNavigator();

class App extends Component {
  
 render() {
   return (
    <><StatusBar barStyle="dark-content" backgroundColor="white" /><NavigationContainer>
       <Stack.Navigator initialRouteName="Frontpage">
         <Stack.Screen name="Frontpage" component={FrontPage} options={{ headerShown: false }} />
         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
         <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
         {/* <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }}/> */}
         <Stack.Screen name="Addcar" component={Addcar} options={{ headerShown: false }} />
         <Stack.Screen name="Cardetails" component={Cardetails} />
         <Stack.Screen name='Wishlist' component={Wishlist} />
         <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
         <Stack.Screen name="Ownedcars" component={Ownedcars} />
       </Stack.Navigator>
     </NavigationContainer></>
   );
 }
}

export default App;

