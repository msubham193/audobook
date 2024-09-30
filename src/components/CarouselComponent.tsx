import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Dimensions} from 'react-native';
import {moderateScale, verticalScale} from '../utils/metrics';

// Define screen dimensions
const {width: screenWidth} = Dimensions.get('window');

interface CarouselProps {
  data: any[];
  height?: number;
  width?: number;
  autoPlay?: boolean;
  loop?: boolean;
  scrollDuration?: number;
  parallax?: boolean;
  customStyle?: any;
}

const CarouselComponent: React.FC<CarouselProps> = ({
  data,
  height,
  width = screenWidth, // default width
  autoPlay = false,
  loop = true,
  scrollDuration = 2000,
  parallax = true,
  customStyle,
}) => {
  const computedHeight = height ?? width / 2; // Calculate height based on width if not provided

  return (
    <View style={[styles.carouselContainer, customStyle]}>
      <Carousel
        loop={loop}
        width={width}
        height={computedHeight}
        autoPlay={autoPlay}
        scrollAnimationDuration={scrollDuration}
        pagingEnabled={true}
        mode={parallax ? 'parallax' : undefined}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={data}
        renderItem={({index}) => (
          <Image
            source={{
              uri: data[index],
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

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: verticalScale(20),
  },
  carouselItem: {
    height: '100%',
    width: '100%',
    borderRadius: moderateScale(10),
  },
});

export default CarouselComponent;
