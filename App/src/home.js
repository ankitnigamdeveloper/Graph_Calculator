import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';
import {
    View, 
    Image ,
    TouchableOpacity,
    ScrollView,
    Modal,
    Text,
    FlatList, 
    TextInput,
    ActivityIndicator
} from 'react-native';
import { Grid,LineChart, BarChart, XAxis, YAxis} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import styles from '../style/homestyle'
import moment from "moment";
import firestore from '@react-native-firebase/firestore'
import { Picker } from "@react-native-picker/picker"
import SideMenu from './SideMenu'

var tt = new Date()

class Home extends Component {
    constructor(props){
      super(props);
      this.abc = this.abc.bind(this);
      this.state = {
        rate:"30",
        time:"5",
        ntimes:"12",
        InitialValue:"1000",
        invest:"300",
        name:"New Calculation",
        total:0,
        profit:0,
        contribution:0,
        listData:{},
        update:false,
        linechart:false,
        isLoding:false,
        modalVisible: false ,
        data : [],
        KeyArray:[],
        user : {},
      }
      
    }
    
    abc = () => {
      alert("Hello World");
    }
    
    componentDidMount(){
      new SideMenu().datavalue()
        const user = auth().currentUser;
        this.calculation()
      if(user){
        firestore()
        .collection(user.uid).orderBy("timestamp", "desc").get().then((abc) => {
        const docs = abc._docs
        global.data = docs
        });
      
      }
      global.update=()=>{
        if(global.isSelected){
          this.calculation1()
        }else{
          this.setState({InitialValue:"1000"})
          this.setState({invest:"300"})
          this.setState({ntimes:"12"})
          this.setState({time:"5"})
          this.setState({rate:"30"})
          this.setState({name: "New calculation"})
          this.setState({modalVisible:true})
          this.calculation()
        }
      }
         
    }
 
    calculation1 = () =>{
      const user = auth().currentUser;
      this.setState({isLoding:true})
      firestore()
        .collection(user.uid).orderBy("timestamp", "desc").get().then((abc) => {
        const docs = abc._docs
        // console.log(docs[0])
        if(docs.length>0){
          var i = global.Index
          var InitialValue = parseInt(docs[i]._data.Initial)
          const years = parseInt(docs[i]._data.time)
          const investment = parseInt(docs[i]._data.invest)
          const monthlyRate = parseInt(docs[i]._data.rate)
          const name = docs[i]._data.name
          var n = parseInt(docs[i]._data.n)
          this.setState({name:name})
          this.setState({invest:investment.toString()})
          this.setState({InitialValue:InitialValue.toString()})
          this.setState({ntimes:n.toString()})
          this.setState({rate:monthlyRate.toString()})
          this.setState({time:years.toString()})
          var r = monthlyRate / 100
          var FV = 0
          var CI = 0
          var newArray = []
          for (var i = 0; i <= years; i++ ) {
            CI = ( InitialValue ) * (Math.pow(1 + (monthlyRate / (100 * n)), i * n  ) );
            FV = investment *  ((Math.pow(1 + (monthlyRate / (100 * n)), i * n  ) -1) / (r/n))
            var total = FV + CI
            var contribution = InitialValue + (investment * n * i)
            var profit = total - (InitialValue + (investment * n * i))
            var dict = { 
              value: profit,
              date: moment(tt).add(i ,'year'),
              total:total, 
              contribution:contribution
            }
            newArray.push(dict)

          }
          this.setState({data:newArray})
          this.setState({total:total})
          this.setState({contribution:contribution})
          this.setState({profit:profit})
          console.log(this.state.InitialValue)
          console.log(this.state.invest)
          console.log(docs.length)
          
        }else{
          console.log("empty")
        }
        this.setState({isLoding:false})
      })
      
    }

    calculation = () =>{
      this.setState({isLoding:true})
      var InitialValue = parseInt(this.state.InitialValue)
      const years = parseInt(this.state.time)
      const investment = parseInt(this.state.invest)
      const monthlyRate = parseInt(this.state.rate)
      var n = parseInt(this.state.ntimes)
      var r = monthlyRate / 100
      var FV = 0
      var CI = 0
      var newArray = []
      for (var i = 0; i <= years; i++ ) {
        CI = ( InitialValue ) * (Math.pow(1 + (monthlyRate / (100 * n)), i * n  ) );
        FV = investment *  ((Math.pow(1 + (monthlyRate / (100 * n)), i * n  ) -1) / (r/n))
        var total = FV + CI
        // console.log(total)
        var contribution = InitialValue + (investment * n * i)
        // console.log(contribution)
        var profit = total - (InitialValue + (investment * n * i))
        // console.log(profit)
        var dict = { 
          value: profit,
          date: moment(tt).add(i,'year'),
          total:total, 
          contribution:contribution
        }
        newArray.push(dict)

      }
      this.setState({data:newArray})
      this.setState({total:total})
      this.setState({contribution:contribution})
      this.setState({profit:profit})
      this.setState({isLoding:false})
    }
    review = () =>{
      this.setState({modalVisible: false})
      // this.setState({update:true})
      this.calculation()
    
    } 
   
