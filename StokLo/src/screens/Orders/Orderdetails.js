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
import { responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Inputcard from '../../Components/Inputcard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../Styles/styles';
import Loader from '../../Components/Loader';
import { UploadService } from '../../api/UploadService';
import { CommonService } from '../../api/CommonService';
import { formatDate, formatDatetime } from '../../util/Utility';
export default function Orderdetails({navigation, props,route}) {

    const [order, setOrder] = useState(route?.params?.orderData);
    const [status, setStatus] = useState(route?.params?.status);
    const [orderdetails, setOrderdetails] = useState('');
let [isRefreshing, setIsRefreshing] = useState(false);
 
    const [fill, setFill] = useState(false);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    
    getorderdetails()
  }, [])
const getorderdetails = () => {
    if (!isRefreshing) {
      setIsLoading(true);
    }
    let url = `order-detail?&id=${order?.id}`;;
    try {
      CommonService.fetchGetApi(url).then((response) => {
        console.log("JHGFDGH",response)
        setIsLoading(false);
        setIsRefreshing(false);
        if (response.code == 200) {
      
            setOrderdetails(response?.data)

          
        } else {
          Utility.log("else", response);
        
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
    } catch (error) {
      Utility.log("Catch error:", error)
      setIsLoading(false);
      setIsRefreshing(false);
      // Utility.showToast(error)
    }
  }

Utility.log("orderdetailshai",status )

const totalAmount = Number(orderdetails?.itemAmount)-(Number(orderdetails?.walletAmount)+Number(orderdetails?.couponAmount))+Number(orderdetails?.deliveryAmount)+Number(orderdetails?.gst)
Utility.log("orderdetailshai",totalAmount,(Number(orderdetails?.walletAmount)+Number(orderdetails?.couponAmount)) )


const rendercart = ({ item }) => (
    <View style={{marginTop:15,borderBottomWidth:0.2,borderBottomColor:'#A1A2B2',paddingBottom:15}} >
   
<View style={{flexDirection:'row',flex:1}}>
<View style={{borderWidth:1,borderColor:"#A1A2B229",borderRadius:15, width: 100,
                    height: 100,alignItems:"center",justifyContent:"center"}}>
<FastImage
                  resizeMode='center'
                  style={{
                    width: 80,
                    height: 80,



                  }}
                  source={{uri:item?.productDetails?.productImage[0]?.productImage}}

                />
                </View>
                <View style={{flex:1,paddingHorizontal:15}}>
                    <Text style={[Styles.text,{fontSize:13,flex:1}]}>{item?.productDetails?.productName}</Text>
                    <Text
                    numberOfLines={1}
                     style={[Styles.date,{fontSize:11,fontFamily:Fonts.FONT_MEDIUM,flex:1}]}>{item?.productDetails?.productComposition}</Text>
                     <View style={{flexDirection:'row',justifyContent:"space-between",flex:1}}>
                     <Text style={[Styles.date,{fontSize:11,fontFamily:Fonts.FONT_MEDIUM}]}>
QTY:{' '}
<Text style={[Styles.date,{fontSize:11,fontFamily:Fonts.FONT_MEDIUM}]}>
 {item?.quantity}
</Text>
</Text>
 <Text style={[Styles.text]}>{`₹${item?.amount}`}</Text>
                     </View>
                </View>

</View>

    </View>
  );


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
                <Text style={{
fontFamily: Fonts.FONT_BOLD,
fontSize: 15,

color: "#000000",
marginLeft:10}}>
ORDER ID:{' '}
<Text style={{
fontFamily: Fonts.FONT_REGULAR,
fontSize: 14,

color: "#000000"}}>
 {order?.orderNo}
</Text>
</Text>
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
     >
     <View style={{marginBottom:50,paddingHorizontal:15,}}>
     <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 15, flex: 1}}>
          <Button


//  onPress={handlecontinue}
  text="Repeat this order"
  view={{marginHorizontal: responsiveHeight(0.7),backgroundColor:"#FFD2A8",borderColor:"#FFD2A8",paddingVertical:12}}
  textstyle={{color: "#000000",fontSize:14,fontFamily:Fonts.FONT_MEDIUM}}

/>
          </View>
          <View style={{marginTop: 15, flex: 1}}>
          <Button
            // onPress={handleFillLater}

              text="Help"
              view={{
                backgroundColor: '#FFFFFF',
                marginHorizontal: responsiveHeight(0.7),
                borderColor:"#FFD2A8",
                paddingVertical:12
              }}
              textstyle={{color: "#000000",fontSize:14,fontFamily:Fonts.FONT_MEDIUM}}
            />
           
          </View>
        </View>

        <View>
            <Text style={{color: "#4855F0",fontSize:13,fontFamily:Fonts.FONT_MEDIUM}}>Order status</Text>
        </View>

<View style={{marginTop:15}}>
<View>
<View style={{flexDirection:'row',alignItems:"center"}}>
{order?.status==1||order?.status==2||order?.status==3?<FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,


                  }}
                  source={require('../../assets/icons/orangeorder.png')}
                />:<FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,


                  }}
                  source={require('../../assets/icons/greyorder.png')}
                />}
                <View style={{marginLeft:15}}>
                <Text style={[Styles.text,{lineHeight:30}]}>Order Accepted</Text>
                <Text style={[Styles.date]}>{formatDatetime(orderdetails?.createdAt,"fulldate")}</Text>
{console.log("jsjsjsjssssss",formatDate(orderdetails?.createdAt,"fulldate"))}
                </View>
                </View>

             { order?.status==1||order?.status==2||order?.status==3?  <FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 52,


                  }}
                  source={require('../../assets/icons/orangelineorder.png')}
                />:<FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 52,


                  }}
                  source={require('../../assets/icons/greylineorder.png')}
                />}
