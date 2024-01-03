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
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Threeicons from '../../Components/Threeicons';
import PlatformSpecificWrapper from '../../PlatformSpecificWrapper';
import Button from '../../Components/Button';
import { Utility } from '../../util';
import { useDispatch } from 'react-redux';
import Userdata, { logoutUser } from '../../newredux/Userdata';
import { CommonActions } from '@react-navigation/native';
import Fonts from '../../constants/Fonts';
import FastImage from 'react-native-fast-image';
import { responsiveHeight, responsiveScreenHeight } from 'react-native-responsive-dimensions';
import Inputcard from '../../Components/Inputcard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../Styles/styles';
import Loader from '../../Components/Loader';
import { UploadService } from '../../api/UploadService';
import Inputbox from '../../Components/Inputbox';
import { SelectCountry } from 'react-native-element-dropdown';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import CryptoJS from 'crypto-js';
import { encode } from 'base-64';
import { CommonService } from '../../api/CommonService';
export default function Paymentscreen({navigation, props,route}) {
  const [total, setTotal] = useState(route?.params?.totalamount);
  const [coupencode, setCoupencode] = useState(route?.params?.coupencode);
  const [name, setName] = useState(route?.params?.coupenname);
  const [gst, setGst] = useState(route?.params?.gst);
  const [wallet, setWallet] = useState(route?.params?.wallet);
  const [selected, setSelected] = useState(false);
  const [orderid, setOrderid] = useState('');
  const [html, setHtml] = useState('');
  const [userData, setUserData] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState(null);

    const [fill, setFill] = useState(false);
const [isLoading, setIsLoading] = useState(false);
let [isRefreshing, setIsRefreshing] = useState(false);

const data = [
  { id: '1', name: 'Cash On Delivery', image: require("../../assets/icons/cod.png") },


];
useEffect(() => {
  // Check if API state is true
getuserdetails()
}, []);

console.log("ksksksksshayyaa",wallet)
const getuserdetails = () => {
  if (!isRefreshing) {
    setIsLoading(true);
  }
  let url = `user-detail`;
  try {
    CommonService.fetchGetApi(url)
      .then(response => {
        console.log('JHGFDGH', response);

        if (response.code == 200) {
          // setUserdetails(response?.data);
          setIsLoading(false);
          setIsRefreshing(false);
          setUserData(response?.data)

        } else {
          Utility.log('else', response);
        }
      })
      .catch(error => {
        Utility.log('Promise rejection:', error);
        // Handle the promise rejection here
        if (error.code == 402) {
          Utility.showToast(error?.message);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Login'}],
            }),
          );
        }
        setIsLoading(false);
        setIsRefreshing(false);

        // Handle other error cases if needed
      });
  } catch (error) {
    Utility.log('Catch error:', error);
    setIsLoading(false);
    setIsRefreshing(false);
    // Utility.showToast(error)
  }
};

console.log("hshshshshshs",userData?.retailerName,userData?.mobileNumber)
const handleasych = async (response) => {

  await Utility.removeItemAsyncStorage('quantityList');

  navigation.dispatch(
    CommonActions.reset({
        index: 0,
        routes: [
            { name: 'Confrimationpayment',
            params: { response } }
           

        ]
    })
)
}




      //api for help support

     

    
      const handlecod = () => {
    console.log("jsjsjsjjjs")
    
        let data = {
          coupon: name,
          // aadharNumber: aadhar,
          couponCodeAmount: coupencode,
          gstAmount: gst,
          totalAmount:total,
          walletAmount:wallet

        
           
        }
      
        console.log("helshshshlo",data)
    
        setIsLoading(true);
        let url = 'create-order';
        UploadService.fetchPostFormData(url,data).then((response) => {
            setIsLoading(false);
            if (response.code == 200) {
                Utility.showToast(response?.message);
               setOrderid(response?.data?.orderNo)
               handleasych(response)
        // console.log("hshshstgs",response?.data?.orderNo,orderid)

       
    
    
            } else {
                Utility.showToast(response?.message);
                Utility.log("hipaynow")
                // if (response.code == 402) {
                //     Utility.Logout(navigation, response);
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




 
  
  const handleLanguageSelection = language => {
    console.log("kdkdkdkdkd",language)
    setSelectedLanguage(language);

  };

const handleprocced=()=>{
  setSelected(!selected)
}

  return (
    <PlatformSpecificWrapper  style={{flex: 1}}>
    
    <View>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:"center"}}>
          <TouchableOpacity   
          onPress={()=>{navigation.goBack()
          }}
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
        <Text style={Styles.header}>Pay now</Text>
                </View>
                
          </View>
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#0000001A',
              marginTop: 15,
            }}></View>
        </View>
          

    <ScrollView

    
    showsVerticalScrollIndicator={false}
     contentContainerStyle={{ flex: 1}}>
    <View style={{paddingHorizontal:25}}>
    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
       <Text style={[Styles.text,{color:"#2E304D"}]}>Payable amount</Text>
       <Text style={[Styles.text]}>{`₹${total?.toFixed(2)}`}</Text>

       </View>
       <View style={{marginTop:15,marginHorizontal:responsiveHeight(-2)}}>


       <View >
       {console.log("jshsgsgss",data)}
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={()=>handleLanguageSelection(item?.name)}>
                  <Inputbox
                    payment
                    language={item?.name}
       image={item?.image}

                    isSelected={selectedLanguage === item?.name}
                    onSelect={() => handleLanguageSelection(item?.name)}
                  />
                  </TouchableOpacity>
                )}
              />
            </View>
       {/* <Inputbox
       payment
       image={require('../../assets/icons/cod.png')}
                    language='Cash On Delivery'
                    isSelected={selected}
                    onSelect={handleprocced}
                  /> */}
       </View>

    </View>
          </ScrollView>
          
          <View>
          <View style={{borderWidth: 1, borderColor: '#ffffff'}}></View>
          <View style={{marginTop: 15}}>
            <Button

             disabled={selectedLanguage?false:true}
             onPress={handlecod}
              text="Pay Now"
              view={{backgroundColor:selectedLanguage?"#4855F0":"grey",borderColor:selectedLanguage?"#4855F0":"grey"}}
            />
          </View>
        </View>
        {
                isLoading && <Loader />
            }
    </PlatformSpecificWrapper>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 15,
    color: '#03041A',
  },
  header: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    color: '#03041A',
    marginLeft:10, 
  },
});
