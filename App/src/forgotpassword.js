
 import React, { Component } from 'react';
 import auth from '@react-native-firebase/auth';
 import {
   SafeAreaView,
   ScrollView,
   Text,
   TouchableOpacity,
   View,
   TextInput
 } from 'react-native';
 import styles from '../style/loginstyle'

 export default class Apps extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: "",
        password:"",

    }
  }
  Forgotpassword = () => {
    
      if(this.state.email == ""){
        alert("Please enter email")
      

    }
    else{
      auth().sendPasswordResetEmail(this.state.email)
      .then(() => {
        console.log('User signed in!');
        this.props.navigation.navigate('Login')
      })
      .catch(error => {
        
          alert(error)
          console.log('That email address is already in use!');
      })
    }
  }

  render() {
    return (
      <SafeAreaView >
       
        <ScrollView style = {{backgroundColor:"white"}}>
        
          <View style = {styles.mainview}>
            <View style = {[styles.maintextview,{marginTop:50}]}>

              <Text style = {styles.mainText}>Forgot Password</Text>
              <View style = {styles.loginbtnview}>
                <Text style = {styles.textdes}> </Text>
                
              </View>
            </View>
            <View>
              <Text>Email</Text>
              <TextInput style = {styles.textinput} onChangeText = {(email)=> this.setState({email})}/>
            
              <TouchableOpacity style = {styles.loginbtn} onPress = {()=> this.Forgotpassword()}>
                <Text style = {styles.loginbtntxt}>Send</Text>
              </TouchableOpacity>
            </View>
            
            <View style = {styles.noteview}>
              <Text>
                <Text style = {{fontWeight:'bold'}}>Note:</Text>
                <Text> Desmos uses cookies to enable persistense when you are signedin.
                If  you do not wish to use cookies, please use Demos without logging in. 
                </Text>
                <Text> </Text>
                <TouchableOpacity style = {{ height:15, padding:0}}>
                  <Text style = {styles.lernmore} >Learn More</Text>
                </TouchableOpacity>
              </Text> 
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
}
 