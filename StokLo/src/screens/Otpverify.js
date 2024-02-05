import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,

  StyleSheet,
 
  TouchableOpacity,

  Dimensions,

} from 'react-native';
import PlatformSpecificWrapper from '../PlatformSpecificWrapper';
import Fonts from '../constants/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Inputcard from '../Components/Inputcard';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles/styles';

import { Utility } from '../util';
import Loader from '../Components/Loader';
import { UploadService } from '../api/UploadService';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { adduser } from '../newredux/Userdata';
export default function Otpverify({navigation, props,route}) {

  const dispatch = useDispatch();
  const languageschanges = useRef();
  const {height, width} = Dimensions.get('window');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [UserData, setUserdata] = useState('');
  const [number, setNumber] = useState(route?.params?.mobile);
  const [otphai, setOtphai] = useState(route?.params?.otp);
  let [defaultotp, setDefaultotp] = useState();
  const {t}=useTranslation()
console.log('otpppppp',otphai)
const [isLoading, setIsLoading] = useState(false);
const userdata = useSelector((state) => state?.adduser)



const [otp, setOtp] = useState('');
const [otp1, setOtp1] = useState('');
const [otp2, setOtp2] = useState('');
const [otp3, setOtp3] = useState('');
const fullNumber = otp?.toString() + otp1?.toString() + otp2?.toString() + otp3?.toString();

console.log("ksksksks",fullNumber)
  const screenwidth = width * 0.88;
  const rbsheetheight = height * 0.67;
  const [countdown, setCountdown] = useState(30);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000); // Decrease countdown every second

      return () => {
        clearInterval(timer); // Clear the timer when the component unmounts
      };
    }
  }, [countdown]);
  useEffect(() => {

    getFirstTimeUser();

}, [])
  const getFirstTimeUser = async () => {
    let isFirstTimeUser = await Utility.getValueFromAsyncStorage('FirstTimeUser');
    if (isFirstTimeUser == 'false') {
        setIsFirstTime(false)
    } else {
        setIsFirstTime(true)
    }
}

const handlelogin=()=>{
 navigation.navigate("Completeprofile")
  
}

console.log('jssjjs',number)
//handle resend otp
const handleResendOTP=  async ()=>{


setIsLoading(true);
        let data = {
            'mobile_number': number,
           
        }
        let url = 'login';
        Utility.log(url, data)

        UploadService.fetchPostFormData(url, data).then((response) => {
          // console.log("DJDJDJFJ", JSON.stringify(response))
            setIsLoading(false);
            if (response.code == 200) {
       
              setDefaultotp(response.data.otp)
                    Utility.showToast('OTP resend successfully')
                    setCountdown(30);
           
             
            } else {
                Utility.showToast(response?.message);
            }
        })
            .catch((error) => {
                Utility.log("LoginError:", error);

            });
    }




const input1Ref = useRef(null);
const input2Ref = useRef(null);
const input3Ref = useRef(null);
const input4Ref = useRef(null);

const handleInputChange = (value, currentRef, prevRef) => {
  if (!value && prevRef?.current) {
    prevRef?.current?.focus();
  } else {
    currentRef?.current && currentRef?.current?.focus();
  }
};
//handle verify ot

