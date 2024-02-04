import { View,Text,Button,Pressable,StyleSheet} from 'react-native';
import React, {Component,PureComponent} from 'react';


class FrontPage extends PureComponent {
    render(){
        const {navigation} = this.props;
        return(
            <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Pressable style={styles.button} title="Login" onPress={() => navigation.replace('Login')}><Text style={styles.buttonText}>log in</Text></Pressable>
            <Pressable style={styles.button} title='SignUp' onPress={() => navigation.replace('Signup')}><Text style={styles.buttonText}>sign up</Text></Pressable> 
                
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FrontPage;