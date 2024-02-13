import React, { Component } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';

class Userprofile extends Component {
    logOut = () => {
        const { navigation } = this.props;
         navigation.replace('Login') 
    };
    render() {
        const {navigation,route} = this.props;
        const {user} = route.params;
        //console.log("profileeeeeeeeeee",user)
       
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Wishlist' , {user:user})}>
                <Text style={styles.logOut}>Wishlist</Text>
            </TouchableOpacity>
                <Text>username: {user.username}</Text>
                <Text>Account Balance: ${user.balance}</Text>
                <Text>first name: {user.firstName}</Text>
                <Text>last name: {user.lastName}</Text>
                <TouchableOpacity onPress={() => this.logOut()}>
                          <Text style={styles.logOut}>Log out</Text>
                      </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logOut: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'blue', // or any color you prefer
      textAlign: 'right',
  },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
    },
});

export default Userprofile;
