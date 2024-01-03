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
export default function Maincart(props) {
    const {height,width} = Dimensions.get('window');
    const deviceModel = DeviceInfo.getModel();

    const screenwidth=width*0.88
    const screenheight=Platform.OS=='ios'? deviceModel === 'iPhone 6' || deviceModel === 'iPhone 6s' || deviceModel === 'iPhone 7' || deviceModel === 'iPhone 8' || deviceModel==='iPhone SE'?height*0.235: height*0.195:height*0.22
   
    

return(
    <View style={{alignItems:'center',marginTop:0,marginBottom:20}}>



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
<View style={{flex:1,padding:10,flexDirection:'row'}}>

<FastImage
                  resizeMode='contain'
                  style={{
                    width: 58,
                    height: 58,
                  }}
                  source={{uri:props?.productImage}}
                />
<View style={{marginLeft:10,flex:1}}>
<Text  numberOfLines={1}
 style={Styles.textstyle}>
{props?.productComposition}
</Text>
<Text  numberOfLines={1}
 style={[Styles.textstyle,{color:'#03041A',fontSize:17,fontFamily:Fonts.FONT_SEMIBOLD}]}>
{props?.productName}


</Text>
<Text  numberOfLines={1}
 style={Styles.textstyle}>
{props?.compositionName}

</Text>
<View style={{marginTop:5,flexDirection:'row',alignItems:"center",justifyContent:'space-between'}}>
<Text  numberOfLines={1}
 style={[Styles.textstyle,{fontSize:12,}]}>
{`${props?.dimestion} ${props?.units} `}
</Text>
<View style={{marginLeft:25,}}>
<Text  numberOfLines={1}
 style={[Styles.textstyle,{fontSize:13,color:'#4855F0'}]}>
Net rate
</Text>
<Text  numberOfLines={1}
 style={[Styles.textstyle,{fontSize:11,color:'#4855F0',fontFamily:Fonts.FONT_BOLD,}]}>

{` ₹${props?.netPrice} `}
<Text  numberOfLines={1}
 style={[Styles.textstyle,{fontSize:11,color:'#03041A',fontFamily:Fonts.FONT_REGULAR}]}>
{`(₹${props?.netPricePerUnit}/${props?.unit}) `}
</Text>
</Text>

</View>
</View>



<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
<View>
<Text  numberOfLines={1}
 style={[Styles.textstyle,{fontSize:10.5,fontFamily:Fonts.FONT_SEMIBOLD}]}>
{`MRP ₹${props?.mrp} `}

</Text>
<Text  numberOfLines={1}
 style={[Styles.textstyle,{fontSize:10.5,color:'#1F9515',fontFamily:Fonts.FONT_SEMIBOLD}]}>
{`Margin ₹${props?.margin} `}

</Text>
</View>

<View style={{marginTop:2}}>
<Text  numberOfLines={1}
 style={[Styles.textstyle,{fontSize:8.5,fontFamily:Fonts.FONT_MEDIUM}]}>
{`₹${props?.mrpPerUnit}/${props?.unit} `}

</Text>
<View style={{justifyContent:"center",marginTop:3}}>
<Text  numberOfLines={1}
 style={[Styles.textstyle,{fontSize:8.5,color:'#1F9515',fontFamily:Fonts.FONT_MEDIUM}]}>
{`₹${props?.marginPerUnit}/${props?.unit} `}

</Text>
</View>
</View>


{ (props.noofstock>0) ? props.quantity > 0 ?  
  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity
onPress={props.onDecrement}
            >
            <FastImage
                  resizeMode='contain'
                  style={{
                    width: 42,
                    height: 42,
                  }}
                  source={require('../assets/icons/decrement.png')}
                />
            </TouchableOpacity>

            <Text style={{ fontSize:15,fontFamily:Fonts.FONT_MEDIUM,color:"#03041A",paddingHorizontal:10 }}>{props.quantity}</Text>


            <TouchableOpacity
onPress={props.onIncrement}
            >
            <FastImage
                  resizeMode='contain'
                  style={{
                    width: 42,
                    height: 42,
                  }}
                  source={require('../assets/icons/increment.png')}
                />
            </TouchableOpacity>
          </View>


          
          :
         
         
        <View
style={{flex:0.7}}
>
            <TouchableOpacity
onPress={props.onBuy}
              style={[styles.button,{paddingVertical:7,borderRadius:7}]}>
              <Text
                style={[
                  styles.btnText,
                  {fontFamily: Fonts.FONT_BOLD, color: '#FFFFFF',alignSelf:"center",fontSize:13},
                ]}>
               Buy now
              </Text>
            </TouchableOpacity>
          </View> 
          
        : <View
style={{flex:0.7}}
>
            <TouchableOpacity

              style={[styles.button,{paddingVertical:7,borderRadius:7}]}>
              <Text
                style={[
                  styles.btnText,
                  {fontFamily: Fonts.FONT_BOLD, color: '#FFFFFF',alignSelf:"center",fontSize:13},
                ]}>
             out of stock
              </Text>
            </TouchableOpacity>
          </View>  }




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
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 11,
    color: "#2E304D",
    
}

})
