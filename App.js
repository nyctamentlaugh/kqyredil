import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/Home';
import Intro from './src/Intro';

const navigator = createStackNavigator(
  {
    Intro: Intro,
    Home: Home,
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
