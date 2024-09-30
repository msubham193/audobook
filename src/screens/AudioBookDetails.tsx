/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {primary_color} from '../utils/colors';

const AudioBookDetails = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: primary_color,
      }}>
      <Text>SUBHAM MISHRA</Text>
    </SafeAreaView>
  );
};

export default AudioBookDetails;
