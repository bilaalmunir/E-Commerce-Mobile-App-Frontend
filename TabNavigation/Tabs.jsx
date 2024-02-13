import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Addcar from "./Addcar";
import Userprofile from "./Userprofile";
import Mainpage from "./Mainpage";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Mainpage" options={{ headerShown: false }}>
                {(props) => <Mainpage {...props} navigation={navigation} route={route} />} 
            </Tab.Screen>
            <Tab.Screen  name="Addcar" >
            {(props) => <Addcar {...props} navigation={navigation} route={route} />} 
            </Tab.Screen>
            <Tab.Screen name="Userprofile" >
            {(props) => <Userprofile {...props} navigation={navigation} route={route} />} 
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default Tabs;
