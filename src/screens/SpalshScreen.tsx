import React, {useEffect} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import Animated, {Easing, Keyframe} from 'react-native-reanimated';
import {moderateScale, verticalScale} from '../utils/metrics';
import {primary_color} from '../utils/colors';
import {NavigationProp} from '@react-navigation/native';
import {useCountryStore} from '../zustand/store';

interface SplashScreenProps {
  navigation: NavigationProp<any>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  // Animation for the text
  const {countries, fetchCountry} = useCountryStore();

  const enteringAnimation = new Keyframe({
    0: {
      opacity: 0,
      transform: [
        {translateY: 0},
        {rotate: '0deg'},
        {skewX: '0deg'},
        {scale: 1},
      ],
    },
    50: {
      opacity: 0.5,
      transform: [
        {translateY: 0},
        {rotate: '0deg'},
        {skewX: '30deg'},
        {scale: 1},
      ],
      easing: Easing.out(Easing.quad),
    },
    100: {
      opacity: 1,
      transform: [
        {translateY: 0},
        {rotate: '0deg'},
        {skewX: '0deg'},
        {scale: 1},
      ],
    },
  }).duration(1000);

  // Navigate to Home after 3 seconds
  useEffect(() => {
    fetchCountry();
    const timer = setTimeout(() => {
      navigation.navigate('Auth');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [fetchCountry, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={primary_color} />

      <Animated.Text entering={enteringAnimation} style={styles.logoText}>
        AudoBook
      </Animated.Text>

      <Text style={styles.subtitle}>Books Reimagined with AI.</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary_color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: moderateScale(27),
    color: '#FF204E',
    fontFamily: 'Poppins-BoldItalic',
  },
  subtitle: {
    fontSize: 15,
    color: '#fff',
    marginTop: verticalScale(5),
    fontFamily: 'Poppins-Regular',
  },
});
