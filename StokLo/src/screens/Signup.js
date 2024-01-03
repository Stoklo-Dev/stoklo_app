import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import PlatformSpecificWrapper from '../PlatformSpecificWrapper';
import Fonts from '../constants/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Inputcard from '../Components/Inputcard';
import styles from '../Styles/styles';
import {useIsFocused} from '@react-navigation/native';

import Inputbox from '../Components/Inputbox';
import {Utility} from '../util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
export default function Signup({navigation, props, route}) {
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
console.log(jsonObject?.date);

  // console.log('heldldldl',jsonString);
  // console.log('heldldldl',jsonObject?.date[0]?.allow);
  const handlefilling = () => {
    // validate()
    navigation.replace('Completeprofile', {
      details: jsonObject?.date,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <PlatformSpecificWrapper style={{flex: 1}}>
        <View>
          <View>
            <Text style={Styles.text}>Enter your personal details</Text>
          </View>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#0000001A',
              marginTop: 15,
            }}></View>
        </View>

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Inputcard
            name="Retailer name"
            placeholdertext="Enter Here"
            //   maxLength={10}
            value={retailer}
            onChangeText={value => setRetailer(value)}
          />
          <Inputcard
            name="Aadhar number"
            placeholdertext="Enter Here"
            keyboardType="numeric"
            maxLength={16}
            value={aadhar}
            onChangeText={value => setAadhar(value)}
          />
          <Inputcard
            name="Email address"
            placeholdertext="Enter Here"
            //   maxLength={10}
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <Inputcard
            name="Phone number"
            placeholdertext="Enter Here"
            keyboardType="numeric"
            maxLength={10}
            value={mobile}
            onChangeText={value => setMobile(value)}
          />
          <Inputcard
            name="Shop location"
            placeholdertext="Enter Here"
            image
            onPress={adresss}
            editable={false}
            //   maxLength={10}
            value={shop}
            onChangeText={value => setShop(value)}
          />
          <Inputcard
            name="Refferal code(if any)"
            placeholdertext="Enter Here"
            //   maxLength={10}
            value={refferal}
            onChangeText={value => setRefferal(value)}
          />

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: responsiveHeight(3),
              marginTop: 10,
            }}>
            <Text style={Styles.terms}>You are agree to the platform's </Text>
            <TouchableOpacity
            //  onPress={() => navigation.navigate('WebViewContent', { url: TNC_URL })}
            >
              <Text
                style={[
                  Styles.terms,
                  {
                    color: '#29388E',
                    marginTop: 0,
                    textDecorationLine: 'underline',
                  },
                ]}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: responsiveHeight(3),
            }}>
            <Text style={Styles.terms}> or </Text>
            <TouchableOpacity
            // onPress={() => navigation.navigate('WebViewContent', { url: PRIVACY_URL })}
            >
              <Text
                style={[
                  Styles.terms,
                  {
                    color: '#29388E',
                    marginTop: 0,
                    textDecorationLine: 'underline',
                  },
                ]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text style={Styles.terms}> before proceeding. </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginTop: 15,
            }}>
            <TouchableOpacity onPress={() => setAllow(!allow)}>
              {allow ? (
                <FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,
                  }}
                  source={require('../assets/images/roundorange.png')}
                />
              ) : (
                <FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,
                  }}
                  source={require('../assets/images/roundgreyy.png')}
                />
              )}
            </TouchableOpacity>

            <Text
              style={[
                Styles.terms,
                {
                  marginLeft: 15,
                  alignSelf: 'center',
                  fontFamily: Fonts.FONT_MEDIUM,
                },
              ]}>
              Allow notification on whatsapp.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 10,
            }}>
            <TouchableOpacity onPress={() => setUpdates(!updates)}>
              {updates ? (
                <FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,
                  }}
                  source={require('../assets/images/roundorange.png')}
                />
              ) : (
                <FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,
                  }}
                  source={require('../assets/images/roundgreyy.png')}
                />
              )}
            </TouchableOpacity>

            <Text
              style={[
                Styles.terms,
                {
                  marginLeft: 15,
                  alignSelf: 'center',
                  fontFamily: Fonts.FONT_MEDIUM,
                },
              ]}>
              Get updates on email.
            </Text>
          </View>
        </KeyboardAwareScrollView>

        <View>
          <View style={{borderWidth: 1, borderColor: '#ffffff'}}></View>
          <View
            style={{
              marginTop: 6,
              marginHorizontal: responsiveHeight(3),
            }}>
            <TouchableOpacity
                onPress={handlefilling}
              style={[styles.button]}>
              <Text
                style={[
                  styles.btnText,
                  {fontFamily: Fonts.FONT_BOLD, color: '#FFFFFF'},
                ]}>
                Continue filling
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </PlatformSpecificWrapper>
    </TouchableWithoutFeedback>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    marginTop: 15,
    marginLeft: 20,

    color: '#03041A',
  },
  bottomView: {
    position: 'absolute',
    alignSelf: 'center',

    top: Platform.OS == 'ios' ? 60 : 60,
  },
  title: {
    fontFamily: Fonts.FONT_SEMIBOLD,
    fontSize: 13,
    lineHeight: 22,
    color: '#4855F0',
    marginBottom: 10,
  },
  terms: {
    fontFamily: Fonts.FONT_SEMIBOLD,
    fontSize: 13,
    // marginTop: 15,
    lineHeight: 20,

    color: '#03041A',
  },
});
