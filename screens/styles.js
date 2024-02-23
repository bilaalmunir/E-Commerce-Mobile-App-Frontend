import { RFPercentage } from 'react-native-responsive-fontsize';
import { Dimensions,StatusBar } from 'react-native';
export const styles = {
    //for mainpage
    // safeAreaContainer: {
    //     flex: 1,
    //     backgroundColor: "white",
    //      paddingTop: StatusBar.currentHeight 
    //   },
    //   profile:{
    //     width:RFPercentage(6),
    //     height:RFPercentage(6),
    //     borderRadius:RFPercentage(6),
    //     borderWidth:RFPercentage(0.5),
    //     borderColor:'black'
    //   },
    //   header: {
    //     flexDirection: "row",
    //     justifyContent: 'space-between',
    //     padding: RFPercentage(1.5),
    //     alignItems: "center",
    //     width: RFPercentage(50),
    //     height:RFPercentage(8),
    //     //marginBottom: 10,
    //     backgroundColor:'white',
    //   },
    //   username: {
    //     fontSize: RFPercentage(2),
    //     fontWeight: "bold",
    //     textAlign: "left",
    //     color:"Black",
    //     textDecorationStyle:'solid'
    //     //paddingTop: RFPercentage(1),
    //   },
    //   tabBar: {
    //     flex:1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   },
    //for mainpage products
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
        height: RFPercentage(30),
        margin:RFPercentage(0.5),
        flex:1,
        backgroundColor:'black'
      },

      //ADD CAR FORM
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