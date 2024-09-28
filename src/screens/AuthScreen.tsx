/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Animated,
  Image,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  primary_color,
  secondary_color,
  tertiary_color,
  text_accent_secondary,
  text_accent_tertiary,
} from '../utils/colors';
import {horizontalScale, moderateScale, verticalScale} from '../utils/metrics';

import {MaterialIcons} from '../utils/Icons';
import {OtpInput} from 'react-native-otp-entry';
import {useCountryStore} from '../zustand/store';
import {sendOtp} from '../utils/firebase/auth';

const {height} = Dimensions.get('window');

interface selectedCountries {
  name: string;
  flag: string;
  code: string;
}

const AuthScreen = ({navigation}) => {
  const {countries} = useCountryStore();

  const [imageIndex, setImageIndex] = useState(0); // Tracks the current image index
  const fadeAnim = useRef(new Animated.Value(1)).current; // Fade animation
  const [showOtp, setShowOtp] = useState(false); // Manage OTP visibility
  const slideAnim = useRef(new Animated.Value(0)).current;

  const [phoneNumber, setPhoneNumber] = useState();

  console.log(phoneNumber);

  const [selectedCountries, setselectedCountries] = useState({
    name: 'India',
    flag: 'https://flagcdn.com/w320/in.png',
    code: '+91',
  } as selectedCountries);

  const [modalVisible, setModalVisible] = useState(false);

  const images = [
    require('../assets/images/authbg1.jpg'),
    require('../assets/images/authbg2.jpg'),
    require('../assets/images/authbg3.jpg'),
    require('../assets/images/authbg4.jpg'),
  ];

  const cycleImages = useCallback(() => {
    // Start fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % images.length);

      // Start fade-in animation after the image has changed
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnim, images.length]);

  useEffect(() => {
    const interval = setInterval(cycleImages, 4000);

    return () => clearInterval(interval);
  }, [cycleImages]);

  const handleContinue = () => {
    sendOtp(phoneNumber);
    setShowOtp(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideInStyle = {
    transform: [
      {
        translateX: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [Dimensions.get('window').width, 0], // Slide in from right
        }),
      },
    ],
  };

  const renderCountryPickerModal = () => {
    const renderItem = ({item}: any) => {
      return (
        <TouchableOpacity
          style={{
            // backgroundColor: 'white',
            padding: 10,
            margin: 10,
            borderRadius: 10,
            width: '100%',
          }}
          onPress={() => {
            setselectedCountries(item);
            setModalVisible(false);
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              // justifyContent: 'space-between',
              gap: 30,
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item.flag}}
              style={{width: 40, height: 40, borderRadius: 20}}
            />
            <Text
              style={{
                color: text_accent_tertiary,
                fontFamily: 'Poppins-Regular',
                fontSize: moderateScale(14),
              }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{
          backgroundColor: 'white',
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              height: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: primary_color,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: tertiary_color,
                height: verticalScale(20),
                width: horizontalScale(20),
                position: 'absolute',
                right: 20,
                top: 20,

                borderRadius: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
              }}
              onPress={() => setModalVisible(false)}>
              <MaterialIcons
                name="close"
                size={18}
                color={text_accent_tertiary}
              />
            </TouchableOpacity>

            <FlatList
              data={countries}
              renderItem={renderItem}
              style={{
                // backgroundColor: 'white',
                width: '100%',
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Make Status Bar transparent */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Video Section */}
      <View style={styles.videoContainer}>
        <Animated.Image
          source={images[imageIndex]}
          style={[styles.video, {opacity: fadeAnim}]}
          resizeMode="cover"
        />
        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', primary_color]}
          style={styles.gradient}
        />
        {/* AudoBook text */}
        <Animated.Text style={styles.audoBookText}>AudoBook</Animated.Text>
        <Animated.Text style={styles.audoBookSlogan}>
          Where every listen ignites your imagination!
        </Animated.Text>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === imageIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Authentication Section */}
      {!showOtp && (
        <View style={styles.authContainer}>
          <Text style={styles.title}>Enter your phone number</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',

              alignItems: 'center',
              marginBottom: verticalScale(20),
            }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: secondary_color,

                paddingHorizontal: horizontalScale(7),
                paddingVertical: verticalScale(10),
                height: verticalScale(50),
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              onPress={() => setModalVisible(true)}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={moderateScale(15)}
                color="white"
              />
              <Image
                source={{uri: selectedCountries && selectedCountries.flag}}
                style={{
                  height: verticalScale(15),
                  width: horizontalScale(20),
                  resizeMode: 'contain',
                  borderRadius: moderateScale(2),
                  marginLeft: horizontalScale(3),
                }}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Regular',
                  marginLeft: horizontalScale(3),
                  fontSize: moderateScale(13),
                }}>
                {selectedCountries?.code}
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Enter Phone number"
              style={styles.input}
              keyboardType="phone-pad"
              placeholderTextColor="#aaa"
              onChangeText={text => setPhoneNumber(text)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* OTP Section with Slide-in Animation */}
      {showOtp && (
        <Animated.View style={[styles.authContainer, slideInStyle]}>
          <OtpInput
            numberOfDigits={4}
            onTextChange={text => console.log(text)}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: {
                borderRadius: 10,
                width: '100%',
                height: verticalScale(60),
                marginLeft: horizontalScale(0),
                paddingHorizontal: horizontalScale(25),
                marginBottom: verticalScale(20),
              },
              pinCodeContainerStyle: {
                height: verticalScale(50),
              },
              pinCodeTextStyle: {
                fontSize: moderateScale(20),
                color: 'white',
              },
              focusedPinCodeContainerStyle: {
                borderColor: tertiary_color,
              },
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <Text style={styles.consentText}>
        By signing up, you agree to our Terms of Service and Privacy Policy,
        ensuring a secure and personalized experience with AudoBook.
      </Text>

      {renderCountryPickerModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary_color,
  },
  videoContainer: {
    height: height * 0.4,
    justifyContent: 'flex-end',
  },
  video: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  audoBookText: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    color: tertiary_color,
    fontSize: moderateScale(25),
    fontFamily: 'Poppins-Bold',
  },
  audoBookSlogan: {
    position: 'absolute',
    bottom: -15,
    left: 20,
    color: text_accent_tertiary,
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-Regular',
  },
  pagination: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: horizontalScale(4),
    height: verticalScale(4),
    borderRadius: 4,
    marginHorizontal: horizontalScale(5),
  },
  activeDot: {
    backgroundColor: tertiary_color,
    width: horizontalScale(6),
    height: verticalScale(6),
  },
  inactiveDot: {
    backgroundColor: text_accent_tertiary,
  },
  authContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: verticalScale(100),
  },
  title: {
    fontSize: moderateScale(13),
    color: '#fff',
    marginBottom: verticalScale(10),
    fontFamily: 'Poppins-Regular',
  },
  input: {
    // borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: secondary_color,

    paddingHorizontal: horizontalScale(2),
    paddingVertical: verticalScale(10),
    backgroundColor: secondary_color,
    fontFamily: 'Poppins-Medium',

    fontSize: moderateScale(13),
    width: '75%',

    color: 'white',
  },
  button: {
    height: verticalScale(40),
    backgroundColor: tertiary_color,
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Medium',
  },
  consentText: {
    color: text_accent_secondary,
    fontSize: moderateScale(10),
    textAlign: 'center',
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: horizontalScale(13),
    width: '100%',
  },
});

export default AuthScreen;
