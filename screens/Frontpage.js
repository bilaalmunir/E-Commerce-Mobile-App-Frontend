import { View,Text,Button,Pressable} from 'react-native';
import React, {Component,PureComponent} from 'react';


class FrontPage extends PureComponent {
    render(){
        const {navigation} = this.props;
        return(
            <View>
                <Pressable title="Login" onPress={() => navigation.navigate('Login')}> <Text>Login</Text></Pressable>
                <Pressable title='SignUp' onPress={() => navigation.navigate('Signup')}> <Text>Signup</Text></Pressable>
            </View>

        );
    }
}

export default FrontPage;