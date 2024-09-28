import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {MaterialIcons} from '../utils/Icons'; // Assuming you're using MaterialIcons
import {horizontalScale, moderateScale, verticalScale} from '../utils/metrics';

// Define screen dimensions
const {width} = Dimensions.get('window');

interface CustomCarouselProps {
  heading: string;
  data: Array<any>;
  onSeeMorePress?: () => void; // Optional function to handle "See More" press
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  heading,
  data,
  onSeeMorePress,
}) => {
  const baseOptions = {
    vertical: false,
    width: width / 2.4,
    height: width / 2,
    style: {
      width: width,
    },
  } as const;

  return (
    <View style={styles.carouselContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>{heading}</Text>
        {onSeeMorePress && (
          <MaterialIcons
            name="keyboard-arrow-right"
            size={moderateScale(25)}
            color={'#FF204E'}
            onPress={onSeeMorePress}
          />
        )}
      </View>

      {/* Carousel */}
      <Carousel
        {...baseOptions}
        loop
        windowSize={5}
        autoPlay={true}
        scrollAnimationDuration={2000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        data={data}
        renderItem={({index}) => (
          <Image
            source={{
              uri: data[index].imageUrl,
            }}
            resizeMode="cover"
            style={styles.carouselItem}
            key={index}
          />
        )}
      />
    </View>
  );
};

export default CustomCarousel;

// Stylesheet
const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  carouselItem: {
    height: verticalScale(100),
    width: horizontalScale(140),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(18),
    justifyContent: 'center',
  },
});
