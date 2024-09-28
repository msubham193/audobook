import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import SpalshScreen from '../screens/SpalshScreen';
import AuthScreen from '../screens/AuthScreen';
import {SafeAreaView} from 'react-native';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    // <SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Spalsh">
        <Stack.Screen
          name="Spalsh"
          options={{headerShown: false}}
          component={SpalshScreen}
        />

        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />

        <Stack.Screen
          name="Auth"
          options={{headerShown: false}}
          component={AuthScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaView>
  );
};

export default Navigation;
