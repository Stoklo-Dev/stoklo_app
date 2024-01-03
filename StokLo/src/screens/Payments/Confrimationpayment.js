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
} from 'react-native';

import Threeicons from '../../Components/Threeicons';
import PlatformSpecificWrapper from '../../PlatformSpecificWrapper';
import Button from '../../Components/Button';
import { Utility } from '../../util';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../newredux/Userdata';
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
export default function Confrimationpayment({navigation, props,route}) {
  const [orderid, setOrderid] = useState(route?.params?.response);
  const [selected, setSelected] = useState(false);


    const [fill, setFill] = useState(false);
const [isLoading, setIsLoading] = useState(false);
 


// console.log('hshsgsgs',)


      //api for help support

      
    
    
      const handlego = () => {
    
        Utility.setValueInAsyncStorage('Isfirsttime','false');

    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'BottomTab',
                }
               

            ]
        })
    )
       
    }

const handleprocced=()=>{
  setSelected(!selected)
}

  return (
    <PlatformSpecificWrapper  style={{flex: 1}}>
    
   
          

   <View style={{flex:0.9,alignItems:'center',justifyContent:"center",}}>
   <Text style={Styles.header}>Your order has been placed</Text>
   <View>
   <FastImage
                  resizeMode="contain"
                  style={{
                    width: 290,
                    height: 290,


                  }}
                  source={require('../../assets/icons/paymentimage.png')}
                />
   </View>
   <View>
   <Text style={[Styles.text,{color:'#4855F0'}]}>Thank you for your purchase</Text>
   </View>
   <View style={{marginTop:10}}>
   <Text style={{
fontFamily: Fonts.FONT_BOLD,
fontSize: 17,

color: "#000000"}}>
ORDER ID:{' '}
<Text style={{
fontFamily: Fonts.FONT_BOLD,
fontSize: 17,

color: "#000000"}}>
 {orderid?.data?.orderNo}
</Text>
</Text>
   </View>

   <View style={{marginTop:15}}>
   <Text style={[Styles.bootomtext]}>You will receive an order confirmation message</Text>
   <Text style={[Styles.bootomtext,{alignSelf:'center'}]}>with details of your order.</Text>
   </View>
   <View style={{marginTop: 45}}>
            <Button


             onPress={handlego}
              text="Go to Dukaan"
              view={{backgroundColor:"#4855F0",borderColor:"#4855F0"}}
              textstyle={{paddingHorizontal:30}}
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
  bootomtext: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 13,
    color: '#000000',
  },
});
