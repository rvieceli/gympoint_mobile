import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image } from 'react-native';
import StartUp from './pages/StartUp';
import SignIn from './pages/SignIn';
import CheckIn from './pages/CheckIn';
import Help from './pages/Help';
import NewHelp from './pages/NewHelp';
import ShowHelp from './pages/ShowHelp';

import logo from './assets/header_logo.png';

const header = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerLayoutPreset: 'center',
    headerTitle: () => <Image source={logo} />,
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
    headerBackImage: <Icon name="chevron-left" size={24} />,
  },
};

const CheckInRoutes = createStackNavigator(
  {
    CheckIn,
  },
  {
    ...header,
    navigationOptions: {
      tabBarLabel: 'Check-ins',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="edit-location" size={20} color={tintColor} />
      ),
    },
  }
);

const HelpRoutes = createStackNavigator(
  {
    Help,
    NewHelp,
    ShowHelp,
  },
  {
    ...header,
    navigationOptions: {
      tabBarLabel: 'Pedir ajuda',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="live-help" size={20} color={tintColor} />
      ),
    },
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      SignIn: createSwitchNavigator({
        StartUp,
        SignIn,
      }),
      App: createBottomTabNavigator(
        {
          CheckIn: CheckInRoutes,
          Help: HelpRoutes,
        },
        {
          tabBarOptions: {
            keyboardHidesTabBar: true,
            activeTintColor: '#ee4e62',
            inactiveTintColor: '#999',
            style: {
              backgroundColor: '#fff',
            },
          },
        }
      ),
    },
    {
      initialRouteName: 'SignIn',
    }
  )
);
