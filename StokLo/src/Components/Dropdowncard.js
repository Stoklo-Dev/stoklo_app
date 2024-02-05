import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Image, ImageBackground, StyleSheet, Linking, AppState, SafeAreaView,TextInput, Platform,Dimensions,KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Fonts from '../constants/Fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Shadow } from 'react-native-neomorph-shadows';
import FastImage from 'react-native-fast-image';
import { Dropdown } from 'react-native-element-dropdown';


export default function Dropdowncard(props) {
    const {height,width} = Dimensions.get('window');
    const android = Platform.OS === 'ios' ? 0.07 : 0.08;

 const screenwidth=width*0.88
 const otpwidth=width*0.17
 const screenheight=height*0.07
 const otpheigt=height*android

console.log("ksksksks",screenheight)

return(

  
    <View>
            <Text style={Styles.text}>{props?.name}</Text>

<View style={{alignSelf:'center',marginTop:10,}} >


 <Shadow
  inner 
  useArt={true} 
  style={{
    shadowOffset: {width:props?.otp?7: 5.5, height:props?.otp?7: 5.5},
    shadowOpacity: 1,
    shadowColor: "#e9e9e9",
    shadowRadius: 1,
    borderRadius:props?.otp?15: 10,
    backgroundColor: '#F2F2F2',
  width:props?.otp?otpwidth:screenwidth,
    height: props?.otp?otpheigt:screenheight,
    borderWidth:3,
    borderLeftColor:'#e9e9e9',
    borderTopColor:'#e9e9e9',
    borderBottomColor:'#fcfcfc',
    borderRightColor:'#fcfcfc',
   
   
  }}
>
 <Dropdown
                 
                 keyboardAvoiding={true}
                 dropdownPosition={props.dropdownPosition}
                     onSelect={props.onSelect}
                     disable={props?.disable ? true : false}
                     style={[props.paddig, {
                         height: responsiveHeight(5.9),
                         borderColor: "#E9EAF4",
                         borderWidth: 1,
                         borderRadius: 8,
                         paddingHorizontal: 8,
                         borderColor: '#E9EAF4',
                         backgroundColor:"#F2F2F2",
                         paddingHorizontal:15
                     }]}
                     placeholderStyle={{color:'#03041A'}}
                     selectedTextStyle={{color:'#03041A'}}
                     itemTextStyle={{color:'#03041A'}}
                     inputSearchStyle={styles.inputSearchStyle}
                     iconStyle={{width:20,height:25}}
                     iconColor={'#000000'}
                     fontFamily={Fonts.FONT_MEDIUM}
                     data={props.data}
                     search={props.search}
                     maxHeight={300}
                     containerStyle={{backgroundColor:'#F2F2F2'}}
                     labelField="label"
                     valueField="value"
                     placeholder={props.placeholder}
                     searchPlaceholder="Search..."
                     value={props.value}
                     onFocus={props.handleFocus}
                     onBlur={props.handleBlur}
                     onChange={props.onChange}
autoScroll={false}
                 />
</Shadow>


</View>
</View>
)

}
const styles = StyleSheet.create({

Maincontainer:{

paddingVertical:Platform.OS=='ios'?15:0,
   marginHorizontal:responsiveHeight(3),
    borderRadius: 10,
    borderWidth:3,
    borderLeftColor:'#e9e9e9',
    borderTopColor:'#e9e9e9',
    borderBottomColor:'#fcfcfc',
    borderRightColor:'#fcfcfc',
  
},
TextInput:{
    fontFamily: Fonts.FONT_MEDIUM,
   flex:1,
    padding:15,
    
   
}



})

const Styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 13,
    marginTop: 15,
    marginLeft: 25,

    color: '#03041A',
  },
  dropdown: {
    height: responsiveHeight(5.4),
    borderColor: "#E9EAF4",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,

},


placeholderStyle: {
    fontSize: 16,
    color: '#9A9BA5',
    fontFamily: Fonts.FONT_REGULAR,
    marginLeft: 12
},
selectedTextStyle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: '#03061F',
},

inputSearchStyle: {
    height: 40,
    fontSize: 16,
},
  
});