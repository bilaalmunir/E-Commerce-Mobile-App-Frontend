import { Component } from "react";
import { Text,View } from "react-native";
import { getCommentsForPost } from "../api/getApi";
class Comments extends Component{
    constructor(props){
        super(props);
        this.state={
            comments:[],
            done:false
        }
    }
    componentDidMount(){
        this.getComments()
    }
    getComments = async() => {
        // console.log("detaillllll id", this.props.detail.id)
        // const productId = this.props.detail.id
        // //console.log("iddddddddddd", productId)
        // const response = await getCommentsForPost(productId)
        // if(response.id){
        //     this.setState({
        //         comments:response.comments,
        //         done:true
        //     })        
        // }else {
        //     this.setState({
        //         done:false
        //     })
        // }
    }
    render(){
        return(
            <View><Text> Comments of the post</Text>
            {this.state.done? (<Text>agaye comments</Text>):(<Text>no comments for this product</Text>)}
            </View>
        );
    }
}
export default Comments;