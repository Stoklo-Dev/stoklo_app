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
import Colors from '../constants/Colors';
export default function Walletbox(props) {
    const {height,width} = Dimensions.get('window');
    const deviceModel = DeviceInfo.getModel();

    const screenwidth=width*0.88
    const screenheight=Platform.OS=='ios'? deviceModel === 'iPhone 6' || deviceModel === 'iPhone 6s' || deviceModel === 'iPhone 7' || deviceModel === 'iPhone 8' || deviceModel==='iPhone SE'?height*0.235: height*0.195: props?.store?  height*0.11:height*0.14
   
    

return(
    <View >

{!props.store?<View style={{alignItems:'center',marginTop:15,marginBottom:20,}}>

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
<View style={{flexDirection:'row',alignItems:'center',flex:1,paddingHorizontal:20}}>
<FastImage
                resizeMode="contain"
                style={{
                  width: 52,
                  height: 52,
                }}
                source={require('../assets/icons/walletnew.png')}
              />
              <View style={{padding:20}}>
<Text style={Styles.textstyle}>{props?.points}</Text>
<Text style={[Styles.points,{paddingTop:5}]}>Total points</Text>
              </View>
</View>
</Neomorph>
</View>

:
<View>
<View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:20,marginHorizontal:20,borderRadius:15,backgroundColor:Colors.STORE_COLOR,marginTop:20}}>
<FastImage
                resizeMode="contain"
                style={{
                  width: 52,
                  height: 52,
                }}
                source={require('../assets/icons/walletnew.png')}
              />
              <View style={{padding:20}}>
<Text style={Styles.textstyle}>{props?.points}</Text>
<Text style={[Styles.points,{paddingTop:5}]}>Current point balance</Text>
              </View>
</View>
<View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:25,marginTop:15}}>

<TouchableOpacity  onPress={()=>props?.navigation?.navigate('Walletmodule')}>
  <View style={{padding:15,alignSelf:"center",paddingHorizontal:25,borderRadius:15,backgroundColor:'#A8FFB1'}}>
    <View style={{flexDirection:"row",alignItems:"center"}}>
    <FastImage
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,

                }}
                source={require('../assets/icons/uparrow.png')}
              />

              <View style={{marginLeft:10}}>
                <Text style={[Styles.textstyle,{fontFamily:Fonts.FONT_MEDIUM}]}>{props?.earnedpoints}</Text>
                <Text style={Styles.points}>Total earned</Text>
              </View>
    </View>
  </View>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>props?.navigation?.navigate('Walletmodule')}
>

  <View style={{padding:15,paddingHorizontal:25,borderRadius:15,backgroundColor:'#FFA8A8'}}>
    <View style={{flexDirection:"row",alignItems:"center"}}>
    <FastImage
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                }}
                source={require('../assets/icons/downarrow.png')}
              />

              <View style={{marginLeft:10}}>
                <Text style={[Styles.textstyle,{fontFamily:Fonts.FONT_MEDIUM}]}>{props?.spentpoints}</Text>
                <Text style={Styles.points}>Total spent</Text>
              </View>
    </View>
  </View>
</TouchableOpacity>


</View>

</View>}
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
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    color: "#000000",
    
},
points:{
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 13,
    color: "#000000",
    
}

})
