import React from 'react';
import {View, StyleSheet} from 'react-native';

import Threeicons from '../../Components/Threeicons';
import PlatformSpecificWrapper from '../../PlatformSpecificWrapper';

import FastImage from 'react-native-fast-image';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

export default function Homescreen({navigation}) {
  return (
    <PlatformSpecificWrapper style={{flex: 1}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              resizeMode="contain"
              style={{
                width: responsiveScreenHeight(9),
                height: 26,
              }}
              source={require('../../assets/icons/stoklofinal.png')}
            />
          </View>
          <Threeicons navigation={navigation} />
        </View>
      </View>
    </PlatformSpecificWrapper>
  );
}
