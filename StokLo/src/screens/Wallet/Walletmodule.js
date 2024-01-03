import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import Threeicons from '../../Components/Threeicons';
import PlatformSpecificWrapper from '../../PlatformSpecificWrapper';
import Fonts from '../../constants/Fonts';
export default function Walletmodule({navigation, props}) {
  return (
    <PlatformSpecificWrapper style={{flex: 1}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <FastImage
                resizeMode="contain"
                style={{
                  width: 42,
                  height: 42,
                }}
                source={require('../../assets/icons/arrowback.png')}
              />
            </TouchableOpacity>
            <Text style={Styles.header}>Wallet</Text>
          </View>

          <Threeicons navigation={navigation} wallet={true} />
        </View>
        <View
          style={{
            borderWidth: 0.6,
            borderColor: '#0000001A',
            marginTop: 15,
          }}></View>
      </View>
    </PlatformSpecificWrapper>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 15,
    color: '#03041A',
  },
  header: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    color: '#03041A',
    marginLeft: 10,
  },
  transact: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    color: '#000000',
  },
  descrip: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 15,
    color: '#000000',
    flex: 0.25,
  },
  date: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 10,
    color: '#000000',
  },
});
