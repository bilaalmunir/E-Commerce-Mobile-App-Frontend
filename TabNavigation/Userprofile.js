import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import { styles } from '../screens/styles';
import { RFPercentage } from 'react-native-responsive-fontsize';
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
            <View style={styles.ProfileContainer}>
            <View style={styles.ProfileUpperContainer}>
                <View style={styles.ProfileUpperNestedUpper}>
                <Image
              source={require('../Images/profile.jpg')}
              style={styles.ProfileProfilePicture} />
              <Text style={styles.ProfileUserName}>{user.username}</Text>
                <Text style={styles.ProfileBalance}> ${user.balance}</Text>
                </View>
                <View style={styles.ProfileUpperNestedLower}>
                <View style={{flex:0.4 , alignItems:'center', marginRight:RFPercentage(2), backgroundColor:'khaki' , borderRadius:RFPercentage(1.5)}}>
                    <Text style={{ padding:RFPercentage(5),}}> hi hello</Text>
                </View>
                <View style={{flex:0.4 , alignItems:'center', backgroundColor:'khaki', borderRadius:RFPercentage(1.5)}}>
                <Text style={{ padding:RFPercentage(5)}}> hi hello</Text>
                </View>
                </View>
            </View>
            <View style={styles.ProfileLowerContainer}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Wishlist' , {user:user})}>
                <Text style={styles.logOut}>Wishlist</Text>
            </TouchableOpacity>
                
                <TouchableOpacity onPress={() => this.logOut()}>
                          <Text style={styles.logOut}>Log out</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=> this.props.navigation.navigate('Ownedcars', {user: user.ownedCars})}>
                        <Text >Owned Cars</Text>
                      </TouchableOpacity>
            </View>
           
            </View>
        );
    }
}


export default Userprofile;
