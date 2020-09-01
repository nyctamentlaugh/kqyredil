import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Home from './../src/Home';
// import Intro from './src/Intro';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
const Tabs = AnimatedTabBarNavigator();
export default () => {
  return (
<Tabs.Navigator
    tabBarOptions={{
      activeTintColor: "#2F7C63",
      inactiveTintColor: "#222222"
    }}
  >
    <Tabs.Screen name="Home" component={Home} />
  </Tabs.Navigator>
  )
  
}