import { RFPercentage } from 'react-native-responsive-fontsize';
import { Dimensions,StatusBar } from 'react-native';
import { Directions } from 'react-native-gesture-handler';
export const styles = {
   
    //for mainpage products
    searchContainer:{
        marginTop:'3%',
         alignItems:'center'
    },
    search:{
    width:'95%',
    padding:'2%',
    borderRadius:RFPercentage(1),
    backgroundColor:'#ffc5d1'
    },
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin:RFPercentage(1),
        marginTop:RFPercentage(1),
        //backgroundColor:'black'
      },
      
      scrollViewContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      carBox: {
        borderWidth:RFPercentage(1),
        borderColor: "#ffc5d1",
        padding: RFPercentage(1),
        borderRadius: RFPercentage(2),
        height: RFPercentage(30),
        margin:RFPercentage(0.5),
        flex:1,
        backgroundColor:'#f0f0f0'
      },
      CarName:{
        color:'black',
        fontWeight:'bold',
        fontSize: RFPercentage(2)
      },

      //ADD CAR FORM
      AddCarContainer:{
        flex:1,
        flexDirection:'column',
        paddingTop: StatusBar.currentHeight ,

      },
      AddFormUpperPortion:{
        flex:0.2,
        //backgroundColor:'white',
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'white'
      },
      AddFormLowerPortion:{
        flex:0.8,
        justifyContent:'flex-start',
        alignItems:'center',
        //backgroundColor:'#F7DED0',
      },
        AddCarTitle:{
            fontSize:RFPercentage(7),
            fontWeight:'bold'
        },
      input:{
        
        backgroundColor:'gray',
        width:'80%',
        marginBottom:'8%',
        padding:'2%',
        borderRadius:RFPercentage(1)
      },
      AddCarButton:{
        borderRadius:RFPercentage(1),
        backgroundColor:'#5ced73',
        width:'50%',
        alignItems:'center',
        padding:'2%'
      },
      picker: {
        width: '80%',
      },
      selectedOptionText: {
        marginTop: 20,
        fontSize: 16,
      },

      //user profile

      ProfileContainer: {
        flex: 1 ,
        
    },
    ProfileUpperContainer:{
        flex:0.65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    ProfileUpperNestedUpper:{
        flex:0.17,
        justifyContent: 'flex-start',
        alignItems:'center',
        padding:RFPercentage(18),
       //backgroundColor:'blue'
    },
    ProfileProfilePicture:{
        marginTop: '25%',
        width: RFPercentage(10), 
        height: RFPercentage(15), 
        borderRadius: RFPercentage(5),
    },
    ProfileUserName:{
        marginTop:'10%',
        opacity:0.7,
        fontSize:RFPercentage(1.8)
    },
    ProfileBalance:{
        marginTop:'7%',
        width:'100%',
        opacity:0.9,
        fontSize:RFPercentage(3)
    },
    ProfileUpperNestedLower:{
        flex:0.9,
        flexDirection:'row',
        alignItems:'center',
        //backgroundColor:'black',
    },

    ProfileLowerContainer:{
        flex:0.35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"yellow"
    },
    
};