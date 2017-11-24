import React, { Component } from 'react';
import { Text, View, StyleSheet, Image,TouchableHighlight,TouchableWithoutFeedback,TextInput,ListView } from 'react-native';
import Dimensions from 'Dimensions';
import {Actions} from "react-native-router-flux";
import Request from '../request'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img0: require(`../assets/14294549343d1b4-600x400.jpg`),
      img1: require(`../assets/14431182505eb13-600x901.jpg`),
      img2: require(`../assets/1435174412ca2d4.jpg`),
      location:'',
      dataSource: false,
      displayNone:false,
      showCalendar:false,
      dateIn:''
    };
  }

  getLocation(location){
    //buscamos la localizacion del usuario por cada letra que ingresa
    var self = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    Request.apiLocation(location,function(data){
      data = JSON.stringify(data).replace(/<mark>/g, '');
      data = JSON.parse(JSON.stringify(data).replace(/<\/mark>/g, ''));
      data = JSON.parse(data);
      self.setState({
        dataSource: ds.cloneWithRows(data)
      })
    })
  }
  componentDidMount(){
    this.setState({img:this.state['img'+Math.floor(Math.random() * (3 - 0) + 0)]})
  }
  _onChange(location){
    if(location.length == 0){
      this.setState({displayNone:false})
    }else{
      this.getLocation(location);
      this.setState({displayNone:true})
    }
    this.setState({location})

  }
  _selectedLocation(item){
    this.setState({
      displayNone:false,
      location:item.nombre,
      idLocation:item.codigo
    })
  }

  _list(item){
    //lista de coincidencias con el lugar que busca el user
    return(
      <TouchableWithoutFeedback
        onPress={ this._selectedLocation.bind(this,item) } >
        <View style={styles.itemLocation}>
          <Text > {item.nombre} </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  _showCalendar(when){
    //mostrar el calendario
    this.setState({showCalendar:true,dateIn:when})
  }
  _setDate(day){
    //obtenemos el dia a ingresar y salir del hotel
    switch (this.state.dateIn) {
      case 'llego':
      this.setState({llego:day.dateString,showCalendar:false})
      break;
      case 'meVoy':
      this.setState({meVoy:day.dateString,showCalendar:false})
      break;
    }
  }
  _searchHotels(){
    //llamamos una nueva vista y cargamos los hoteles
    const {idLocation, llego, meVoy} = this.state;
    var data = {
      date: `${llego},${meVoy}`,
      city:idLocation
    }
    Actions.Hotels({data})
  }
  render() {
    let self = this;
    return (
      <View style={{ flex: 1}}>
        {
          (this.state.showCalendar)?
          <TouchableWithoutFeedback onPress={ () => { this.setState({showCalendar:false}) } } >
            <View style={styles.contentCalendar}>
              <TouchableWithoutFeedback >
                <View style={{ width: windowWidth*80/100, borderWidth: 1, borderColor: 'gray', height: 350 }}>
                <Calendar
                  onDayPress={(day) => { this._setDate(day)  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        :null
      }

      <Image blurRadius={4} source={this.state.img} style={styles.backgroundImage} />
      <View style={styles.container}>
        {
          (this.state.displayNone)?
          null
          :
          <Text style={[styles.title]}> Buscas un Hotel </Text>
        }
        <View style={[styles.contentInput,{flexDirection:'row'},(this.state.displayNone)?styles.contentAll:null]}>
          <TextInput
            style={[styles.input,{flex:1},(this.state.displayNone)?styles.inputTop:null]}
            value={this.state.location}
            onChangeText={(location) => this._onChange(location)}
            placeholder = "Ingresa una Ciudad"
            placeholderTextColor="#7c8080"
            underlineColorAndroid="transparent"
          />
          {
            this.state.dataSource && this.state.displayNone?
            <ListView
              style={{marginTop:80}}
              removeClippedSubviews={false}
              initialListSize={9}
              dataSource={this.state.dataSource} renderRow={(item) => this._list(item) } />
              :
              null
            }
          </View>
          {
            (this.state.idLocation && !this.state.displayNone)?
            <View style={[styles.contentInput,{flexDirection:'row',height:50,justifyContent:'center'}]}>

              <TouchableHighlight
                style={styles.contentDate}
                onPress={ () => self._showCalendar('llego') }>
                <Text
                  style={styles.date}
                  value={this.state.llego}>
                  {this.state.llego?this.state.llego:'llego el'}
                </Text>

              </TouchableHighlight>

              <TouchableHighlight
                style={styles.contentDate}
                onPress={ self._showCalendar.bind(self,'meVoy') } >
                <Text style={styles.date}
                  value={this.state.meVoy}>
                  {this.state.meVoy?this.state.meVoy:'Me voy el'}
                </Text>

              </TouchableHighlight>

            </View>
            :null
          }

          {
            (this.state.displayNone)?
            null
            :
            <TouchableHighlight
              style={{borderBottomWidth:0.5,borderColor:'#cccccca1'}}
              onPress={this._searchHotels.bind(this) } >
              <View>
                <Text style={styles.btnRegister}> Buscar </Text>
              </View>
            </TouchableHighlight>
          }
        </View>
      </View>
    )
  }

}

let styles = StyleSheet.create({
  contentDate:{
    flex:1,justifyContent:'center',backgroundColor:'#fff'
  },
  date:{
    paddingLeft:10,
    backgroundColor:'#fff',
    borderLeftWidth:0.5,
    borderColor: 'gray',
    padding:0
  },
  displayNone:{
    display:'none',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: undefined,
    height: undefined,
    backgroundColor: '#889DAD',
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentAll:{
    width: windowWidth,
    backgroundColor:'#fff',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentInput:{
    width: windowWidth*80/100,
    borderBottomWidth:0.5,
    borderColor:'#cccccca1'
  },
  inputTop:{
    width: windowWidth,
    position: 'absolute',
    top: 20,
    borderBottomWidth:0.5,
    borderColor:'#cccccca1'
  },
  input:{
    height:50,
    fontSize:16,
    padding:10,
    color:'#000',
    backgroundColor:'rgba(255, 255, 255, 1)',
    flex:1,
    elevation:5
  },
  btnRegister:{
    fontSize:16,
    width: windowWidth*80/100,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
    color:'#000',
    textAlign:'center',
    padding:12,
    backgroundColor:'rgba(255, 255, 255, 1)',
  },
  title:{
    backgroundColor:'transparent',
    color:'#fff',
    fontSize:34,
    marginBottom:10,
    textAlign:'center'
  },
  itemLocation:{
    paddingVertical:10,
    paddingHorizontal:10
  },
  contentCalendar:{
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex:99,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default Home;
