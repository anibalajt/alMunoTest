import React, { Component } from 'react';
import { Text, View, ToastAndroid } from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';

import Home from './views/home';
import Hotels from './views/hotels';
import Hotel from './views/hotel';

export default class Index extends Component {
  render() {
    return (
      <Router>
        <Scene key="root"  duration={1}>
          <Scene key="Home" hideNavBar hideTabBar component={Home} title="Home"  initial={true}/>
          <Scene key="Hotels" component={Hotels} title="Hoteles"/>
          <Scene key="Hotel" component={Hotel} title="Hotel"/>
        </Scene>
      </Router>
    )
  }
}
