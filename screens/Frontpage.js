import { View,Text,Button,Pressable,StyleSheet} from 'react-native';
import React, {Component,PureComponent} from 'react';
import { StatusBar } from 'expo-status-bar';


class FrontPage extends PureComponent {
    render(){
        const {navigation} = this.props;
        return(
            <><StatusBar barStyle="dark-content" backgroundColor="white" /><View style={styles.container}>
                <Text style={styles.title}>Hey!</Text>
                <Text style={styles.discription}>Welcome to my Ecommerce Mobile App. Which is built on ReactNative and Springboot.</Text>
                <View style={styles.buttonContainrs}>
                    <Pressable style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? 'gray' : 'black' }
                    ]} title="Login" onPress={() => navigation.replace('Login')}><Text style={styles.buttonText}>Log In</Text></Pressable>
                    <Pressable style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? 'gray' : 'black' }
                    ]} title='SignUp' onPress={() => navigation.replace('Signup')}><Text style={styles.buttonText}>Sign Up</Text></Pressable>
                </View>

            </View></>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    buttonContainrs: {
        flexDirection: 'row',
        justifyContent:'center',
        marginTop:30
    },
    title: {
        color:'black',
        fontSize: 44,
        fontWeight: 'bold',
        marginBottom: 20,
        
    },
    discription:{
        color:'black',
        textAlign:'center',
        opacity:0.7
        },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 100,
        marginVertical: 10,
        marginHorizontal:10,
        width: 100,
        alignItems: 'center',
        

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FrontPage;