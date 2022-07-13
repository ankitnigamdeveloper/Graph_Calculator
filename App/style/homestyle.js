import {StyleSheet} from 'react-native'
import { Dimensions} from "react-native";


export default StyleSheet.create({
    mainview:{
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'white',
        padding: 0,
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:15,
        borderBottomColor:"lightgrey",
        borderBottomWidth:0.6,
        // backgroundColor:"gold"
    },
    menubtnview:{
       
      height:40,
      width:40,
      alignItems:"center",
      justifyContent:"center",
    },
    menubtn:{
        height:25, 
        width: 25, 
        resizeMode:"contain"
    },
   headertext:{
        fontSize:17,
        fontWeight:"bold"
   },
    text:{
        color:"white",
        fontSize:16
    },
    text1:{
        // color:"",
        marginTop:13,
        fontSize:16
    },
    text2:{
        fontSize:17
    },
    popupView:{
        // height:"60%",
        width:"75%",
        marginTop:8,
        backgroundColor:"white",
        alignSelf:"center",
        // alignItems:"center",
        borderRadius:5,
        padding:10,
        elevation:5
    },
    triangle: {
        width: 0,
        height: 0,
        marginTop:15,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor:"white",
        elevation:5,
        transform: [
            { rotate: '90deg' }
        ],
        margin: 0,
        marginLeft: -6,
        borderWidth: 0,
        // borderColor:"white",
        // elevation:5
    },
    popupbutton:{
        marginTop:5,
        height:35,
        borderRadius:5,
        borderColor:"gray",
        borderWidth:1,
        flexDirection:"row",
        // justifyContent:"space-evenly",
        alignItems:"center",
        backgroundColor:"white"
    },
    abtn1:{
        backgroundColor:"gray", 
        flex: 1, 
        height:33.5, 
        alignItems:"center", 
        justifyContent:"center",
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,

    },
    abtn2:{
        // backgroundColor:"gray", 
        flex: 1, 
        height:33.5, 
        alignItems:"center", 
        justifyContent:"center",
        borderTopRightRadius:5,
        borderBottomRightRadius:5,

    },
    imagebtn:{
        height:25,
        width:25,
    },
    rcbtn:{
        flexDirection:"row",
        marginTop:8,
        alignItems:"center"
    },
    rcbtntxt:{
        fontSize:16
    },
    line:{
         width:"100%", 
         height:1, 
         backgroundColor:"grey", 
         marginTop:5
    },
    textinp:{
        width:"100%",
        borderRadius:4,
        borderColor:"grey",
        borderWidth:1,
        height:35,
        marginTop:0,
        paddingVertical:0,
        paddingHorizontal:8,
        marginBottom:10,
    },
    textinp1:{
        width:"100%",
        borderColor: "gray",
        borderWidth:1,
        marginBottom:10,
        height:35,
        borderRadius:4,
        paddingVertical:0,
        paddingHorizontal:8
    },
    graphview:{
        height: 300, 
        flexDirection: 'row', 
        marginHorizontal:15,
        marginTop:20,
    },
    priceview:{
        flexDirection: "row", 
        justifyContent:"space-between",
        height:35,
        // backgroundColor:"gray",
        alignItems:"center",
        paddingHorizontal:10
    },
    txt:{
        fontSize:15
    },
    flatlistview:{
        height:80,
        justifyContent:"center",
       width: Dimensions.get('window').width,
        
    }


})