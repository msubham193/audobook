import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {text_accent_primary, text_accent_tertiary} from '../utils/colors';
import {horizontalScale, moderateScale, verticalScale} from '../utils/metrics';

const Greeting = ({name}: {name: string}) => (
  <View style={styles.greetingContainer}>
    <View style={styles.greetingTextContainer}>
      <Text style={styles.greetingText}>Good evening,</Text>
      <Text style={styles.greetingName}>{name}</Text>
    </View>
    <Text style={styles.subText}>Ready to dive into a great listen?</Text>
  </View>
);

const styles = StyleSheet.create({
  greetingContainer: {
    marginTop: verticalScale(15),
    paddingHorizontal: horizontalScale(16),
  },
  greetingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  greetingText: {
    color: text_accent_tertiary,
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(14),
  },
  greetingName: {
    color: '#FF204E',
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(14),
  },
  subText: {
    fontFamily: 'Poppins-Light',
    color: text_accent_primary,
  },
});

export default Greeting;
