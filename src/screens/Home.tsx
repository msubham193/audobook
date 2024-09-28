/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  // ScrollView,
} from 'react-native';
import {Feather, MaterialIcons} from '../utils/Icons'; // Importing both Feather and MaterialIcons
import {
  primary_color,
  text_accent_primary,
  text_accent_tertiary,
} from '../utils/colors';
import {horizontalScale, moderateScale, verticalScale} from '../utils/metrics';
import Carousel from 'react-native-reanimated-carousel';
import {ScrollView} from 'react-native-gesture-handler';

// Define screen dimensions
const {width} = Dimensions.get('window');

const Home: React.FC = () => {
  const baseOptions = {
    vertical: false,
    width: width / 2.6,
    height: width / 2,
    style: {
      width: width,
    },
  } as const;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={primary_color} />

      {/* Enable nested scrolling */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        nestedScrollEnabled={true} // Enable nested scrolling
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>AudoBook</Text>
          <View style={styles.iconContainer}>
            <Feather
              name="search"
              size={moderateScale(25)}
              style={styles.searchIcon}
            />
            <Image
              source={{
                uri: 'https://www.hindustantimes.com/static-content/1y/cricket-logos/players/virat-kohli.png',
              }}
              resizeMode="cover"
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Greeting Section */}
        <View style={styles.greetingContainer}>
          <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingText}>Good evening,</Text>
            <Text style={styles.greetingName}>Subham</Text>
          </View>
          <Text style={styles.subText}>Ready to dive into a great listen?</Text>
        </View>

        {/* Carousel */}
        <View style={styles.carouselWrapper}>
          {/* Wrap the carousel in a View */}
          <Carousel
            loop
            width={width}
            windowSize={3}
            height={width / 2}
            autoPlay={true}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={2000}
            pagingEnabled={true}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            style={styles.carouselContainer}
            renderItem={({index}) => (
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8B7SqXOwy8nKrhB6AlLhL8fnIlphHmcWZiA&sv',
                }}
                resizeMode="cover"
                style={styles.carouselItem}
                key={index}
              />
            )}
          />
        </View>

        {/* Recommendations */}
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
            windowSize={5}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            data={[...new Array(12).keys()]}
            scrollAnimationDuration={2000}
            renderItem={({index}) => (
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8B7SqXOwy8nKrhB6AlLhL8fnIlphHmcWZiA&sv',
                }}
                resizeMode="cover"
                style={styles.recommendationItem}
                key={index}
              />
            )}
          />
        </View>
        {/* Geners */}

        <View style={styles.recommendationContainer}>
          <View style={styles.recommendationHeader}>
            <Text style={styles.recommendationText}>Explore all genres</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={moderateScale(25)}
              color={'#FF204E'}
            />
          </View>

          <Carousel
            {...baseOptions}
            width={width / 4}
            style={{
              // backgroundColor: 'white',
              width: '100%',
              height: verticalScale(120),

              // backgroundColor: 'white',
            }}
            loop
            windowSize={7}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            data={[...new Array(12).keys()]}
            scrollAnimationDuration={2000}
            renderItem={({index}) => (
              <View
                style={{
                  // backgroundColor: 'white',
                  height: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8B7SqXOwy8nKrhB6AlLhL8fnIlphHmcWZiA&sv',
                  }}
                  resizeMode="cover"
                  borderRadius={8000}
                  style={{
                    height: '60%',
                    width: '60%',

                    // borderRadius: moderateScale(900),
                    marginTop: verticalScale(20),
                    marginBottom: verticalScale(10),
                  }}
                  key={index}
                />
                <Text
                  style={{
                    color: 'white',
                  }}>
                  Subham
                </Text>
              </View>
            )}
          />
        </View>

        <View style={styles.carouselWrapper}>
          {/* Wrap the carousel in a View */}
          <Carousel
            loop
            width={width}
            windowSize={1}
            height={width / 2}
            // autoPlay={true}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={2000}
            pagingEnabled={true}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.75,
              parallaxScrollingOffset: 130,
            }}
            style={
              {
                // backgroundColor: 'white',
              }
            }
            renderItem={({index}) => (
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8B7SqXOwy8nKrhB6AlLhL8fnIlphHmcWZiA&sv',
                }}
                resizeMode="cover"
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: moderateScale(10),
                  justifyContent: 'center',
                }}
                key={index}
              />
            )}
          />
        </View>
        <View style={styles.carouselWrapper}>
          {/* Wrap the carousel in a View */}
          <Carousel
            loop
            width={width}
            windowSize={1}
            height={width / 2}
            // autoPlay={true}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={2000}
            pagingEnabled={true}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.75,
              parallaxScrollingOffset: 130,
            }}
            style={
              {
                // backgroundColor: 'white',
              }
            }
            renderItem={({index}) => (
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8B7SqXOwy8nKrhB6AlLhL8fnIlphHmcWZiA&sv',
                }}
                resizeMode="cover"
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: moderateScale(10),
                  justifyContent: 'center',
                }}
                key={index}
              />
            )}
          />
        </View>
        {/* Additional Recommendations */}
        {/* Repeat similar sections as needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

// Stylesheet
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: primary_color,
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: verticalScale(20),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    marginTop: verticalScale(40),
  },
  logoText: {
    fontSize: moderateScale(18),
    color: '#FF204E',
    fontFamily: 'Poppins-SemiBold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(15),
  },
  searchIcon: {
    color: text_accent_primary,
  },
  profileImage: {
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: moderateScale(200),
  },
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
  carouselWrapper: {
    left: -10,
    height: verticalScale(100), // Adjust height to fit carousel properly
    marginBottom: verticalScale(20),
  },
  carouselContainer: {
    height: verticalScale(120),
  },
  carouselItem: {
    height: '55%',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
  },
  recommendationContainer: {
    marginHorizontal: horizontalScale(16),
    marginTop: verticalScale(20),
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendationText: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Medium',
    color: text_accent_tertiary,
  },
  recommendationItem: {
    height: '80%',
    width: '90%',
    borderRadius: moderateScale(10),
    marginTop: verticalScale(18),
    justifyContent: 'center',
  },
});
