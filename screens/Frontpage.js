import { View,Text,Button,Pressable} from 'react-native';
import React, {Component,PureComponent} from 'react';


class FrontPage extends PureComponent {
    render(){
        const {navigation} = this.props;
        return(
            <View>
            <Text>hi</Text>
            <Pressable title="Login" onPress={() => navigation.navigate('Login')}><Text>log in</Text></Pressable>
            <Pressable title='SignUp' onPress={() => navigation.navigate('Signup')}><Text>sign up</Text></Pressable> 
                
            </View>

        );
    }
}

export default FrontPage;