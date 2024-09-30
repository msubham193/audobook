import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import {moderateScale, verticalScale} from '../../utils/metrics';
import { tertiary_color } from '../../utils/colors';

// Get the device width
const {width: screenWidth} = Dimensions.get('window');

// Example list of banner images
const banners = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8B7SqXOwy8nKrhB6AlLhL8fnIlphHmcWZiA&sv',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8OewioDG9dsGidqCd7GohGP9pMW-x4_BxZg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8hGIKroGRNJb9PIrCiCstia7pPuyQL6jFeA&s',
];

const BannerCarousel = () => {
  const scrollX = useRef(new Animated.Value(10)).current;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth scrolling function
  const smoothScrollToIndex = (index: number) => {
    flatListRef.current?.scrollToOffset({
      offset: index * screenWidth,
      animated: true,
    });
  };

  // Automatically scroll banners smoothly every 2.5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === banners.length - 1 ? 0 : prevIndex + 1;
        smoothScrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  const handleViewableItemsChanged = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  // Pagination dots
  const renderDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {banners.map((_, i) => {
          const isActive = i === currentIndex;
          return (
            <View
              key={i.toString()}
              style={[
                styles.dot,
                isActive ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    );
  };

  // Banner rendering
  const renderBanner = ({item}: {item: string}) => {
    return (
      <View style={styles.bannerContainer}>
        <Animated.Image source={{uri: item}} style={[styles.bannerImage]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={banners}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderBanner}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ref={flatListRef}
      />
      {renderDots()}
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  bannerContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: screenWidth - 40,
    height: verticalScale(120),
    borderRadius: moderateScale(10),
  },
  paginationContainer: {
    position: 'absolute',
    bottom: verticalScale(10),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    height: verticalScale(8),
    width: verticalScale(8),
    borderRadius: verticalScale(4),
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: tertiary_color,
    width: verticalScale(10),
    height: verticalScale(10),
  },
  inactiveDot: {
    backgroundColor: '#999',
  },
});
