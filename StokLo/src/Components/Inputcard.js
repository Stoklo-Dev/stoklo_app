import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  StyleSheet,
  Linking,
  AppState,
  SafeAreaView,
  TextInput,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Fonts from '../constants/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Shadow} from 'react-native-neomorph-shadows';
import FastImage from 'react-native-fast-image';

import DeviceInfo from 'react-native-device-info';

export default function Inputcard(props) {
  const {height, width} = Dimensions.get('window');
  const android = Platform.OS === 'ios' ? 0.08 : 0.08;
  const deviceModel = DeviceInfo.getModel();
  const [reff, setreff] = useState('');

  console.log('kskskskks', deviceModel);
  const screenwidth = width * 0.88;
  const otpwidth = width * 0.17;
  let screenheight;
  if (props?.multi) {
    screenheight = height * 0.13;
  } else if (
    deviceModel === 'iPhone 6' ||
    deviceModel === 'iPhone 6s' ||
    deviceModel === 'iPhone 7' ||
    deviceModel === 'iPhone 8' ||
    deviceModel === 'iPhone SE'
  ) {
    screenheight = height * 0.08;

    // screenheight=height*0.13
  } else {
    screenheight = height * 0.07;
  }
  const otpheigt = height * android;

  console.log('ksksksks', screenheight);
  let ref = reff;
  if (reff) {
    ref = useRef(null);
  }

  return (
    <View style={[props.viewstyle]}>
{   props.multiline  ?  <View style={{flexDirection:'row',justifyContent:"space-between"}}> 
    <Text style={[Styles.text,{color: props?.value?'#4855F0':'#03041A'}]}>{props?.name}</Text>
    <Text style={[Styles.text,{color:'#03041A',fontSize:13,marginRight:25}]}>{`${props?.less}/${props?.max}`}</Text>

    </View>:
    <Text style={[Styles.text,props?.stylename,{color: props?.value?'#4855F0':'#03041A',}]}>{props?.name}</Text>}

      <View style={{alignSelf: 'center', marginTop: 10}}>
        <Shadow
          inner
          useArt={true}
          style={{
            shadowOffset: {
              width: props?.otp ? 7 : 5.5,
              height: props?.otp ? 7 : 5.5,
            },
            shadowOpacity: 1,
            shadowColor: '#e9e9e9',
            shadowRadius: 1,
            borderRadius: props?.otp ? 15 : 10,
            backgroundColor: '#F2F2F2',
            width: props?.otp ? otpwidth : screenwidth,
            height: props?.otp ? otpheigt : screenheight,
            borderWidth: 3,
            borderLeftColor: '#e9e9e9',
            borderTopColor: '#e9e9e9',
            borderBottomColor: '#fcfcfc',
            borderRightColor: '#fcfcfc',
            // paddingVertical:props.multi?60:0
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              marginLeft: 10,
            }}>
            {props?.image1 ? (
              <TouchableOpacity
                disabled={props.disabled}
                onPress={props.onPress}
                style={{alignSelf: 'center'}}>
                <FastImage
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,

                    // marginRight:15
                    // marginTop: 10,
                  }}
                  source={props?.image1}
                />
              </TouchableOpacity>
            ) : null}
            <TextInput
              ref={props.reff}
              key={props.key}
              editable={props?.editable}
              keyboardType={props.keyboardType}
              placeholder={props?.otp ? null : props?.placeholdertext}
              textAlign='right'
              style={[
                styles.TextInput,
                
                props.style,
                
                {
                  textAlign: props?.otp ? 'center' : 'left',
                  fontSize: props?.otp ? 20 : 15,
                  color: props?.otp ? '#03041A' : '#03041A',
                  textAlignVertical: props?.multiline ? 'top' : 'center',
                  marginLeft:-10
                  // height: props.multi ? screenheight : null,
                },
              ]}
              maxLength={props?.otp ? 1 : props?.maxLength}
              autoCapitalize={props?.autoCapitalize}
              value={props?.value}
              returnKeyType={Platform.OS == 'ios' ? 'done' : 'default'}
              onChangeText={props?.onChangeText}
              multiline={props?.multiline}
              placeholderTextColor={'#A1A2B2'}
              onSubmitEditing={props.onSubmitEditing}

            />

            {props?.image ? (
              <TouchableOpacity
                disabled={props.disabled}
                onPress={props.onPress}
                style={{alignSelf: 'center'}}>
                <FastImage
                  resizeMode="contain"
                  style={{
                    width: 18,
                    height: 18,

                    marginRight: 15,
                    // marginTop: 10,
                  }}
                  source={props?.image}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </Shadow>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Maincontainer: {
    paddingVertical: Platform.OS == 'ios' ? 15 : 0,
    marginHorizontal: responsiveHeight(3),
    borderRadius: 10,
    borderWidth: 3,
    borderLeftColor: '#e9e9e9',
    borderTopColor: '#e9e9e9',
    borderBottomColor: '#fcfcfc',
    borderRightColor: '#fcfcfc',
  },
  TextInput: {
    fontFamily: Fonts.FONT_MEDIUM,
    flex: 1,
    padding: 15,
  },
});

const Styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 13,
    marginTop: 15,
    marginLeft: 25,

    color: '#03041A',
  },
});
