import { Component } from "react";
import {Text } from "react-native";
class Ownedcars extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        const {user} = this.props.route.params.user
        return(
            <Text>hkshdk</Text>
            
        );
    }
}
export default Ownedcars;