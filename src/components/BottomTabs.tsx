import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import AuthScreen from '../screens/AuthScreen';

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        // options={{
        //   headerShown: false,
        // }}

        name="Hom"
        component={Home}
      />
      <Tab.Screen
        name="Auth"
        options={{
          headerShown: false,
        }}
        component={AuthScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
