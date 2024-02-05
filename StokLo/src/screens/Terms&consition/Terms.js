import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import PlatformSpecificWrapper from '../../PlatformSpecificWrapper';
import Fonts from '../../constants/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Inputcard from '../../Components/Inputcard';
import styles from '../../Styles/styles';
import {useIsFocused} from '@react-navigation/native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
export default function Terms({navigation, props, route}) {
  const languageschanges = useRef();
  const {height, width} = Dimensions.get('window');
  const [retailer, setRetailer] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [shop, setShop] = useState('');
  const [refferal, setRefferal] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const screenwidth = width * 0.88;
  const rbsheetheight = height * 0.67;
  const [allow, setAllow] = useState(false);
  const [updates, setUpdates] = useState(false);
  const isFocused = useIsFocused();
  // const route = useRoute();
  //   console.log("qwejnckjncjdbncj", route)

  useEffect(() => {
    if (isFocused) {
      setShop(route?.params?.data?.description);
      setLatitude(route?.params?.details?.geometry?.location?.lat);
      setLongitude(route?.params?.details?.geometry?.location?.lng);
      route.params = null;
    }
  }, [isFocused]);
  const adresss = () => {
    navigation.navigate('MapScreen');
  };
  console.log('adresssss', shop);
  const handleKeyboardDismiss = () => {
    // Dismiss the keyboard when tapping outside the text input
    Keyboard.dismiss();
  };
 
  const data = {
    retailer,
    aadhar,
    email,
    mobile,
    refferal,
    allow,
    updates,
  };

  const dataArray = [
    data
  ];
  

  const jsonString = JSON.stringify({ date: dataArray });
  const jsonObject = JSON.parse(jsonString);
console.log('jsjskskskks',route.params?.privacy);

  // console.log('heldldldl',jsonString);
  // console.log('heldldldl',jsonObject?.date[0]?.allow);
  const handlefilling = () => {
    // validate()
    navigation.replace('Completeprofile', {
      details: jsonObject?.date,
    });
  };
  return (

      <PlatformSpecificWrapper style={{flex: 1}}>
   <View>
          <View style={{flexDirection:'row',alignItems:"center",paddingHorizontal:15}}>
          <TouchableOpacity   
          onPress={()=>navigation.goBack()}
          >
          <FastImage
                  resizeMode="contain"
                  style={{
                    width: 42,
                    height: 42,


                  }}
                  source={require('../../assets/icons/arrowback.png')}
                />
                </TouchableOpacity>
        <Text style={Styles.text}> Terms & Conditions</Text>
            </View>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#0000001A',
              marginTop: 10,
            }}></View>
               </View>
               <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{marginTop:28,paddingHorizontal:20}}>
        <View style={{flexDirection:'row',alignItems:"center"}}>
        <Text style={Styles.title}>Review Terms & Conditions</Text>
        <FastImage
                  resizeMode="contain"
                  style={{
                    width: 72,
                    height: 32,
                    marginLeft:20


                  }}
                  source={require('../../assets/icons/line.png')}
                />

</View>

<Text style={Styles.terms}>Lorem ipsum dolor sit amet consectetur. Etiam justo nunc maecenas nulla eget in sed imperdiet nam. Id tellus quis justo massa. Nunc varius commodo enim ullamcorper nam. Praesent ultrices convallis ornare non purus nullam pretium. Sit molestie nulla elit mattis porttitor malesuada enim. Porttitor erat ornare amet consectetur a aliquam sit. Porttitor fermentum pharetra turpis velit eget blandit molestie diam. Dapibus ultrices auctor cras pellentesque. Enim id tempor risus augue at tristique vel egestas in. Rutrum etiam.</Text>


<View style={{flexDirection:'row',alignItems:"center",marginTop:20}}>
        <Text style={Styles.title}>Review Terms & Conditions</Text>
        <FastImage
                  resizeMode="contain"
                  style={{
                    width: 72,
                    height: 32,
                    marginLeft:20


                  }}
                  source={require('../../assets/icons/line.png')}
                />

</View>

<Text style={Styles.terms}>Lorem ipsum dolor sit amet consectetur. Etiam justo nunc maecenas nulla eget in sed imperdiet nam. Id tellus quis justo massa. Nunc varius commodo enim ullamcorper nam. Praesent ultrices convallis ornare non purus nullam pretium. Sit molestie nulla elit mattis porttitor malesuada enim. Porttitor erat ornare amet consectetur a aliquam sit. Porttitor fermentum pharetra turpis velit eget blandit molestie diam. Dapibus ultrices auctor cras pellentesque. Enim id tempor risus augue at tristique vel egestas in. Rutrum etiam.</Text>


     

        </View>
        </ScrollView>
      </PlatformSpecificWrapper>

  );
}

const Styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
marginLeft:16,
   

    color: '#03041A',
    alignItems:"center",
  },
  bottomView: {
    position: 'absolute',
    alignSelf: 'center',

    top: Platform.OS == 'ios' ? 60 : 60,
  },
  title: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    lineHeight: 22,
    color: '#000000',

  },
  terms: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 13,
    // marginTop: 15,
    lineHeight: 23,

    color: '#2E304D',
    marginTop:5
  },
});
