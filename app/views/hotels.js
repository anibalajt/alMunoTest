import React, { Component } from 'react';
import {BackHandler,Platform, Text, View, StyleSheet, Image,TouchableHighlight,TouchableWithoutFeedback,TextInput,ListView } from 'react-native';
import Dimensions from 'Dimensions';
import {Actions} from "react-native-router-flux";
import Request from '../request'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let listener = null
let backButtonPressFunction = () => Actions.pop()
class Hotels extends Component {
  static defaultProps = {
    data: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      offset:0,
      hotels:false
    };
  }
  componentWillMount(){

  }

  _getHotels(){

    let self = this;
    const {data} = this.props
    data.offset = this.state.offset
    this.setState({data})
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    Request.apiHotels(data,function(d){
      let hotels = (self.state.hotels.length>0)?self.state.hotels : [];
      hotels = hotels.concat(d.hotels);
      self.setState({
        hotels: hotels,
        dataSource: ds.cloneWithRows(hotels),
        pagination: d.pagination
      })
    })

  }
  componentDidMount(){
    if (Platform.OS == "android" && listener == null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        return backButtonPressFunction()
      })
    }
    this._getHotels();
  }
  _start(start){
    var st = []
    for (var i = 0; i < start; i++) {
      st.push(<Image key={i} style={{width:10,height:10,marginRight:5,resizeMode: 'cover'}} source={require(`../assets/estrella.png`)}/>)
    }
    return st
  }
  _getHotel(item){
    let hotel = this.state.data
    hotel.city = item.id
    hotel.rooms= '2';
    Actions.Hotel({hotel,title:item.name})
  }
  _item(item){
    if(!item){
      return null
    }
    return (
      <TouchableWithoutFeedback
        onPress={ this._getHotel.bind(this,item) } >
        <View style={styles.contentInfoHotel}>
          <View style={styles.imgHotel}>
            {
              item.images?
              <Image style={{flex:1,resizeMode: 'cover',height:undefined}} source={{uri: `https:${item.images[0].url}`}}/>
              :null
            }
          </View>
          <View style={styles.InfoHotel}>
            <Text style={styles.nameHotel}> {item.name} </Text>
            <View style={{flexDirection:'row'}}>
              {
                this._start(item.stars)
              }
            </View>
            <Text style={styles.meal_plan}>{item.rate.meal_plan.description}</Text>
            <Text style={styles.price}>Precio por noche COP {item.rate.price.price_per_night_per_room}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {
          (this.state.hotels && this.state.hotels.length > 0)?
          <ListView

            initialListSize={10}
            removeClippedSubviews={false}
            initialListSize={9}
            dataSource={this.state.dataSource} renderRow={(item) => this._item(item) }
            renderFooter={() =>
              <View><Text>Cargar mas hoteles</Text></View>
            }
            onEndReached={() =>{
              var offset = this.state.offset + 20
              this.setState({offset: offset});
              this._getHotels();
            }}
          />
          :
          <Text>Loading...</Text>
        }
      </View>
    )
  }

}

let styles = StyleSheet.create({
  contentInfoHotel:{
    flex:1,
    height:120,
    backgroundColor:'#fff',
    marginVertical:5,
    marginHorizontal:10,
    flexDirection:'row'
  },
  InfoHotel:{
    flex:1
  },
  nameHotel:{
    fontSize:14,
    fontWeight:'bold'
  },
  meal_plan:{
    fontSize:10
  },
  price:{
    fontSize:12
  },
  imgHotel:{
    width:100,
    marginRight:10,
  },
  container: {
    flex:1
  },

});
export default Hotels;