</View>

<View>
<View style={{flexDirection:'row',alignItems:"center"}}>
{order?.status==2||order?.status==3?<FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,


                  }}
                  source={require('../../assets/icons/orangeorder.png')}
                />:<FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,


                  }}
                  source={require('../../assets/icons/greyorder.png')}
                />}
                <View style={{marginLeft:15}}>
                <Text style={[Styles.text,{lineHeight:30}]}>Order Shipped</Text>
                <Text style={[Styles.date]}>{orderdetails?.shippedDate?formatDatetime(orderdetails?.shippedDate,"fulldate"):null}</Text>

                </View>
                </View>

                {order?.status==2||order?.status==3? <FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 52,


                  }}
                  source={require('../../assets/icons/orangelineorder.png')}
                />:<FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 52,


                  }}
                  source={require('../../assets/icons/greylineorder.png')}
                />}
</View>



<View style={{flexDirection:'row',alignItems:"center"}}>
{order?.status==3?<FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,


                  }}
                  source={require('../../assets/icons/orangeorder.png')}
                />:<FastImage
                  resizeMode="contain"
                  style={{
                    width: 32,
                    height: 32,


                  }}
                  source={require('../../assets/icons/greyorder.png')}
                />}
                <View style={{marginLeft:15}}>
                <Text style={[Styles.text,{lineHeight:30}]}>Order Delivered</Text>
                <Text style={[Styles.date]}>{orderdetails?.deliveredDate?formatDatetime(orderdetails?.deliveredDate,"fulldate"):null}</Text>

                </View>


               
</View>

</View>
{orderdetails?.trackingId &&<View style={{marginTop:15}}>
<Text style={[Styles.text]}>Tracking ID:   <Text style={[Styles.bill,{fontFamily:Fonts.FONT_MEDIUM}]}>{`${orderdetails?.trackingId}`}</Text> </Text>
</View>}

<View style={{marginTop:10}}>
  <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
       <Text style={[Styles.text,{color:'#4855F0'}]}>Billing details</Text>
     
       </View>
       <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
       <Text style={[Styles.bill]}>Item price</Text>
       <Text style={[Styles.bill]}>{`₹${orderdetails?.itemAmount}`}</Text>

       </View>

      




       <View>
       <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
       <Text style={[Styles.bill]}>Offer Discount</Text>
       {/* <Text style={[Styles.bill]}>{`-₹${productlist?.calculatedAmount?.offerAmount}`}</Text> */}

</View>
<View style={{flexDirection:'row', justifyContent:'space-between',padding:10,width:responsiveWidth(60)}}>
  <Text style={[Styles.bill,{fontFamily:Fonts.FONT_SEMIBOLD}]}>Wallet Discount</Text>
  <Text style={[Styles.bill,{fontFamily:Fonts.FONT_SEMIBOLD}]}>{`-₹${orderdetails?.walletAmount}`}</Text>
  
</View>

{ orderdetails?.couponCode &&<View style={{flexDirection:'row', justifyContent:'space-between',padding:10,alignItems:"center",marginTop:-10,marginBottom:-14}}>
<View style={{padding:10,width:responsiveWidth(60),flexDirection:'row', justifyContent:'space-between',marginLeft:-10}}>
  <Text style={[Styles.bill,{fontFamily:Fonts.FONT_SEMIBOLD}]}>{orderdetails?.couponCode} </Text>
  <Text style={[Styles.bill,{fontFamily:Fonts.FONT_SEMIBOLD}]}>{`-₹${orderdetails?.couponAmount}`}</Text>
  </View>
 
</View>}
       </View>

       <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
       <Text style={[Styles.bill]}>Delivery charges</Text>
       <Text style={[Styles.bill]}>{`+₹${orderdetails?.deliveryAmount}`}</Text>

       </View>


       <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
       <Text style={[Styles.bill]}>GST(12%)</Text>
       <Text style={[Styles.bill]}>{`+₹${orderdetails?.gst}`}</Text>

       </View>

       <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
       <Text style={[Styles.text]}>TOTAL</Text>
       <Text style={[Styles.text]}>{`₹${totalAmount?.toFixed(2)}`}</Text>

       </View>

     </View>


     <View style={{marginTop:10}}>
            <Text style={{color: "#4855F0",fontSize:13,fontFamily:Fonts.FONT_MEDIUM}}>Items in order</Text>

            <FlatList
showsHorizontalScrollIndicator={false}
showsVerticalScrollIndicator={false}
scrollEnabled={false}
        data={orderdetails?.orderDetail}
        keyExtractor={(item) => item.id}
        renderItem={rendercart}
     
      />
        </View>

          </View>
          </ScrollView>
          
        
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
  date: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 13,
    color: '#2E304D',
  },
  bill: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 13,
    color: '#000000',
  },
  carttext: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 10,
    color: '#4855F0',
  },
  amount: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 15,
    color: '#03041A',
    marginTop: 5,
  },
});
