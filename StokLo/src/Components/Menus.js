import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Image, ImageBackground, StyleSheet, Linking, AppState, SafeAreaView,TextInput, Platform,Dimensions, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Fonts from '../constants/Fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import styles from '../Styles/styles';
import { Shadow } from 'react-native-neomorph-shadows';
import { Neomorph } from 'react-native-neomorph-shadows';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { addlanguage } from '../newredux/Myproducts';
import Button from './Button';
export default function Menus(props) {
    const {height,width} = Dimensions.get('window');
    const deviceModel = DeviceInfo.getModel();

    const screenwidth=width*0.43
    const screenheight=Platform.OS=='ios'? deviceModel === 'iPhone 6' || deviceModel === 'iPhone 6s' || deviceModel === 'iPhone 7' || deviceModel === 'iPhone 8' || deviceModel==='iPhone SE'?height*0.235: height*0.195:height*0.15
   
    

return(
    <View style={{alignItems:'center',marginTop:15}}>



<Neomorph

swapShadows // <- change zIndex of each shadow color
  style={{
    shadowOffset: {width: 3.5, height: 3.5},
    darkShadowColor: "#ffffff",
  
borderWidth:2,
    shadowRadius:1,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
    width:screenwidth,
    height: screenheight,
    borderBottomColor:'#F2F2F2',
    borderRightColor:'#F2F2F2',
    borderLeftColor:'#F2F2F2',
    borderTopColor:'#F2F2F2',
  }}
>
<View style={{alignItems:'center',flex:1,paddingHorizontal:20,justifyContent:"center"}}>
<View style={{alignItems:"center"}}>
<FastImage
                resizeMode="contain"
                style={{
                  width: 52,
                  height: 52,

                }}
                source={{uri:props.image}}
              />
              <View style={{}}>
<Text style={Styles.textstyle}>{props?.text}</Text>
</View>
              </View>
</View>
</Neomorph>
</View>
)

}

const Styles=StyleSheet.create({
maincontainer:{
    width: 335,
height: 90,
borderRadius: 16,
backgroundColor: "#F2F2F2",
shadowColor: "rgba(10, 10, 10, 0.05)",
shadowOffset: {
	width: -10,
	height: -10
},
shadowRadius: 4,
shadowOpacity: 1
},
textstyle:{
    fontFamily: Fonts.FONT_SEMIBOLD,
    fontSize: 14,
    color: "#000000",
    textAlign:"center"
    
},
points:{
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 13,
    color: "#000000",
    
}

})
