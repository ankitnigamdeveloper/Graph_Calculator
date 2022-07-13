import {StyleSheet} from 'react-native'
import { Dimensions} from "react-native";

export default StyleSheet.create({
    mainview:{
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'white',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor:"black",
        alignItems: 'center',
        justifyContent: 'center',
        // opacity:1
      },
    maintextview:{
        // width:Dimensions.get('window').width,
        height:50,
        marginTop:30,
        justifyContent:"center",
        alignItems:"center"
    },
    mainText:{
        fontSize:20,
        marginBottom:5
    },
    loginbtnview:{
        flexDirection: "row",
        
    },
    logintext:{
        textDecorationLine: "underline"
    },
    
    imagebtn:{
        height:25,
        width:25,
    },
    googlelogin:{
        flexDirection: "row",
        borderWidth: 1,
        borderColor:"black",
        borderRadius:5,
        height:40,
        
        
        margin: 10,
        justifyContent:"center",
        alignItems:'center',
    },
    
    googlelogintxt:{
        marginRight:10,
        marginLeft:10, 
        textAlign: "center", 
        fontSize: 15,
        color:"black"
    },
    
    noteview:{
       
        // flexDirection:'',
        borderRadius:5,
        height:90,
        margin: 10,
        backgroundColor:"gold",
        
        padding: 10
    },
    lernmore:{
        color:"blue", 
        fontSize:12,
        textDecorationLine:"underline"
    },
    textinput:{
        borderColor:"gray",
        borderRadius:4,
        borderWidth:1,
        height:35,
        marginTop:5
    },
    textinput1:{
        height:35,
        width: Dimensions.get('window').width - 220
    },
    passwordview:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        alignContent:"center",
        borderColor:"gray",
        borderRadius:4,
        borderWidth:1,
        height:35,
        padding:0
    },
    forgotbtn:{
        alignItems:'center',
        justifyContent:'center',
        // alignSelf:"flex-end",
        width:150,
        height:35,

    },
    lineview:{
        backgroundColor: 'black', 
        height: 1, 
        flex: 1, 
        alignSelf: 'center'
    },
    loginbtn:{
        alignSelf:"flex-end",
        width:120,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"blue",
        borderRadius:5,
        marginTop:15
    },
    loginbtntxt:{
        color: "white"
    }
   
    });