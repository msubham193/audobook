import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {MaterialIcons} from '../../utils/Icons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';

const {width} = Dimensions.get('window');

const genres = [
  {
    id: 1,
    name: 'Self-Help',
    image:
      'https://images.pexels.com/photos/5088186/pexels-photo-5088186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    name: 'Science',
    image:
      'https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 1,
    name: 'Philosophy',
    image:
      'https://images.pexels.com/photos/5910487/pexels-photo-5910487.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 1,
    name: 'Mythology',
    image:
      'https://images.pexels.com/photos/6183557/pexels-photo-6183557.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 1,
    name: 'Self-Help',
    image:
      'https://images.pexels.com/photos/5088186/pexels-photo-5088186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 1,
    name: 'Self-Help',
    image:
      'https://images.pexels.com/photos/5088186/pexels-photo-5088186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const GenresSection: React.FC = () => {
  const baseOptions = {
    vertical: false,
    width: width / 4,
    style: {
      width: '100%',
      height: verticalScale(120),
    },
  };

  return (
    <View style={styles.genresContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Explore all genres</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={moderateScale(25)}
          color={'#FF204E'}
        />
      </View>
      <Carousel
        {...baseOptions}
        loop
        windowSize={8}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        data={genres}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <View style={styles.genreItem}>
            <Image
              source={{
                uri: genres[index].image,
              }}
       
              borderRadius={800}
              style={styles.genreImage}

              key={index}
            />
            <Text style={styles.genreName}>{genres[index].name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default GenresSection;

const styles = StyleSheet.create({
  genresContainer: {
    marginHorizontal: horizontalScale(16),
    marginTop: verticalScale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  genreItem: {
    height: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'white',
    marginTop: verticalScale(20),
  },
  genreImage: {
    height: '65%',
    width: '65%',
    //
    marginBottom: verticalScale(10),
    resizeMode: 'cover',
  },
  genreName: {
    color: 'white',
    fontSize: moderateScale(12),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});
