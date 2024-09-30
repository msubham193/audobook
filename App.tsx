/* eslint-disable react-native/no-inline-styles */

import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Navigation from './src/navigation/Navigation';
import BottomTabs from './src/components/BottomTabs';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {primary_color} from './src/utils/colors';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;
