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
export default function Inputbox(props) {
    const {height,width} = Dimensions.get('window');

    const screenwidth=width*0.88
    const screenheight=height*0.12
    const paymentheight=height*0.07

        


return(
    <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>



<Neomorph

swapShadows // <- change zIndex of each shadow color
  style={{
    shadowOffset: {width: 3.5, height: 3.5},
    darkShadowColor: "#ffffff",
  
borderWidth:2,
    shadowRadius: 1,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
    width:screenwidth,
    height: props.payment? paymentheight: screenheight,
    borderBottomColor:'#F2F2F2',
    borderRightColor:'#F2F2F2',
    borderLeftColor:'#F2F2F2',
    borderTopColor:'#F2F2F2',
  }}
>
<View style={{flex:1,paddingHorizontal:20,flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
{props.payment?<View style={{flexDirection:'row'}}>
<FastImage
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
               
              }}
              source={props.image}
            />
<Text style={{
fontFamily: Fonts.FONT_MEDIUM,
fontSize:props.payment?15: 20,
marginLeft:15,
color: "#03041A"}}>
{props?.language}
</Text>
</View>:
<Text style={{
fontFamily: Fonts.FONT_MEDIUM,
fontSize:props.payment?15: 20,

color: "#03041A"}}>
{props?.language}
</Text>}
<TouchableOpacity 
onPress={props?.onSelect}
>

{ props?.isSelected ?
props?.store?null:
<FastImage
              resizeMode="contain"
              style={{
                width: props.payment?30:42,
                height: props.payment?30:42,
               
              }}
              source={require('../assets/images/radioorange.png')}
            />:<FastImage
              resizeMode="contain"
              style={{
                width: props.payment?30:42,
                height: props.payment?30:42,
               
              }}
              source={require('../assets/images/radiogrey.png')}
            />}
            </TouchableOpacity>
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