const handleverifyotp=  async ()=>{



if(!fullNumber){
  Utility.showToast("Please Enter OTP")
  return
}
setIsLoading(true);

          let data = {
              'mobile_number': number,
              otp:fullNumber
          }
          let url = 'verify-otp';
          Utility.log(url, data)
  
          UploadService.fetchPostFormData(url, data).then((response) => {
            console.log("DJDJDJFJ", JSON.stringify(response))
              setIsLoading(false);
              if (response.code == 200) {
         
                if (response?.data?.user?.isOtpVerify) {
                  Utility.setValueInAsyncStorage('TOKEN', (response?.data?.token));
                  console.log("Dispatching user data:", response?.data?.token);
                  Utility.setValueInAsyncStorage('UserData', JSON.stringify(response?.data?.user));
                  if(response?.data?.user?.retailerName){
                    Utility.setValueInAsyncStorage("IsLogin",'true');
                  }
                  dispatch(adduser((response?.data?.user)));
                  navigation.replace(response?.data?.user?.retailerName ? 'BottomTab' : 'Completeprofile',{
                    number: number,
                    // otp:response?.data?.otp
                  })

                    // navigation.replace({
                    //       index: 0,
                    //       routes: [
                    //           { name: response?.data?.user?.retailerName ? 'BottomTab' : 'Completeprofile',
                    //           params: { number } }
                             

                    //       ]
                    //   })


                  Utility.showToast("OTP verified successfully")
              } else {
                  Utility.showToast(response?.message);
                  // if (response.code == 402) {
                  //   Utility.Logout(props.navigation, response);
                  // }
                  
              }

              Utility.setValueInAsyncStorage('FirstTimeUser', 'false');

                    
             
               
              } else {
                  Utility.showToast(response?.message);
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


  return (
    <PlatformSpecificWrapper style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{marginTop: 34,alignSelf:'center'}}>
        <Text style={Styles.otptext}>{t('verification')}</Text>
         
        </View>
        <View style={{alignSelf:'center'}}>
          <Text style={Styles.text}>{t('sent')}
</Text>
        </View>
        <View style={{alignSelf:'center'}}>
          <Text style={Styles.text}>xxx-xxxx-{number.slice(-4)}
</Text>
        </View>
        <View
          style={{
        
            marginHorizontal: responsiveHeight(16),
            marginTop: 14,
          }}>
          <TouchableOpacity 
          onPress={()=>navigation.replace('Login',{
                      changenumber: number,
                     
                    })}
            style={[Styles.button]}>
            <Text
              style={[
                Styles.btnText,
                {fontFamily: Fonts.FONT_BOLD, color: '#FFFFFF'},
              ]}>
             {t('change number')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row',justifyContent:"space-between",paddingHorizontal:35}} >
        <Inputcard

        reff={input1Ref}
        placeholdertext="Enter Here"
        keyboardType="numeric"
        maxLength={1}
        value={otp}
        onChangeText={(value) => {
            setOtp(value.replace(/[\s,.\-]/g, ''));
            handleInputChange(value.replace(/[\s,.\-]/g, ''), input2Ref, input1Ref);
          }}
        otp
      />
      <Inputcard


        reff={input2Ref}
        placeholdertext="Enter Here"
        keyboardType="numeric"
        maxLength={1}
        value={otp1}
        onChangeText={(value) => {
            setOtp1(value.replace(/[\s,.\-]/g, ''));
            handleInputChange(value.replace(/[\s,.\-]/g, ''), input3Ref, input1Ref);
          }}
        otp
      />
      <Inputcard


        reff={input3Ref}
        placeholdertext="Enter Here"
        keyboardType="numeric"
        maxLength={1}
        value={otp2}
        onChangeText={(value) => {
            setOtp2(value.replace(/[\s,.\-]/g, ''));
            handleInputChange(value.replace(/[\s,.\-]/g, ''), input4Ref, input2Ref);
          }}
        otp
      />
      <Inputcard


        reff={input4Ref}
        placeholdertext="Enter Here"
        keyboardType="numeric"
        maxLength={1}
        value={otp3}
        onChangeText={(value) => {
            setOtp3(value.replace(/[\s,.\-]/g, ''));
            handleInputChange(value.replace(/[\s,.\-]/g, ''), null, input3Ref);
          }}
        otp
      />
        </View>

       {countdown==0? 
        <View
          style={{
        
            marginHorizontal: responsiveHeight(16),
            marginTop:46
          }}>
          <TouchableOpacity 
       onPress={handleResendOTP}
            style={[Styles.button]}>
            <Text
              style={[
                Styles.btnText,
                {fontFamily: Fonts.FONT_BOLD, color: '#FFFFFF'},
              ]}>
            {t('resend')}
            </Text>
          </TouchableOpacity>
        </View> 
        :
        <View style={{alignSelf:'center',marginTop:46}}>
          <Text style={Styles.resend}>Resend OTP in {countdown}sec
</Text>
        </View>}

        
        <View
          style={{
        
            marginHorizontal: responsiveHeight(3),
            marginTop: 54,
          }}>
          <TouchableOpacity 
          onPress={handleverifyotp}
            style={[styles.button]}>
            <Text
              style={[
                styles.btnText,
                {fontFamily: Fonts.FONT_BOLD, color: '#FFFFFF'},
              ]}>
           {t('otp1')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {
                isLoading && <Loader />
            }
    </PlatformSpecificWrapper>
  );
}

const Styles = StyleSheet.create({
  otptext: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 25,

    lineHeight: 25,
    textAlign: "center",
    color: "#03041A"
  },
  text: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 15,


    lineHeight: 31,
    textAlign: "center",
    color: "#2E304D"
  },
  resend: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 15,


   
    textAlign: "center",
    color: "#A1A2B2"
  },
  button: {
    borderRadius: 5,
backgroundColor:'#FF8F28',
    paddingVertical: 5,
    borderColor: '#FF8F28',
    borderWidth: 1,
    marginBottom: 13,
    // marginTop:-10

},
btnText: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 11,

    textAlign: 'center',

    // borderWidth:1,

},
});
