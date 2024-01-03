import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,

  Image,
 
  StyleSheet,
  Linking,
  AppState,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
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
import FastImage from 'react-native-fast-image';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../Components/Button';
import Inputbox from '../Components/Inputbox';
import { Utility } from '../util';
import i18next ,{languageResources} from "../../services/i18next";
import { useTranslation } from 'react-i18next';
import languagesList from "../../services/languagesList.json"
import { useDispatch, useSelector } from 'react-redux';
import { addlanguage, loadLanguage } from '../newredux/Myproducts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UploadService } from '../api/UploadService';
import Loader from '../Components/Loader';
import messaging from '@react-native-firebase/messaging';

import notifee, { EventType } from '@notifee/react-native';


export default function Login({navigation, props,route}) {
  const {t}=useTranslation()
let [isRefreshing, setIsRefreshing] = useState(false);

  const languageschanges = useRef();
  const {height, width} = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(false);
  const [changenumber, setChangenumber] = useState(route?.params?.changenumber);
  const [mobile, setMobile] = useState(route?.params?.changenumber||'');

  const screenwidth = width * 0.88;
  const rbsheetheight = height * 0.67;
  const [otp, setOtp] = useState('');


 const currentLanguage = useSelector((state) => state.addlanguage)
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const LANG_STORAGE_KEY = "selectedLanguage";
  const dispatch = useDispatch();
  useEffect(() => {

    AsyncStorage.getItem(LANG_STORAGE_KEY)
      .then((language) => {
        if (language) {
          setSelectedLanguage(language);
          dispatch(addlanguage(language)); 
    i18next.changeLanguage(language)



        } else {
          setSelectedLanguage('en');

          
        }
      })
      .catch((error) => {
        console.error("Error loading language from AsyncStorage:", error);
      });
  }, [dispatch]);

  //static langugaes flatlist
console.log("mjsdkskskks",currentLanguage)


const [FCMToken, setFCMToken] = useState('');






useEffect(() => {

    requestUserPermission();
// getFCMToken()
  }, [])
  
  
  
  const requestUserPermission = async () => {
    try {
      // Check if the app has notification permissions
      const enabled = await messaging().hasPermission();

      if (enabled) {
        console.log('Permission already granted');
        getFCMToken();
      } else {
        // If permissions are not granted, request them explicitly
        const permissionStatus = await messaging().requestPermission();
        
        if (permissionStatus) {
          console.log('Permission granted');
          getFCMToken();
        } else {
          console.log('Permission denied');
          Alert.alert(
            'Permission Required',
            'Please enable notifications in your device settings to receive push notifications.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        }
      }
    } catch (error) {
      console.error('Error checking or requesting permission:', error);
    }
  };

  
  const getFCMToken = async () => {
    Utility.log("hi token available.");

    try {

        const token = await messaging().getToken();
        if (token) {
            Utility.log("Device Token:", token);
            Utility.setValueInAsyncStorage("FCMToken", token)
            setFCMToken(token);
        } else {
            Utility.log("No device token available.");
        }
    } catch (error) {
        Utility.log('Error getting device token:', error);
    }
  };


//   const foregroundNotification = async () => {
//     const channelId = await notifee.createChannel({
//         id: 'default',
//         name: 'Default Channel',
//         sound: 'default'
//     });
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//         console.log('Push Notification Foreground', JSON.stringify(remoteMessage));
//         await notifee.displayNotification({
//             title: remoteMessage?.notification?.title,
//             body: remoteMessage?.notification?.body,
//             // data: remoteMessage?.data,
//             android: {
//                 channelId: channelId,
//                 // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
//                 // pressAction is needed if you want the notification to open the app when pressed
//                 pressAction: {
//                     id: 'default',
//                 },
//                 importance: 4
//             },
//         });
//     });
//     return unsubscribe;
// }


  const languages = [
    {id: '1', name: 'English'},
    {id: '2', name: 'Hindi'},
    {id: '3', name: 'Assamese'},
  ];

  const handleLanguageSelection = language => {
    // console.log("kdkdkdkdkd",Object.keys(languageResources))
    setSelectedLanguage(language);

  };

  const apply = () => {
    languageschanges.current.close();
    if(selectedLanguage){
      i18next.changeLanguage(selectedLanguage)
      dispatch(addlanguage(selectedLanguage)) 
    }
   


  };
const handlelogin=  async ()=>{
  if (!mobile) {
    Utility.showToast('Please enter your mobile number');
    return;
} else if (!/^[0-9]*$/.test(mobile) || mobile.length !== 10 || /^0+/.test(mobile) || /^[1-4]/.test(mobile)) {
  Utility.showToast('Please enter a valid mobile number');
  return;
}
{console.log("smssksksksksksks token hu")}

setIsLoading(true);
        let data = {
            'mobile_number': mobile,
           "fcmToken":FCMToken
        }

        let url = 'login';
        Utility.log(url, data)

        UploadService.fetchPostFormData(url, data).then((response) => {
            console.log("KAKAKAKAKAKAKA", JSON.stringify(response))
            setIsLoading(false);
            if (response.code == 200) {
              console.log('ksksksksk',response.data.otp)
                setOtp(response.data.otp)
                navigation.navigate("Otpverify",{
                      mobile: mobile,
                      otp:response?.data?.otp
                    })
                    Utility.showToast('OTP sent successfully')
           
             
            } else {
                Utility.showToast(response?.message);
                // if (response.code == 402) {
                //   Utility.Logout(props.navigation, response);
                // }
            }
        })
        .catch((error) => {
          // Handle the promise rejection here
            if (error.code == 402) {
                Utility.showToast(error?.message);
                navigation.dispatch(
                  CommonActions.reset({
                      index: 0,
                      routes: [
                          { name: 'Login' }
                      ]
                  })
              )
              }
          Utility.log("Promise rejection:", error);
          setIsLoading(false);
          setIsRefreshing(false);
          // Handle other error cases if needed
        });
    }
    







// const handlelogin=()=>{
//   // validate()
//   navigation.replace("Otpverify",{
//     mobile: mobile,
//   })
  
// }
  return (
    <PlatformSpecificWrapper  style={{flex: 1}}>
      <View style={{flex:1}} >
        <View style={{marginTop: 52, marginLeft: 10}}>
          <Image
            source={require('../assets/images/mainn.png')}
            resizeMode="contain"
            style={{height: responsiveHeight(13)}}
          />
        </View>
        <View style={{marginLeft: 25}}>
          <Text style={Styles.text}>{t('Login')}</Text>
        </View>
        <View >
          <Inputcard
            placeholdertext="Enter Here"
            keyboardType="numeric"
            maxLength={10}
            value={mobile}
                                onChangeText={(value) => setMobile(value)}
          />
        </View>
        <View
          style={{
            // flex: 1,
            marginHorizontal: responsiveHeight(3),
            marginTop: 20,
          }}>
          <TouchableOpacity 
          onPress={handlelogin}
            style={[styles.button]}>
            <Text
              style={[
                styles.btnText,
                {fontFamily: Fonts.FONT_BOLD, color: '#FFFFFF'},
              ]}>
             {t('otp')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
      style={{}}
        >
        <Image
          source={require('../assets/images/rbsheet.png')}
          resizeMode="contain"
          style={{height: responsiveHeight(13),alignSelf:'center'}}
        />
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',

          }}>
          <TouchableOpacity
            onPress={() => {
              languageschanges.current.open();
            }}>
            <FastImage
              resizeMode="contain"
              style={{
                width: 32,
                height: 32,
                marginTop: 10,
              }}
              source={require('../assets/images/language.png')}
            />
          </TouchableOpacity>
        </View>
       
        <View style={Styles.bottomView}>
        <TouchableOpacity
            onPress={() => {
              languageschanges.current.open();
            }}>
          <Text style={Styles.title}>{t('change-language')}</Text>
          </TouchableOpacity>
        </View>
      
      </View>

      <RBSheet
        ref={languageschanges}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          container: {
            height: rbsheetheight,
            borderColor: 'grey',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,

            backgroundColor: 'transparent',
          },
          wrapper: {
            backgroundColor: '#00000099',
          },
        }}>
        <View style={{flex: 1}}>
          <Text></Text>
          <Text></Text>

          <View
            style={{
              flex: 1,
              backgroundColor: '#F2F2F2',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  {
                    languageschanges.current.close();
                    // setSelectedLanguage(null);
                  }
                }}
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#F2F2F2',
                  borderRadius: 60 / 2,
                  alignItems: 'center',
                  marginTop: -25,
                  height: 60,
                  width: 60,
                }}>
                <FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,
                    marginTop: 10,
                  }}
                  source={require('../assets/images/language.png')}
                />
              </TouchableOpacity>
              <View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[
                      Styles.title,
                      {fontFamily: Fonts.FONT_SEMIBOLD, fontSize: 17},
                    ]}>
                    {t('change-language')}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{flex: 1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={Object.keys(languageResources)}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={()=>handleLanguageSelection(item)}>
                  <Inputbox
                    language={languagesList[item].nativeName}
                    isSelected={selectedLanguage === item}
                    onSelect={() => handleLanguageSelection(item)}
                  />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{marginTop: 10}}>
            
              <Button text="Apply" onPress={apply} />
              
            </View>
          </View>
        </View>
      </RBSheet>
      {
                isLoading && <Loader />
            }
    </PlatformSpecificWrapper>
  );
}

const Styles = StyleSheet.create({
  text: {
    width: 172,
    height: 64,
    fontFamily: Fonts.FONT_SEMIBOLD,
    fontSize: 24,
    marginTop: 15,
    marginBottom: 15,
    lineHeight: 32,
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
});
