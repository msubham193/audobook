/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {moderateScale, verticalScale} from '../utils/metrics';

const {width} = Dimensions.get('window');

// Banner component for new releases
const NewReleaseBanner = ({data}: {data: any}) => {
  // Shared value for animation
  const gradientShift = useSharedValue(0);

  // Animated style for gradient background
  const animatedGradientStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, {
        duration: 4000,
        easing: Easing.linear,
      }),
    };
  });

  // Animating gradient color shift
  React.useEffect(() => {
    gradientShift.value = withTiming(1, {
      duration: 6000,
      easing: Easing.inOut(Easing.ease),
      loop: true,
    });
  }, [gradientShift]);

  return (
    <Animated.View style={[styles.container, animatedGradientStyle]}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        <Image source={{uri: data[0]?.image}} style={styles.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.newReleaseText}>New Release</Text>
          <Text style={styles.bookTitle}>{data?.title}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - moderateScale(32),
    height: verticalScale(180),
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(16),
    marginTop: verticalScale(20),
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  textWrapper: {
    position: 'absolute',
    bottom: verticalScale(15),
    left: moderateScale(10),
    right: moderateScale(10),
  },
  newReleaseText: {
    fontSize: moderateScale(14),
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: moderateScale(6),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(5),
  },
  bookTitle: {
    fontSize: moderateScale(16),
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    marginTop: verticalScale(5),
  },
});

export default NewReleaseBanner;
