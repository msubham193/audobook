/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {primary_color} from '../utils/colors';
import {moderateScale, verticalScale} from '../utils/metrics';
import Carousel from 'react-native-reanimated-carousel';

import BannerCarousel from '../components/Carousel/Banner';
import GenresSection from '../components/Carousel/GenresSection';
import RecommendationSection from '../components/Carousel/RecommendationCarousel';
import Greeting from '../components/Greeting';
import Header from '../components/Header';
import NewReleaseBanner from '../components/NewReleaseBanner';

const recommendations = [
  {
    id: '1',
    title: 'Black Holes by Stephen Hawking',
    image:
      'https://img.etimg.com/photo/msid-99785373,imgsize-312334/BlackHolesTheReithLecturesbyStephenHawking.jpg',
    category: 'Fantasy',
    listens: '20M',
    duration: '12',
    rating: '4.5',
  },
  {
    id: '2',
    title: 'Introduction to AI',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ5UQip0FaT4iD23bIetGshysBP_691RzUkw&s',
    category: 'Fantasy',
    listens: '20M',
    duration: '12',
    rating: '4.5',
  },
  {
    id: '3',
    title: 'Sophis World',
    image:
      'https://m.media-amazon.com/images/I/613Vp1tkvQL._AC_UY436_FMwebp_QL65_.jpg',
    category: 'Philosophy',
    listens: '2M',
    duration: '12',
    rating: '4',
  },
  {
    id: '4',
    title: 'The Constitution of India',
    image:
      'https://cdn.kobo.com/book-images/fe5ce53d-aa48-4ca9-87e7-5d59e66851a3/1200/1200/False/the-constitution-of-india-3.jpg',
    category: 'Fantasy',
    listens: '20M',
    duration: '12',
    rating: '4.5',
  },
];

const {width} = Dimensions.get('window');

const Home: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle the pull-to-refresh logic
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or data reload
    setTimeout(() => {
      setRefreshing(false);
      // Optionally update data here
    }, 2000); // You can adjust the time as needed
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Greeting name="Subham" />
        <BannerCarousel />
        <RecommendationSection data={recommendations} />
        {/* 
        <NewReleaseBanner data={recommendations} /> */}
        <GenresSection />

        <View style={styles.carouselWrapper}>
          <Carousel
            loop
            width={width}
            windowSize={1}
            height={width / 2}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            data={recommendations}
            scrollAnimationDuration={2000}
            pagingEnabled={true}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.75,
              parallaxScrollingOffset: 130,
            }}
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
  carouselWrapper: {
    left: -10,
    height: verticalScale(100),
    marginBottom: verticalScale(20),
  },
});
