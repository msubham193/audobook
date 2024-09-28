/* eslint-disable react-native/no-inline-styles */
import {Dimensions, SafeAreaView, StatusBar, Text, View} from 'react-native';
import React from 'react';



import data from './src/data/data';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Navigation from './src/navigation/Navigation';

const App = () => {
  const isCarousel = React.useRef(null);
  const width = Dimensions.get('window').width;
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;
