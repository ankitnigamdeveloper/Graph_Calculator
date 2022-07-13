
 import React, { Component } from 'react';
 import auth from '@react-native-firebase/auth';
 import { GoogleSignin } from '@react-native-google-signin/google-signin';
 GoogleSignin.configure();
 import {
   SafeAreaView,
   ScrollView,
   Text,
   TouchableOpacity,
   Image,
   View,
   TextInput,
   ActivityIndicator,
   Modal,
   Platform
 } from 'react-native';
 import styles from '../style/Signupstyle'
 import SideMenu from './SideMenu';
 import { appleAuth } from '@invertase/react-native-apple-authentication';
 
 
 GoogleSignin.configure({
  webClientId: '955976354718-r0k839aitds81pglu5qs7cifin8vfggj.apps.googleusercontent.com'
});

 export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
        agree : false,
        terms : false,
        external : true,
        email: "",
        password:"",
        cpassword:"",
        isLoading:false

    }
  }

  componentDidMount(){
    // global.isLoad = false
  }
    
      signup = () => {
        if(this.state.email == "" || this.state.password == "" || this.state.cpassword == ""){
          if(this.state.email == ""){
            alert("Please enter email")
          }else if( this.state.password == ""){
            alert("Please enter password")
          }else{
            alert("Please enter confirm password")
          }
    
        }
        else{
          if(this.state.password == this.state.cpassword) {
          // alert("succes") 
      
      if(this.state.email !=='' && this.state.password !==''){
        this.setState({isLoading:true})
      auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            new SideMenu().datavalue()
          console.log('User account created & signed in!');
          this.setState({isLoading:false})
          this.props.navigation.navigate('Home')

          })
          .catch(error => {
            this.setState({isLoading:false})
           if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            
          }
          
          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!')
            console.log('That email address is invalid!');
          }
          if (error.code === 'auth/weak-password') {
            alert('please enter strong password min.6 char')
            
          }       
         console.error(error);
        }); 
      }
    
      else{
          alert('enter email and password')
      } 
    }else{
      alert("Password not match")
    }
    }
  }

  Agreefunc = () => {
    if(this.state.agree){
      this.setState({agree:false})
    }else{
      this.setState({agree:true})
    }
  }
  termsfunc = () => {
    if(this.state.terms){
      this.setState({terms:false})
    }else{
      this.setState({terms:true})
    }
  }
  applelogin = async() => {
    
    if(this.state.agree && this.state.terms){
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
else{
  alert("Please check T & C")
}
  }
  googlelogin = async() => {
    
    // console.log("yse")
    if(this.state.agree && this.state.terms){
    const { idToken } = await GoogleSignin.signIn();
    this.setState({isLoading:true})
  console.log("idtoken")
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(googleCredential)
    auth().signInWithCredential(googleCredential)
    .then(() => {
      console.log('User signed in!');
      new SideMenu().datavalue()
      this.setState({isLoading:false})
      this.props.navigation.navigate('Home')
    })
    .catch(error =>{
        console.log(error);
        alert(error)
        this.setState({isLoading:false})
    })
  }
  else{
    alert("Please check T & C")
  }
  }
  render() {
    return (
      <SafeAreaView >
        <ScrollView style = {{backgroundColor:"white"}}>
          <View style = {styles.mainview}>
            <Modal 
              transparent={true} 
              animationType="none" 
              visible={this.state.isLoading}
            >
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
                    backgroundColor: "white",
                    borderRadius: 13
                  }}
                >
                  <ActivityIndicator animating={this.state.isLoading} color="black" size="large" />
                  <Text style={{ color: "black" }}>Loading ...</Text>
                </View>
              </View>
            </Modal>
            <View style = {styles.maintextview}>       
              <Text style = {styles.mainText}>Sign-Up</Text>
              <View style = {styles.loginbtnview}>
                <Text style = {styles.textdes}>Already have a MoneyNest account? </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                  <Text style = {styles.logintext}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style = {styles.formbtn}>
              <TouchableOpacity 
                style = {this.state.external?[styles.externalbtn, {borderColor: "blue"}]:[styles.externalbtn, {borderColor: "gray"}]} 
                onPress = {()=>{this.setState({external:true})}}>
                <Text style = {styles.externalbtntext}>External</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style = {!this.state.external?[styles.externalbtn,      
                {borderColor: "blue"}]:[styles.externalbtn, {borderColor: "gray"}]} 
                onPress = {()=>{this.setState({external:false})}}>
                <Text style = {styles.emailbtntext}>Email</Text>
              </TouchableOpacity>
            </View>
              {this.state.external?
              <View>
                <View style = {styles.agreeview}>
                  <TouchableOpacity onPress = {()=>{this.Agreefunc()}}>
                    {this.state.agree?
                    <Image
                      style={styles.imagebtn}
                      source={require('../img/checked-checkbox.png')}
                    />:
                    <Image
                      style={styles.imagebtn}
                      source={require('../img/empty-square.png')}
                    />}
                  </TouchableOpacity>
                  <Text style = {{marginLeft:5, marginRight: 20}}>
                    I agree to let MoneyNest store and maintain the information I provide 
                    (e.g. login credential, savedwork) in order to provide and improve service. To witdraw consent, you may delete your account at any time.
                  </Text>
                </View>
                <View style = {styles.agreeview}>
                  <TouchableOpacity onPress = {()=>{this.termsfunc()}}>
                    {this.state.terms?
                    <Image
                      style={styles.imagebtn}
                      source={require('../img/checked-checkbox.png')}
                    />:
                    <Image
                      style={styles.imagebtn}
                      source={require('../img/empty-square.png')}
                    />}
                  </TouchableOpacity>
                  <Text style = {{marginLeft:5, marginRight: 20}}>
                    <Text> I have read, understand, and accept the </Text>
                    <Text style = {styles.lernmore}>Terms of Service </Text>
                    <Text>and </Text>
                    <Text style = {styles.lernmore}>Privacy Policy </Text>
                    <Text>.</Text>          
                  </Text>
                </View>
                <TouchableOpacity onPress = {()=>{this.googlelogin()}} >
                  <View style = {this.state.agree && this.state.terms?styles.googlelogin:styles.googlelogin1}>
                    <Image
                      style={styles.imagebtn}
                      source={require('../img/googleicon.png')}
                    />
                    <View>
                      <Text style = {this.state.agree && this.state.terms?styles.googlelogintxt:styles.googlelogin1txt} >Please consent above to sign up with Google
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>{this.applelogin()}} >
                  <View style = {this.state.agree && this.state.terms?styles.googlelogin:styles.googlelogin1}>
                    <Image
                      style={styles.imagebtn}
                      source={require('../img/appleicon.png')}
                    />
                    <View>
                      <Text style = {this.state.agree && this.state.terms?styles.googlelogintxt:styles.googlelogin1txt} >Please consent above to sign up with Apple</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>:
              <View style = {{padding:15}}>
                <Text>Email</Text>
                <TextInput style = {styles.textinput} onChangeText = {(email)=> this.setState({email})}/>
                <Text style = {{marginTop : 8}}>Password</Text>
                <TextInput style = {styles.textinput} onChangeText = {(password)=> this.setState({password})} secureTextEntry/>
                <Text style = {{marginTop : 8}}>Confirm Password</Text>
                <TextInput style = {[styles.textinput, {marginBottom: 15}]} onChangeText = {(cpassword)=> this.setState({cpassword})} secureTextEntry/>
                <TouchableOpacity style = {styles.loginbtn} onPress = {()=> this.signup()}>
                  <Text style = {styles.loginbtntxt}>Sign up</Text>
                </TouchableOpacity>
              </View>
              }
              <View style = {styles.noteview}>
                <Text>
                  <Text style = {{fontWeight:'bold'}}>Note:</Text>
                  <Text> MoneyNest uses cookies to enable persistense when you are signedin.
                If  you do not wish to use cookies, please use MoneyNest without logging in. 
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
 