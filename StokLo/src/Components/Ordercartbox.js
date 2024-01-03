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
export default function Ordercartbox(props) {
    const {height,width} = Dimensions.get('window');

    const screenwidth=width*0.88
    const linewidth=width*0.80
    const screenheight=height*0.17
    const linehight=height*0.03

        


return(
    <View style={{alignItems:'center',marginTop:15,marginBottom:10}}>



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
    height: screenheight,
    borderBottomColor:'#F2F2F2',
    borderRightColor:'#F2F2F2',
    borderLeftColor:'#F2F2F2',
    borderTopColor:'#F2F2F2',
  }}
>
<View style={{flex:1,justifyContent:'space-between'}}>
<View style={{paddingHorizontal:10,flexDirection:"row",justifyContent:'space-between',paddingTop:10}}>
<Text style={{
fontFamily: Fonts.FONT_MEDIUM,
fontSize: 14,

color: "#03041A"}}>
ORDER ID:{' '}
<Text style={{
fontFamily: Fonts.FONT_REGULAR,
fontSize: 14,

color: "#03041A"}}>
 {props?.orderNo}
</Text>
</Text>
<Text style={{
fontFamily: Fonts.FONT_MEDIUM,
fontSize: 14,
color:props?.status=="Cancelled"?"#FF0000": "#2CBC3A"}}>
{props?.status}
</Text>



</View>
<View style={{paddingHorizontal:10}}>
<FastImage
                  resizeMode='contain'
                  style={{
                    width:linewidth,
                    height: linehight,
                  }}
                  source={require('../assets/icons/linedotted.png')}
                />
</View>
<View style={{paddingHorizontal:10,flexDirection:"row",justifyContent:'space-between',}}>
<Text style={{
fontFamily: Fonts.FONT_MEDIUM,
fontSize: 20,

color: "#03041A"}}>
{`${props?.noOfItem} items `}


</Text>
<Text style={{
fontFamily: Fonts.FONT_MEDIUM,
fontSize: 16,

color: "#03041A"}}>
{`₹${props?.totalAmount} `}

</Text>



</View>

<View style={{paddingHorizontal:10,flexDirection:"row",justifyContent:'space-between',}}>
<View style={{alignItems:"center",justifyContent:'center'}}>
{/* <Text style={{
fontFamily: Fonts.FONT_MEDIUM,
fontSize: 11,

color: "#FF8F28"}}>
You have earned{' '}
<Text style={{
fontFamily: Fonts.FONT_REGULAR,
fontSize: 11,

color: "#FF8F28"}}>
₹15
</Text>
</Text> */}
</View>
<View
style={{flex:0.5}}
>
            <TouchableOpacity
// onPress={props.onBuy}
              style={[styles.button,{paddingVertical:7,borderRadius:7,backgroundColor:"#FFD2A8",borderColor:'#FFD2A8'}]}>
              <Text
                style={[
                  styles.btnText,
                  {fontFamily: Fonts.FONT_MEDIUM, color: '#000000',alignSelf:"center",fontSize:13},
                ]}>
              Repeat this order
              </Text>
            </TouchableOpacity>
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
}

})
