import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Image, ImageBackground, StyleSheet, Linking, AppState, SafeAreaView,TextInput, Platform,Dimensions, TouchableOpacity } from 'react-native';
import Fonts from '../constants/Fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import styles from '../Styles/styles';
import FastImage from 'react-native-fast-image';
import Modal1 from './Modal1';
export default function Threeicons({navigation, props,wallet}) {
const refRb=useRef();
  const [isDeactivate, setIsDeactivate] = useState('false');
    console.log("Kutttttaaaa",props?.wallet);

return(
    <View style={{flexDirection:'row',justifyContent:'center'}}>
   {wallet? null : <TouchableOpacity    
    onPress={()=>navigation.navigate('Walletmodule')}
    >
    <FastImage
      resizeMode='contain'
      style={{
        width: 55,
        height: 45,
      }}
      source={require('../assets/icons/wallet.png')}
    />
    </TouchableOpacity>}
   {wallet? null : <TouchableOpacity
   
   onPress={()=>navigation.navigate('Notification')}
   
   
   >

    <FastImage
      resizeMode='contain'
      style={{
        width: 55,
        height: 45,
      }}
      source={require('../assets/icons/messages.png')}
    />
    </TouchableOpacity>}
    <TouchableOpacity
    onPress={()=>setIsDeactivate(true)}
    >

    <FastImage
      resizeMode='contain'
      style={{
        width: 55,
        height: 45,
      }}
      source={require('../assets/icons/helpicon.png')}
    />
    </TouchableOpacity>
    {
    console.log("Shurpnakha",isDeactivate)
    }
    <Modal1
          isModalVisible={isDeactivate}
          navigation={navigation}
          setIsModalVisible={setIsDeactivate}

        />
    </View>
)

}
