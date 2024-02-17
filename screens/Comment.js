import { Component } from "react";
import { BackHandler, Pressable, Text , TouchableOpacity,View} from "react-native";
import { TextInput } from "react-native";
class Comment extends Component {
    constructor(props){
        super(props);
        this.state={
            comment:""
        }
    }
    render(){
        return(
            <View>
            <Text> any comment for the post?</Text>
            <TextInput
               placeholder="Enter a comment"
               value={this.state.comment}
               onChange={(e)=> this.setState({
                comment: e.target.value})}
            />
            <TouchableOpacity> 
            <Text>post!</Text></TouchableOpacity>
            </View>

        );
    }
}

export default Comment;