/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Example for Ionicons
import AuthScreen from './AuthScreen';
import Home from './Home';
import {secondary_color, tertiary_color} from '../utils/colors';
import {moderateScale, verticalScale} from '../utils/metrics';

// Define the types for Tab navigation routes
type TabParamList = {
  Home: undefined;
  Premium: undefined;
  Library: undefined;
  Notifications: undefined;
};

// Create the bottom tab navigator
const Tab = createBottomTabNavigator<TabParamList>();

const Layout = () => {
  // Helper function to get the icon based on route and focus state
  const getIconName = (routeName: keyof TabParamList, focused: boolean) => {
    switch (routeName) {
      case 'Home':
        return focused ? 'home' : 'home-outline';
      case 'Premium':
        return focused ? 'star' : 'star-outline';
      case 'Library':
        return focused ? 'library' : 'library-outline';
      case 'Notifications':
        return focused ? 'notifications' : 'notifications-outline';
      default:
        return 'home-outline';
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: secondary_color,
          borderColor: secondary_color,
          paddingVertical: verticalScale(7),
          height: verticalScale(53),
        },
        tabBarLabelStyle: {
          fontSize: moderateScale(10),
          fontFamily: 'Poppins-Regular',
        },
        tabBarIcon: ({focused, color}) => (
          <Icon
            name={getIconName(route.name, focused)}
            size={24}
            color={color}
          />
        ),
        tabBarActiveTintColor: tertiary_color,
        tabBarInactiveTintColor: '#bbb',
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? tertiary_color : '#bbb',
              fontSize: moderateScale(11),
              marginTop: verticalScale(5),
              marginBottom: verticalScale(5),
            }}>
            {route.name}
          </Text>
        ),
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Premium" component={AuthScreen} />
      <Tab.Screen name="Library" component={AuthScreen} />
      <Tab.Screen name="Notifications" component={AuthScreen} />
    </Tab.Navigator>
  );
};

export default Layout;
