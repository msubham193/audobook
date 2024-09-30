/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {MaterialIcons} from '../../utils/Icons';
import LinearGradient from 'react-native-linear-gradient';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/metrics';
import {useNavigation} from '@react-navigation/native'; // Import navigation hook

const RecommendationSection = ({data}: {data: any[]}) => {
  const baseOptions = {
    vertical: false,
    width: 160, // Adjust based on design
    height: 160,
    style: {width: '100%'},
  };

  const navigation = useNavigation(); // Access navigation

  const handleItemPress = (item: any) => {
    // Navigate to the AudioBookDetails screen and pass the selected audiobook data
    navigation.navigate('AudioBookDetails', {audiobook: item});
  };

  return (
    <View style={styles.recommendationContainer}>
      <View style={styles.recommendationHeader}>
        <Text style={styles.recommendationText}>Recommended for you</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={moderateScale(25)}
          color={'#FF204E'}
        />
      </View>
      <Carousel
        {...baseOptions}
        loop
        autoPlay={true}
        autoPlayInterval={4000}
        windowSize={3}
        data={data}
        style={{
          width: '100%',
          height: verticalScale(220), // Adjust height to accommodate details
          marginTop: verticalScale(10),
        }}
        renderItem={({index}) => (
          <TouchableOpacity
            onPress={() => handleItemPress(data[index])} // Navigate on item press
            style={[styles.itemContainer, {marginRight: horizontalScale(10)}]}
            key={index}>
            <View style={styles.imageWrapper}>
              <Image
                source={{uri: data[index]?.image}}
                style={styles.recommendationItem}
                resizeMode="stretch"
              />
              {/* LinearGradient overlay */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
              />
            </View>
            {/* Book details below the image */}
            <View style={styles.detailsWrapper}>
              <Text style={styles.bookName}>
                {data[index]?.title.slice(0, 20)}..
              </Text>
              <Text style={styles.bookCategory}>{data[index]?.category}</Text>
              <Text style={styles.bookStats}>
                {data[index]?.listens} listens • {data[index]?.rating} ⭐
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recommendationContainer: {
    marginHorizontal: horizontalScale(16),
    marginTop: verticalScale(30),
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendationText: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  itemContainer: {
    marginBottom: verticalScale(10),
    marginRight: horizontalScale(10), // Add spacing between items
  },
  imageWrapper: {
    position: 'relative', // Ensure the gradient stays on top
  },
  recommendationItem: {
    height: verticalScale(160),
    width: '95%',
    borderRadius: moderateScale(15),
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%', // Adjust based on how much gradient you want
    borderRadius: moderateScale(10),
  },
  detailsWrapper: {
    marginTop: verticalScale(5),
  },
  bookName: {
    fontSize: moderateScale(11),
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  bookCategory: {
    fontSize: moderateScale(11),
    fontFamily: 'Poppins-Regular',
    color: '#C0C0C0',
    marginTop: verticalScale(3),
  },
  bookStats: {
    fontSize: moderateScale(11),
    fontFamily: 'Poppins-Light',
    color: '#C0C0C0',
    marginTop: verticalScale(2),
  },
});

export default RecommendationSection;
