import React, {Component} from 'react';
import { 
    TouchableOpacity,
    Text,  
    View,  
    ScrollView,
    Image ,
    FlatList,
    Modal,
    ActivityIndicator
  } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import {DrawerContentScrollView} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import styles from '../style/sidemenustyle'


// var refresh = false
class SideMenu extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
        user : {},
        data:[],
        refresh:false,
        del:false,
        isLoding:false
    }
    
  }
  
  componentDidMount() {
    this._isMounted = true;
    this.datavalue()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  delete = (index) =>{
    this.setState({del:true})
    this.setState({isLoding:true})
    console.log(index)
    const user = auth().currentUser;
    var id = ""
    firestore()
    .collection(user.uid).orderBy("timestamp", "desc").get().then((abc) => {
      if(abc._docs.length>=index){
        id = abc._docs[index].id
        firestore()
        .collection(user.uid)
        .doc(id)
        .delete().then(() => {
          this.datavalue()
          console.log(index, id);
          this.setState({isLoding:false})
        });
      }
    })
          
  }
  
  clc=()=>{
    // home.abc()
    console.log("clc")
    var InitialValue = 1000
    const years = 5
    const investment = 105
    const monthlyRate = 30
    var n = 12
    var r = monthlyRate / 100
    var future = 0
    var cii = 0
    for (var i = 0; i <= years; i++ ) {
      cii = ( InitialValue ) * (Math.pow(1 + (monthlyRate / (100 * n)), i * n  ) );
      future = investment *  ((Math.pow(1 + (monthlyRate / (100 * n)), i * n  ) -1) / (r/n))
      var ci = future + cii
      console.log(ci)
      console.log(InitialValue + (investment * n * i))
      console.log(ci - (InitialValue + (investment * n * i)))
      }  
  }
  
  datavalue = () =>{
    const user = auth().currentUser;
    if (user) {
      firestore()
      .collection(user.uid).orderBy("timestamp", "desc").get().then((abc) => {
      const docs = abc._docs
      global.data = docs
      
        if(this.state.del){
          this.re()
        }
    
      })
    }else{
      global.data = []
    }

  }
  re = () => {
    this.setState({refresh:true})
    this.setState({del:false})
  }
  call(index){
    global.Index = index
    global.isSelected = true
    this.props.navigation.closeDrawer();
    global.update()
  }
  signout = ()=>{
    auth().signOut()
    .then(() =>
    
      this.props.navigation.navigate("Signup"),
      global.data = []
    )
  }
  createnew(){
    // global.Index = 0
    global.isSelected = false
    this.props.navigation.closeDrawer();
    global.update()
  }
  kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }  
  render() {
    const user = auth().currentUser;
    return (
      <View style={{ flex: 1,  backgroundColor:"black" }}>
        <DrawerContentScrollView {...this.props} >
          <View style={styles.drawerContent}>
            <Modal transparent={true} animationType="none" visible={this.state.isLoding}>
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
                  <ActivityIndicator animating={this.state.isLoding} color="black" size="large" />
                  <Text style={{ color: "black" }}>Loading ...</Text>
                </View>
              </View>
            </Modal>
            <View style={styles.item1}>
            {user?
              <View style = {styles.item1view}>
                
                <Text style = {styles.emailtext}>Email: {user.email}</Text>

                <TouchableOpacity onPress = {()=>  this.signout()}>
                  <Text style = {styles.signouttext}>Sign Out</Text>

                </TouchableOpacity>
          
                <Text style = {styles.emailtext}>save your Calculations!</Text>
              </View>:
              <View>
                <View style = {{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", marginBottom:20}}>
                  <TouchableOpacity onPress = {()=> this.props.navigation.navigate("Signup")}>
                    <Text style = {styles.signuptext}>Sign Up</Text>
                  </TouchableOpacity>
                  <Text style = {styles.text}>or</Text>
                  <TouchableOpacity onPress = {()=> this.props.navigation.navigate("Login")}>
                    <Text style = {styles.logintext}>Log In</Text>
                  </TouchableOpacity>
                </View>
                <Text style = {styles.emailtext}>to save your Calculations!</Text>
              </View> 
            }
            </View>
            <View style = {styles.menuitem2}>
              <TouchableOpacity style = {styles.menuitem2view} onPress = {this.createnew.bind(this)}>
                <Image  source={require('../img/pluswhite.png')} style = {styles.menubtn}></Image>
                <Text style = {styles.text}>New Calculation</Text>
              </TouchableOpacity>
            </View> 
            <View style = {{flexDirection:"row", alignItems:"center"}}>
              <Text style = {styles.text1}>Your Calculations</Text>
              <View style = {styles.line}></View>
            </View>
          </View>
          <View>
            <ScrollView horizontal>
              <FlatList
              // scrollEnabled={false}
                style={styles.flatlists}
                extraData={global}
                data={global.data}
                refresh = {this.state.refresh}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => 
                  <TouchableOpacity onPress = {this.call.bind(this, index)}>
                  <View style={styles.view}>
                    <View style={styles.view1}>
                      <Text style={styles.text}>{item._data.name}</Text>
                      <Text style = {styles.text2}>${this.kFormatter(item._data.Initial)} saved, ${item._data.invest} X {item._data.n}, {item._data.time}yrs, {item._data.n}%</Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress = {()=>{this.delete(index)}}>
                        <Image source={require("../img/delete.png")} style={styles.image}></Image>
                      </TouchableOpacity>
                    </View>
                </View>
              </TouchableOpacity>
              }
            />
          </ScrollView>
        </View>
      </DrawerContentScrollView>
    </View>
  );
 }
}


export default SideMenu;