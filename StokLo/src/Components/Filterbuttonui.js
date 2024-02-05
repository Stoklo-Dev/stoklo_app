import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Image, ImageBackground, StyleSheet, Linking, AppState, SafeAreaView,TextInput, Platform,Dimensions, TouchableOpacity } from 'react-native';
import Fonts from '../constants/Fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import styles from '../Styles/styles';
import { Shadow } from 'react-native-neomorph-shadows';
import { Neomorph } from 'react-native-neomorph-shadows';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { addlanguage } from '../newredux/Myproducts';
export default function Filterbuttonui(props) {
    const {height,width} = Dimensions.get('window');

    const screenwidth=width*0.35
    const screenheight=height*0.05

        


return(
    <View style={[{marginTop:10},props.viewstyle]}>



<Neomorph

swapShadows // <- change zIndex of each shadow color
  style={{
    shadowOffset: {width: 3.5, height: 3.5},
    darkShadowColor: "#ffffff",
  
borderWidth:2,
    shadowRadius: 1,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    width:screenwidth,
    height: screenheight,
    borderBottomColor:'#F2F2F2',
    borderRightColor:'#F2F2F2',
    borderLeftColor:'#F2F2F2',
    borderTopColor:'#F2F2F2',
  }}
>
<View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
<Text style={{
fontFamily: Fonts.FONT_BOLD,
fontSize: 15,

color: "#03041A",justifyContent:'center'}}>
{props?.text}
</Text>
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
}

})
