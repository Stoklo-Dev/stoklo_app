import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Image, ImageBackground, StyleSheet, Linking, AppState, SafeAreaView,TextInput, Platform,Dimensions, TouchableOpacity } from 'react-native';
import Fonts from '../constants/Fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import styles from '../Styles/styles';

export default function Button(props) {
    

return(
    <View>

<TouchableOpacity 
disabled={props.disabled}

 style={[styles.button,{marginHorizontal:responsiveHeight(3)},props?.view]}
 onPress={props.onPress}
 >
            <Text
              style={[
                styles.btnText,
                {fontFamily: Fonts.FONT_BOLD, color: '#FFFFFF'},props?.textstyle,
              ]}>
             {props.text}
            </Text>
          </TouchableOpacity>
</View>
)

}