    save = () =>{
      this.setState({modalVisible: false})
      const user = auth().currentUser;
      // this.setState({update:true})
      if(user){
        this.calculation()
        this.setState({isLoding:true})
        if(global.isSelected == false){
          firestore()
            .collection(user.uid)
            .add({
              name: this.state.name,
              Initial: this.state.InitialValue,
              invest: this.state.invest,
              rate:this.state.rate,
              time:this.state.time,
              timestamp: new Date(),
              n:this.state.ntimes,
            })
            .then(() => {
              console.log('User added!');
              this.setState({isLoding:false})
            });
          }
        else{
          this.setState({isLoding:true})
          const user = auth().currentUser;
          // firestore().collection(user.uid).orderBy("timestamp", "desc").onSnapshot((querySnapshot)=>{
            var id = ""
            firestore()
            .collection(user.uid).get().then((abc) => {
              // alert("User Added Successfully");
            id = abc._docs[global.Index].id
            firestore()
              .collection(user.uid)
              .doc(id)
              .set({
                name: this.state.name,
                Initial: this.state.InitialValue,
                invest: this.state.invest,
                rate:this.state.rate,
                time:this.state.time,
                n:this.state.ntimes,
                timestamp: new Date(),
              })
              .then(() => {
                console.log('User updated!');
                this.setState({isLoding:false})
              });
            })
          }
   
        new SideMenu().datavalue()
      }else{
        alert("for save your graphs login/ signup first")
      }
    }
    render() {
      const xAxisHeight = 35;
      const verticalContentInset = { top: 10, bottom: 10 };

      return (
        <ScrollView>
          <View style={styles.mainview}>
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
            <View style = {styles.header}>
              <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} style =  {styles.menubtnview}>
                <Image  source={require('../img/menu.png')} style = {styles.menubtn}></Image>
              </TouchableOpacity>
          
              <Text style = {styles.headertext}>{this.state.name}</Text>
              <TouchableOpacity onPress = {() => this.setState({modalVisible:true})}>
                <Image  source={require('../img/job.png')} style = {styles.menubtn}></Image>
              </TouchableOpacity>
            </View>
            <View style = {{backgroundColor:"dodgerblue"}}>
              <View style = {styles.priceview}>
                <Text style = {styles.txt}>Total</Text>
                <Text style = {styles.txt}>${parseFloat(this.state.total).toFixed(2)}</Text>
              </View>
              <View style = {styles.priceview}>
                <Text style = {styles.txt}>Contribution</Text>
                <Text style = {styles.txt}>${parseFloat(this.state.contribution).toFixed(2)}</Text>
              </View>
              <View style = {styles.priceview}>
                <Text style = {styles.txt}>Profit</Text>
                <Text style = {styles.txt}>${parseFloat(this.state.profit).toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.graphview}>
              <YAxis
                style={{ marginBottom: xAxisHeight }}
                data={this.state.data}
                contentInset={verticalContentInset}
                yAccessor={({ item }) => item.value}
                xAccessor={({ item }) => item.date}
                svg={{
                  fill: "black"
                }}
                numberOfTicks={5}
                formatLabel={value => `$ ${value} `}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                {this.state.linechart?
                
                <LineChart
                  style={{ flex: 1 }}
                  data={this.state.data}
                  contentInset={verticalContentInset}
                  yAccessor={({ item }) => item.value}
                  xAccessor={({ item }) => item.date}
                  svg={{
                  // stroke: "#81B0C0",
                    stroke:"dodgerblue",
                  }}
                  scale={scale.scaleTime}
                  numberOfTicks={10}
                >
                <Grid belowChart={true} />
                </LineChart>:
    
                <BarChart
                  style={{ flex: 1 }}
                  data={this.state.data}
                  contentInset={verticalContentInset}
                  yAccessor={({ item }) => item.value}
                  xAccessor={({ item }) => item.date}
                  svg={{
                    fill: "dodgerblue",

                // fill : 'rgb(134, 65, 244)'
                  }}
                  scale={scale.scaleTime}
                  numberOfTicks={10}
                >
                <Grid belowChart={true} />
              </BarChart>
              }
              <XAxis
                data={this.state.data}
                svg={{
                  fill: "black",
                  fontSize: 8,
                  fontWeight: "bold",
                  rotation: 20,
                  originY: 30,
                  y: 5
                }}
                xAccessor={({ item }) => item.date}
                scale={scale.scaleTime}
                numberOfTicks={10}
                style={{ marginHorizontal: -10, height: xAxisHeight }}
                contentInset={verticalContentInset}
                formatLabel={value => moment(value).format("DD-MM-yyyy")}
              />
            </View>
          </View>
          <View style = {[styles.priceview,{backgroundColor:"lightgray"}]}>
            <Text style = {styles.txt}>Period</Text>
            <Text style = {styles.txt}>End Balance</Text>
          </View>
          <ScrollView horizontal={true}>
            <FlatList
              nestedScrollEnabled
              style={{marginBottom:20}}
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => 
              <View style = {[styles.flatlistview,index%2==0?{backgroundColor:"white"}:{backgroundColor:"lightgray"}]}>
                <View style = {[styles.priceview,]}>
                  <Text>Year {index}</Text>
                  <View>
                    <Text style = {{textAlign:"right"}}>${parseFloat(item.total).toFixed(2)}</Text>
                    <Text style = {{textAlign:"right", color:"dodgerblue"}}>${parseFloat(item.value).toFixed(2)}</Text>
                    <Text  style = {{textAlign:"right", color:"lawngreen"}}>${parseFloat(item.contribution).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            }
          />
        </ScrollView>
        <Modal
          animationType="slid"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
            this.setState({modalVisible:false})
          }}
        >
          <ScrollView horiztonal>
            <View style = {{flexDirection:"row", alignItems:"flex-start",   justifyContent:"center"}}>
              <View style={[styles.popupView,{borderBottomColor:"lightgray", borderBottomWidth:1}]}>
                <Text style = {[styles.text2,{textAlign:"center"}]}>Display</Text>
                <View style = {styles.popupbutton}>
                  <TouchableOpacity style = {[styles.abtn1,this.state.linechart?{backgroundColor:"white"}:{backgroundColor:"dodgerblue"}]}
                  onPress = {()=>this.setState({linechart:false})}
                  >
                    <Text style = {[styles.text,this.state.linechart?{color:"black"}:{color:"white"}]}>Bar Chart</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {[styles.abtn2,this.state.linechart?{backgroundColor:"dodgerblue"}:{backgroundColor:"white"}]}
                    onPress = {()=>this.setState({linechart:true})}
                    >
                    <Text  style = {[styles.text2,this.state.linechart?{color:"white"}:{color:"black"}]}>Line Chart</Text>
                  </TouchableOpacity>
                </View>

                <View style = {styles.line}></View>
                  <Text style = {styles.text1}> Name </Text>
                  <TextInput style = {styles.textinp1}
                    value = {this.state.name}
                    placeholder = {" name"}
                    onChangeText = {(text) => this.setState({name:text})}
                  />

                  <Text> Initial Ammount ($)</Text>
                  <TextInput style = {styles.textinp}
                    placeholder = {" initial ammount"}
                    onChangeText = {(text) => this.setState({InitialValue:text})}
                    keyboardType={'numeric'}
                    value = {this.state.InitialValue}
                  />
                  
                  <Text> Annual Return (%)</Text>
                  <TextInput style = {styles.textinp1}
                    placeholder = {"rate"}
                    value = {this.state.rate.toString()}
                    keyboardType={'numeric'}
                    onChangeText = {(text) => this.setState({rate:text})}
                  />
                  
                  <Text>Time Duration (Year) </Text>
                  <TextInput style = {styles.textinp1}
                    value = {this.state.time}
                    placeholder = {" time"}
                    onChangeText = {(text) => this.setState({time:text})}
                    keyboardType={'numeric'}
                  />
                  <Text>Addition ($)</Text>
                  <TextInput style = {styles.textinp}
                    placeholder = {" invest"}
                    value = {this.state.invest}
                    keyboardType={'numeric'}
                    onChangeText = {(text) => this.setState({invest:text})}
                  />
                  <Text>Compound & Contribute</Text>
                  <View style = {[styles.textinp,{justifyContent:"center", paddingLeft:0}]}>
                    <Picker
                      style={{flex:1, marginHorizontal:-10}}
                      selectedValue={this.state.ntimes}
                      itemStyle = {{textColor:"red"}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ntimes:itemValue})
                      }
                    >
                      <Picker.Item label="Annually (Once a year)" value="1" />
                      <Picker.Item label="Half yearly (2 times a year)" value="2" />
                      <Picker.Item label="Quarterly (4 times a year)" value="4" />
                      <Picker.Item label="Monthly(12 times a year)" value="12" />
                      <Picker.Item label="Weekly (52 times a year)" value="52" />
                      <Picker.Item label="Daily (365 times a year)" value="365" />
                    </Picker>
                  </View>
                    <View style = {styles.popupbutton}>
                      <TouchableOpacity style = {[styles.abtn1,this.state.linechart?{backgroundColor:"white"}:{backgroundColor:"dodgerblue"}]}
                      onPress={() => this.review()}>
                        <Text style = {[styles.text,this.state.linechart?{color:"black"}:{color:"white"}]}>Review</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style = {[styles.abtn2,this.state.linechart?{backgroundColor:"dodgerblue"}:{backgroundColor:"white"}]} onPress={() => this.save()}>
                        <Text style = {[styles.text2,this.state.linechart?{color:"white"}:{color:"black"}]}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style = {styles.triangle}>
                  </View>
                </View>
              </ScrollView>
              </Modal>
          </View>
        </ScrollView>
      );
    }
  }
export default Home