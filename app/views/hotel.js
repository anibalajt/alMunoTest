import React, { Component } from 'react';
import {ScrollView, BackHandler,Platform,Text, View, StyleSheet, Image,TouchableHighlight,TouchableWithoutFeedback,TextInput,ListView } from 'react-native';
import Dimensions from 'Dimensions';
import {Actions} from "react-native-router-flux";
import Request from '../request'
import ImageSlider from 'react-native-image-slider';


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
      hotel:false
    };
  }

  componentWillMount(){

  }

  componentDidMount(){
    if (Platform.OS == "android" && listener == null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        return backButtonPressFunction()
      })
    }
    this._getHotel();
  }

  _getHotel(){
    let self = this;
    Request.apiHotel(this.props.hotel,function(d){

      self.setState({
        hotel:d
      })
    })
  }
  _start(start){
    var st = []
    for (var i = 0; i < start; i++) {
      st.push(<Image key={i} style={{width:10,height:10,marginRight:5,resizeMode: 'cover'}} source={require(`../assets/estrella.png`)}/>)
    }
    return st
  }
  _servicios(amenities){
    var st = []
    for (var i = 0; i < amenities.length; i++) {
      st.push(<Text key={i}>{ amenities[i].description }</Text>)
    }
    return st
  }
  _renderImg(img){
    let url = []
    for (var i = 0; i < img.length; i++) {
      url.push(`https:${img[i].url}`)
    }
    return url;
  }
  _renderTargeta(){
    let hotel = this.state.hotel

    return(
      <View>
        <ImageSlider  images={this._renderImg(hotel.images)}/>
        <View style={styles.targeta}>
          <Text style={styles.title}>{hotel.name}</Text>
          <View style={{flexDirection:'row'}}>
            {
              this._start(hotel.stars)
            }
          </View>
          <Text style={styles.address}>{hotel.address}</Text>
          <Text style={styles.servicios}>Descripción</Text>
          <Text style={styles.description}>{hotel.description}</Text>
          <Text style={styles.servicios}>Servicios</Text>
          {
            this._servicios(hotel.amenities)
          }
        </View>
      </View>
    )
  }
  render() {
    console.log("props ",this.props);
    return (
      <ScrollView>
        <View style={styles.container}>
          {
            this.state.hotel?
            this._renderTargeta()
            :null
          }

        </View>
      </ScrollView>
    )
  }

}

let styles = StyleSheet.create({
  title:{
    fontWeight:'bold',
    fontSize:16
  },
  description:{
    marginVertical:5
  },
  servicios:{
    marginTop:5,
    fontWeight:'bold',
    fontSize:14
  },
  targeta:{
    backgroundColor:'#fff',
    marginHorizontal:5,
    padding:10
  },
  address:{
    fontSize:12
  },
  container: {
    flex:1
  },

});
export default Hotels;
