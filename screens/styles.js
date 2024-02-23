import { RFPercentage } from 'react-native-responsive-fontsize';
import { Dimensions,StatusBar } from 'react-native';
export const styles = {
    //for mainpage 
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin:RFPercentage(1),
        marginTop:RFPercentage(1.5)
      },
      
      scrollViewContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      carBox: {
        borderWidth: 1,
        borderColor: "white",
        padding: RFPercentage(1),
        borderRadius: 10,
        // marginBottom: 10,
        height: RFPercentage(30),
        margin:RFPercentage(0.5),
        flex:1,
        backgroundColor:'black'
      },

      //add car form
      AddCarContainer:{
        flex:1,
        flexDirection:'column',
        paddingTop: StatusBar.currentHeight ,
      },
      AddFormUpperPortion:{
        flex:0.3,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
      },
      AddFormLowerPortion:{
        flex:0.7,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
      }
};