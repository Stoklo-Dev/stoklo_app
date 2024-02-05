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

import Threeicons from '../../Components/Threeicons';
import PlatformSpecificWrapper from '../../PlatformSpecificWrapper';
import Button from '../../Components/Button';
import { Utility } from '../../util';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../newredux/Userdata';
import { CommonActions } from '@react-navigation/native';
import Fonts from '../../constants/Fonts';
import FastImage from 'react-native-fast-image';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import Confrimationpopup from '../../Components/Confrimationpopup';
import Ordercartbox from '../../Components/Ordercartbox';
import Loader from '../../Components/Loader';
import { useIsFocused } from '@react-navigation/native';
import { CommonService } from '../../api/CommonService';
import { RefreshControl } from 'react-native-gesture-handler';
export default function Orders({navigation, props}) {
  const dispatch = useDispatch();
  const [orderhistorylist, setOrderhistorylist] = useState(null);
  const [historydetails, setHistorydetails] = useState(null)
  const isFocused = useIsFocused();
let [page, setPage] = useState(1);
let [status, setStatus] = useState('');
let [isRefreshing, setIsRefreshing] = useState(false);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  page = 1
  setPage(1);
  getorderhistory()
}, [])

const onRefresh = () => {
  isRefreshing = true;
  setIsRefreshing(true);
  setPage(1);
  page = 1
  getorderhistory()
}
console.log('shsysjsjgdsb',historydetails)

const loadMoreData = () => {
  if (page <= Math.ceil(orderhistorylist?.count / 3) && orderhistorylist?.rows?.length >= 3) {
    page = page + 1
    setPage(page + 1);
    getorderhistory()

  }
};


const getorderhistory = () => {
  if (!isRefreshing) {
    setIsLoading(true);
  }
  let url = `order-history?&status=${status}&page=${page}`;
  console.log('ksksjyenes',url)
  try {
    CommonService.fetchGetApi(url).then((response) => {
      setIsLoading(false);
      setIsRefreshing(false);
      if (response.code == 200) {
        if (historydetails?.length > 0 && page > 1) {
          setOrderhistorylist(response?.data)
          setHistorydetails([...historydetails, ...response?.data?.rows])
        } else {
          setOrderhistorylist(response?.data)
          setHistorydetails(response?.data?.rows)
        }
      } else {
        Utility.log("else", response);
        // if (response.code == 402) {
        //   Utility.Logout(props.navigation, response);
        // }
      }
    }) .catch((error) => {
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
    setIsLoading(false);
    setIsRefreshing(false);
    Utility.log("Catch error:", error)
    // Utility.showToast(error)
  }
}
// const totalAmount = Number(orderdetails?.itemAmount)-(Number(orderdetails?.walletAmount)+Number(orderdetails?.couponAmount))+Number(orderdetails?.deliveryAmount)+Number(orderdetails?.gst)
console.log("hejsjsjsksks",JSON.stringify(historydetails))
const getStatusLabel = (status) => {
  switch (status) {
    case 0:
      return 'Pending';
    case 1:
      return 'Accepted';
    case 2:
      return 'Shipped';
    case 3:
      return 'Delivered';
    case 4:
      return 'Cancelled';
    default:
      return 'Unknown Status';
  }
};

const rendercart = ({ item }) => (
  <View style={{marginTop:5}} >
  {console.log("hsgatahsjs",item?.orderDetail?.length)}
   <TouchableOpacity 
   onPress={() =>navigation.navigate('Orderdetails', { orderData: item,status:getStatusLabel(item?.status) })}
   
   >
<Ordercartbox

orderNo={item?.orderNo}
noOfItem={item?.orderDetail?.length}
totalAmount={parseFloat(item?.totalAmount)}
status={getStatusLabel(item?.status)}


/>
</TouchableOpacity>
  </View>
);
const handlepart=()=>{
  // Utility.showToast("Part Of M4")
}
  return (
    <PlatformSpecificWrapper  style={{flex: 1}}>
    <View>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
          <View style={{justifyContent:'center'}}>
  <Text style={Styles.text}>My orders</Text>
       
                </View>
                {/* <TouchableOpacity
                onPress={handlepart}
                >
                
                <FastImage
                  resizeMode='contain'
                  style={{
                    width: 85,
                    height: 40,
                  }}
                  source={require('../../assets/icons/filtericon.png')}
                />
                </TouchableOpacity> */}
          </View>
          
        </View>
       

    <View style={{ flex: 1}}>
{historydetails?.length>0?<FlatList
showsHorizontalScrollIndicator={false}
showsVerticalScrollIndicator={false}
refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        data={historydetails}
        keyExtractor={(item) => item.id}
        renderItem={rendercart}
        onEndReached={loadMoreData}
          onEndReachedThreshold={0.2}
          // ListFooterComponent={() => (
          //   <View>
          //     <Button text="Load More" onPress={handleLoadMore} />
          //   </View>
          // )}
      />:   <View style={{alignItems:'center',justifyContent:'center',flex:0.8}}>
        <FastImage
                  resizeMode="contain"
                  style={{
                    width: 290,
                    height: 290,


                  }}
                  source={require('../../assets/icons/paymentimage.png')}
                /> 
                <Text style={[Styles.text,{fontSize:17}]}>Order History is Empty</Text>  
        </View>}

          </View>
      {isLoading&&<Loader/>}

    </PlatformSpecificWrapper>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    color: '#03041A',
  },
});
