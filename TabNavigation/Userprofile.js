import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Userprofile extends Component {
    render() {

        return (
            <View style={styles.container}>
                <Text>userprofile</Text>
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
