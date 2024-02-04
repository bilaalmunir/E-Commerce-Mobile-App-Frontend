import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { userSignup } from '../api/postApi';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            loading: false,
            res: false,
        };
    }

    handleSubmit = async () => {
        this.setState({
            loading: true,
        });

        const response = await userSignup(
            this.state.username,
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.password
        );

        if (response) {
            this.setState({
                loading: false,
                res: true,
            });
            console.log("Sign up response:", response);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>To Register, Enter Details:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Firstname"
                    value={this.state.firstname}
                    onChangeText={(text) => this.setState({ firstname: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter LastName"
                    value={this.state.lastname}
                    onChangeText={(text) => this.setState({ lastname: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    secureTextEntry={true}
                />
                <Pressable style={styles.button} onPress={this.handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                {this.state.res ? (
                    this.props.navigation.replace('Login', { uName: this.state.username })
                ) : this.state.loading ? (
                    <Text style={styles.loadingText}>Please wait...</Text>
                ) : null}
                <Pressable onPress={()=> this.props.navigation.replace('Login')}>
                    <Text>do you have an account?</Text>
                </Pressable>
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontStyle: 'italic',
    },
});

export default Signup;
