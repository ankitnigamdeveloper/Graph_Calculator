import {StyleSheet} from 'react-native'
import { Dimensions} from "react-native";

export default StyleSheet.create({
    drawerContent: {
        flex: 1,
        marginTop:-5,
        backgroundColor:"black",
      
    },
   
    item1view:{
      alignItems:"center",
      width:215,
  },
  emailtext:{
      fontSize:16,
      color:"white"

  },
  signouttext:{
      marginTop:5,
      paddingHorizontal:5,
      fontSize:14,
      color:"white",
      borderWidth:1,
      borderColor:"white",
      borderRadius:4

  },
  logintext:{
    marginTop:5,
    paddingHorizontal:5,
    fontSize:14,
    color:"white",
    borderBottomWidth:1,
    borderColor:"white",
    fontWeight:"bold"

},
signuptext:{
  marginTop:5,
  paddingHorizontal:10,
  paddingVertical:5,
  fontSize:14,
  color:"white",
  borderWidth:1,
  borderColor:"white",
  borderRadius:4

},
  item1:{
    height:100,
    flex:1,
    backgroundColor:"green",
    alignItems:"center",
    justifyContent:"flex-start",
    paddingTop:10,
    
  },
  menubtn:{
    height:35, 
    width: 35, 
    resizeMode:"contain"
},
    menuitem2:{
      backgroundColor:"black",
      justifyContent:"center",
      // alignItems:'center',
      height:50
  },
  menuitem2view:{
      flexDirection:"row",
      justifyContent:"space-evenly",
      alignItems:'center',
      width:200
  },
  text:{
      color:"white",
      fontSize:16
  },
  text1:{
    color:"white",
    fontSize:14,
    marginHorizontal:8
},
text2:{
  color:"gray",
  // fontSize:12,
},

  line:{
    width:"100%", 
    height:0.5, 
    backgroundColor:"grey", 
    marginTop:5
},
view:{
 flexDirection:"row",
 marginTop:10,
 justifyContent:"space-between",
 alignItems:"center",
//  flex:1,
},
view1:{
 marginLeft:15,
 marginRight:20,
 
},
flatlists:{
  flex:1,
  width:270
},
image:{
  height:25, 
  width: 25, 
  resizeMode:"contain",
  marginRight:0,
  borderRadius:8
},

})