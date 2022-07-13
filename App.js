//26 hours first week
//40 hours second week
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from "./App/src/Login";
import Signup from "./App/src/Signup";
import Home from "./App/src/home";
import ForgotPassword from "./App/src/forgotpassword";
import SideMenu from "./App/src/SideMenu"
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App(props) {
  return (
    <NavigationContainer independent = {true}>
      <MyDrawer navigation={props.navigation}/>
    </NavigationContainer>
  );
}

function MyDrawer({ navigation }) {
    global.Index = 0;
    global.isSelected = false
    global.isLoad = false
  return (

    <>
      <Drawer.Navigator screenOptions={{headerShown: false}} 
      
        drawerContent={(props) => <SideMenu {...props} /> }
      
        >
           <Drawer.Screen name="Home" component={Home} />
         {/* <Drawer.Screen name= "Index" component={Index} /> */}
       
         <Drawer.Screen name= "Signup" component= {Signup} options={{
          swipeEnabled: false,
        }}/>
        <Drawer.Screen name= "Login" component= {Login} options={{
          swipeEnabled: false,
        }}/>
        <Drawer.Screen name= "ForgotPassword" component= {ForgotPassword} options={{
          swipeEnabled: false,
        }}/>
        
        <Drawer.Screen name="SideMenu" component={SideMenu} 
         />
      </Drawer.Navigator>
    </>
  );
}
