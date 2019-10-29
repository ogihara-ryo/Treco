import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'

import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import AddScreen from './src/screens/AddScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Setting1Screen from './src/screens/Setting1Screen';
import Setting2Screen from './src/screens/Setting2Screen';

export default function App() {
  const headerNavigationOptions = {
    headerStyle: {
      backgroundColor: 'deepskyblue',
      marginTop: (Platform.OS === 'android' ? 24 : 0)
    },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  };

  const HomeStack = createStackNavigator({
    home: {
      screen: HomeScreen,
      navigationOptions: {
        ...headerNavigationOptions,
        headerTitle: 'Treco',
        headerBackTitle: 'Home'
      }
    },
    detail: {
      screen: DetailScreen,
      navigationOptions: {
        ...headerNavigationOptions,
        headerTitle: 'Detail',
      }
    }
  });
  HomeStack.navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: (navigation.state.index === 0)
    };
  };
  
  const AddStack = createStackNavigator({
    add: {
      screen: AddScreen,
      navigationOptions: {
        header: null
      }
    }
  });
  AddStack.navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: (navigation.state.index === -1)
    };
  };
  
  const ProfileStack = createStackNavigator({
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        ...headerNavigationOptions,
        headerTitle: 'Treco',
        headerBackTitle: 'Profile'
      }
    },
    setting1: {
      screen: Setting1Screen,
      navigationOptions: {
        ...headerNavigationOptions,
        headerTitle: 'Setting 1',
      }
    },
    setting2: {
      screen: Setting2Screen,
      navigationOptions: {
        ...headerNavigationOptions,
        headerTitle: 'Setting 2',
      }
    }
  });
  ProfileStack.navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: (navigation.state.index === 0)
    };
  };
  
  const MainTab = createBottomTabNavigator(
    {
      homeStack: {
        screen: HomeStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height: 25, width: 25, tintColor: tintColor }}
              source={require('./assets/home.png')}
            />
          ),
          title: 'Home'
        }
      },
      addStack: {
        screen: AddStack,
        navigationOptions: {
          tabBarIcon: () => (
            <Image
              style={{ height: 60, width: 60, tintColor: 'deepskyblue' }}
              source={require('./assets/add.png')}
            />
          ),
          title: '',
        }
      },
      profileStack: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height: 25, width: 25, tintColor: tintColor }}
              source={require('./assets/profile.png')}
            />
          ),
          title: 'Profile'
        }
      }
    },
    {
      swipeEnabled: false
    }
  );

  const NavigatorTab = createAppContainer(
    createSwitchNavigator({
      welcome: { screen: WelcomeScreen },
      main: { screen: MainTab }
    })
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigatorTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
