import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Layout from '../screens/Layout';
import {StatusBar} from 'react-native';
import {primary_color} from '../utils/colors';
import AudioBookDetails from '../screens/AudioBookDetails';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    // <SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Layout"
          options={{headerShown: false}}
          component={Layout}
        />
        <Stack.Screen
          name="AudioBookDetails"
          options={{headerShown: false}}
          component={AudioBookDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaView>
  );
};

export default Navigation;
