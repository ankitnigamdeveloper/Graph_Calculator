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
    maintextview:{
        marginTop:30,
        // width:Dimensions.get('window').width,
        height:50,
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
    formbtn:{
        height:50,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:'space-evenly',
        margin:10
    },
    externalbtn:{
        height:50,
        // width:150,
        width:Dimensions.get('window').width/2 -40,
        alignItems:"center",
        justifyContent:'space-evenly',
        borderBottomWidth:2,
        // borderBottomColor:"blue"
      
    },
    externalbtntext:{
        fontSize:16

    },
    emailbtntext:{
        fontSize:16

    },
  
    agreeview:{
        flexDirection:'row',
        padding:10
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
        height:90,
        
        margin: 10,
        justifyContent:"center",
        alignItems:'center',
        padding: 20
    },
    googlelogin1:{
        flexDirection: "row",
        borderWidth: 1,
        borderColor:"grey",
        borderRadius:5,
        height:90,
        margin: 10,
        
        justifyContent:"center",
        alignItems:'center',
        padding: 20
    },
    googlelogintxt:{
        marginRight:10,
        marginLeft:10, 
        textAlign: "center", 
        fontSize: 16,
        color:"black"
    },
    googlelogin1txt:{
        marginRight:10,
        marginLeft:10, 
        textAlign: "center", 
        fontSize: 16,
        color:"grey"
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