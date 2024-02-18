import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Addcar from "./Addcar";
import Userprofile from "./Userprofile";
import Mainpage from "./Mainpage";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
    return (
        <Tab.Navigator
        tabBarOptions={{
                activeTintColor: 'blue', // Color of the active tab
                inactiveTintColor: 'gray', // Color of the inactive tabs
                labelStyle: { fontSize: 10, }, // Style for the tab labels
                style: { backgroundColor: 'white', borderTopWidth: 1 },
                labelStyle: { display: 'none' } // Style for the tab bar
            }}
        >
            <Tab.Screen name="Mainpage" options={{ headerShown: false,
            tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? require('../Images/safari.png') : require('../Images/safari.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    ),}}>
                {(props) => <Mainpage {...props} navigation={navigation} route={route} />} 
            </Tab.Screen>

            <Tab.Screen  name="Addcar"  options={{ headerShown: false,
            tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? require('../Images/upload.png') : require('../Images/upload.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    ),}} >
            {(props) => <Addcar {...props} navigation={navigation} route={route} />} 
            </Tab.Screen>

            <Tab.Screen name="Userprofile"  options={{ headerShown: false,
            tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? require('../Images/user.png') : require('../Images/user.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    ),}}>
            {(props) => <Userprofile {...props} navigation={navigation} route={route} />} 
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default Tabs;
