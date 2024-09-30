import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Feather} from '../utils/Icons';
import {primary_color, text_accent_primary} from '../utils/colors';
import {horizontalScale, moderateScale, verticalScale} from '../utils/metrics';

const Header = () => (
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
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    marginTop: verticalScale(40),
    position: 'static',
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
});

export default Header;
