
 import React, { Component } from 'react';
 import auth from '@react-native-firebase/auth';
 import { GoogleSignin } from '@react-native-google-signin/google-signin';
 import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    View,
    TextInput,
    Modal,
    ActivityIndicator
  } from 'react-native';
 import { appleAuth } from '@invertase/react-native-apple-authentication';
 import styles from '../style/loginstyle'
 import SideMenu from './SideMenu'

 GoogleSignin.configure();
 
 export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: "",
        password:"",
        userInfo:'',
        isLoading:false,
    }
  }
  
  componentDidMount(){
    GoogleSignin.configure({
      webClientId: '955976354718-r0k839aitds81pglu5qs7cifin8vfggj.apps.googleusercontent.com',
               
    });
  }

  Login = () => {
    if(this.state.email == "" || this.state.password == ""){
      if(this.state.email == ""){
        alert("Please enter email")
      }else{
        alert("Please enter password")
      }

    }
    else{
      this.setState({isLoading:true})
      auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log('User signed in!');
        new SideMenu().datavalue()
        this.setState({isLoading:false})
        this.props.navigation.navigate('Home')
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          alert('Please Enter valid Password')
          console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!')
          console.log('That email address is invalid!');
      }
      if (error.code === 'auth/user-not-found') {
        alert('User not found')
         
      }
  
      console.error(error);
    }); 
    
      // alert("succes") 
    
    }
    this.setState({isLoading:false})
  }
googlelogin = async() => {
  
  console.log("yse")
  const { idToken } = await GoogleSignin.signIn();
  this.setState({isLoading:true})
console.log("idtoken")
  // Create a Google credential with the token
  this.setState({isLoading:true})
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  this.setState({isLoading:true})
  console.log(googleCredential)
  auth().signInWithCredential(googleCredential)
  .then(() => {
    console.log('User signed in!');
   
    new SideMenu().datavalue() 
    this.props.navigation.navigate('Home')
    this.setState({isLoading:false})
  })
  .catch(error =>{
      
      console.log('That email address is already in use!');
  })

}
componentWillUnmount(){
  new SideMenu().datavalue() 
}
  applelogin = async() => {
    if(Platform.OS === "ios"){
      this.setState({isLoading:true})
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
  
    // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned';
      }
  
      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    
      // Sign the user in with the credential
      return auth().signInWithCredential(appleCredential);
    }else{
      alert("AppleAuth is not supported on the device")
    } 
    
  }
  
  render() {
    const color = "black"
    const backgroundColor = "white"
    const loadingMessage = "Loading ..."
    return (
     
      <SafeAreaView >
          
       
        <ScrollView style = {{backgroundColor:"white"}}>
        
          <View style = {styles.mainview}>
            
            <View style = {styles.maintextview}>
              <Text style = {styles.mainText}>Log In</Text>
              <View style = {styles.loginbtnview}>
                <Text style = {styles.textdes}>New to MoneyNest? </Text>
                <TouchableOpacity onPress = {()=>this.props.navigation.navigate("Signup")}>
                    <Text style = {styles.logintext}>Sign up.</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal transparent={true} animationType="none" visible={this.state.isLoading}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `rgba(0,0,0,${0.6})`
                }}
              >
                <View
                  style={{
                    padding: 13,
                    backgroundColor: `${backgroundColor}`,
                    borderRadius: 13
                  }}
                >
                  <ActivityIndicator animating={this.state.isLoading} color={color} size="large" />
                  <Text style={{ color: `${color}` }}>{loadingMessage}</Text>
                </View>
              </View>
            </Modal>

            <TouchableOpacity onPress = {()=>{this.googlelogin()}} >
              <View style = {styles.googlelogin}>
                <Image
                  style={styles.imagebtn}
                  source={require('../img/googleicon.png')}
                />
                
                <Text style = {styles.googlelogintxt} >Log in with Google</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=>{this.applelogin()}} >
              <View style = {styles.googlelogin}>
                <Image
                style={styles.imagebtn}
                source={require('../img/appleicon.png')}
                />
              
                <Text style = {styles.googlelogintxt} >Log in with Apple</Text>
              
              </View>
            </TouchableOpacity>
            


            
             <View style = {{padding:15}}>
              <View style={{flexDirection: 'row'}}>
                  <View style={styles.lineview} /> 
                  <Text style={{ paddingHorizontal:5 }}>
                      Or log in with MoneyNest
                  </Text> 
                  <View style={styles.lineview} /> 
                
                </View>
                
                  <Text>Email</Text>
                  <TextInput style = {styles.textinput} onChangeText = {(email)=> this.setState({email})}/>
                  <Text style = {{marginTop : 8}}>Password</Text>
                  <View style = {styles.passwordview}>
                    <TextInput 
                      style = {styles.textinput1} 
                      onChangeText = {(password)=> this.setState({password})} 
                      secureTextEntry
                    />
                    <TouchableOpacity 
                      style = {styles.forgotbtn} 
                      onPress = {()=>this.props.navigation.navigate("ForgotPassword")}
                    >
                      <Text>Forgot your password?</Text>
                    </TouchableOpacity>
                  </View>
            
                  <TouchableOpacity style = {styles.loginbtn} onPress = {()=> this.Login()}>
                    <Text style = {styles.loginbtntxt}>Log In</Text>
                  </TouchableOpacity>
                </View>
                  
                <View style = {styles.noteview}>
                  <Text>
                    <Text style = {{fontWeight:'bold'}}>Note:</Text>
                    <Text> MoneyNest uses cookies to enable persistense when you are signedin.
                      If  you do not wish to use cookies, please use MoneyNest without logging in. </Text>
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
 