import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar from '@gorhom/animated-tabbar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Intro from './src/Intro'
import Home from './src/Home'
import Leaderboard from './src/Leaderboard'
import Settings from './src/Settings'
import HomeIcon from './icons/HomeIcon'
import LeaderboardIcon from './icons/LeaderBoardIcon'
import SettingsIcon from './icons/SettingsIcon'

const tabs = {
  Ballina: { // < Screen name
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: HomeIcon,
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Top: { // < Screen name
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: LeaderboardIcon,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
  Cilësimet: { // < Screen name
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: SettingsIcon,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  }
}

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      IntroShow: true
    }
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ IntroShow: false })}, 1000); 
  };

  render() {
    if (this.state.IntroShow) {
      return <Intro />
    } else {
      return (
        <NavigationContainer>
          <Tab.Navigator
            tabBar={props => (
              <AnimatedTabBar 
                preset="bubble" 
                tabs={tabs} 
                style={{
                  height: hp("10%"),
                }}
                {...props} 
              
              />
            )}
          >
            <Tab.Screen 
              name="Ballina"
              component={Home}
            />

            <Tab.Screen 
              name="Top"
              component={Leaderboard}
            />
{/* 
            <Tab.Screen 
              name="Cilësimet"
              component={Settings}
            /> */}

          </Tab.Navigator>
        </NavigationContainer>
      )
    }
  }
}
