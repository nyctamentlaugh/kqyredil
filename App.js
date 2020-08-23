import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/Home';
import Intro from './src/Intro';
import FindNearest from './components/Geolocation/FindNearest'

const navigator = createStackNavigator(
  {
    Intro: Intro,
    Home: Home,
    FindNearest: FindNearest
  },
  {
    initialRouteName: "Intro",
    defaultNavigationOptions: {
      title: "App",
      gestureEnabled: false
    },
    headerMode: "none"
  }
)

export default createAppContainer(navigator);