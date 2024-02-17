import { Component } from "react";
import { BackHandler, Pressable, Text , TouchableOpacity,View} from "react-native";
import { TextInput } from "react-native";
import { addComment } from "../api/postApi";
class Comment extends Component {
    constructor(props){
        super(props);
        this.state={
            comment:"",
            done:false
        }
        
    }
   
    componentDidMount(){
        //this.setState({done:false})
    }
    setComment = async(userId,productId) => {
    
        const response = await addComment(productId,userId,this.state.comment)
        if(response.id){
            this.setState({
                done:true
            })
        }
        
        else{
            console.log("o error agya jee")
        }
        
    }
    render(){
        const userid= this.props.user.userID;
         const productId =this.props.detail.id;
        return(
            <View>
            <Text> any comment for the post?</Text>
            <TextInput
               placeholder="Enter a comment"
               value={this.state.comment}
               onChangeText={(text)=> this.setState({
                comment: text})}
            />
            <TouchableOpacity onPress={()=>{
                this.setComment(userid,productId)
            }}> 
            <Text>post!</Text></TouchableOpacity>
            {/* {this.state.done?(<Text>done!!!!!</Text>):(null)} */}
            </View>

        );
    }
}

export default Comment;