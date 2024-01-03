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
  RefreshControl,
} from 'react-native';


import PlatformSpecificWrapper from '../PlatformSpecificWrapper';

import {Utility} from '../util';


import {CommonActions} from '@react-navigation/native';
import Fonts from '../constants/Fonts';
import FastImage from 'react-native-fast-image';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Cheerio } from 'cheerio';

import {useIsFocused} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';

import Loader from '../Components/Loader';

import {CommonService} from '../api/CommonService';
import { UploadService } from '../api/UploadService';

export default function Offerscomp({navigation, props,route,teamId,onTeamIdChange,onteamname,refresh,horizontal}) {
  const isFocused = useIsFocused();
  const refoffer = useRef();
  const cheerio = require('cheerio');
  let [isRefreshing, setIsRefreshing] = useState(false);
  const [ownershiplist, setOwnershiplist] = useState(null);
  const {height, width} = Dimensions.get('window');
  const rbsheetheight = height * 0.67;

  const [fill, setFill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [page, setPage] = useState(1);

  const [userData, setUserData] = useState(null);
 
  const [offer, setOffer] = useState(null);
  const [offerlist, setOfferlist] = useState(null);
  const [offerdetails, setOfferdetails] = useState(null);
  const [applycoupen, setApplycoupen] = useState(null);
  let [coupenid, setCoupenid] = useState('');
  const [type, setType] = useState('');

  const termsAndConditions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ];
  useEffect(() => {
    getUserData();

    // defaultvalues()
  }, [isFocused]);
  useEffect(() => {
    page = 1
    setPage(1);
    getofferlist()

  }, [ ])
  
  const onRefresh = () => {
    isRefreshing = true;
    setIsRefreshing(true);
    setPage(1);
    page = 1
    getofferlist()
  }
  useEffect(() => {
   if(refresh)
    getofferlist()

  }, [refresh])
  console.log("kksjsjsjsjkss",horizontal)
  const loadMoreData = () => {
    if (page <= Math.ceil(offerlist?.count / 3) && offer?.length >= 3) {
      page = page + 1
      setPage(page + 1);
      getofferlist()
  
    }
  };
 





  const getUserData = async () => {
    let user = await Utility.getValueFromAsyncStorage('UserData');
    setUserData(JSON.parse(user));
  };

  // const defaultvalues =async ()=>{
  //   console.log("userdataghjhj",productdetailss)

  // }
  const getofferlist = () => {
    if (!isRefreshing) {
        setIsLoading(true);
      }
  
    let url = `offers-list?page=${page}`;;
    try {
  
      CommonService.fetchGetApi(url).then((response) => {
        console.log("JHGFDGH",response)
      
        if (response.code == 200) {
            setIsLoading(false);
            setIsRefreshing(false);
            if (offer?.length > 0 && page > 1) {
                setOfferlist(response?.data)
                setOffer([...offer, ...response?.data?.offers])
              } else {
                setOfferlist(response?.data)
                setOffer(response?.data?.offers)
              }
            
          
  
  
        } else {
          Utility.log("else", response);
        
        }
      }).catch((error) => {
        Utility.log("Promise rejection:", error);
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

  const getoffferdetails = (itemid) => {
    if (!isRefreshing) {
        setIsLoading(true);
      }
  
    let url = `offers-detail?id=${itemid}`;;
    try {
  
      CommonService.fetchGetApi(url).then((response) => {
        console.log("JHGFDGH",response)
      
        if (response.code == 200) {
            setIsLoading(false);
            setIsRefreshing(false);
          
            setOfferdetails(response?.data)
          refoffer?.current?.open()
  
  
        } else {
          Utility.log("else", response);
        
        }
      }).catch((error) => {
        Utility.log("Promise rejection:", error);
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

  const handleoffercoupen =  async ()=>{
 
  console.log('smsmsmsksks',coupenid)
  setIsLoading(true);
          let data = {
            couponId: coupenid?.id,
             
          }
  
          let url = 'apply-coupon';
          Utility.log(url, data)
  
          UploadService.fetchPostFormData(url, data).then((response) => {
            
              setIsLoading(false);
              if (response.code == 200) {
              
                setApplycoupen(response?.data)
onTeamIdChange(response?.data);
onteamname(coupenid?.couponCode)
Utility.log("Coupen Applied Successfully",response?.data);

               
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


  
  const handleoffer=(itemid)=>{
    console.log("jsjjks",itemid)
getoffferdetails(itemid)
  }


  const handleapply=(itemid)=>{
    console.log("jsjjks",itemid)
// teamId={itemid}
coupenid=itemid
setCoupenid(coupenid)
console.log("hensjsjss",coupenid)

handleoffercoupen()
  }
  const renderoffer = ({ item }) => (

    <TouchableOpacity
    onPress={()=>handleoffer(item?.id)}
    >
    <View style={{marginTop:5,width:responsiveWidth(90),marginHorizontal:responsiveWidth(5)}} >

 <View style={{padding:10,backgroundColor:'#F6E8DC',borderRadius:15,marginBottom:10,paddingVertical:15,paddingHorizontal:15}}>
 <View style={{}}>
    <Text  style={[Styles.heading]}>{item?.couponCode}</Text>
    <Text numberOfLines={1} style={[Styles.name,{marginTop:5}]}>{item?.couponTitle}</Text>
    </View>
    <View style={{flexDirection:'row',justifyContent:"space-between",marginTop:10}}>
    <TouchableOpacity    
    onPress={()=>handleapply(item)}
    >
    <Text  style={[Styles.name,{fontSize:13,color:"#FF8F28"}]}>Apply</Text>
    </TouchableOpacity>
    <TouchableOpacity  
    onPress={()=>handleoffer(item?.id)}
    >

    <Text numberOfLines={1} style={[Styles.heading,{fontSize:13,color:"#4855F0"}]}>View Details</Text>
    </TouchableOpacity>

    </View>
 </View>
  
  
    </View>
    </TouchableOpacity>
  );
   
  const couponDescription = offerdetails?.couponDescription;
let trimmedArray
  if (couponDescription) {
    const $ = cheerio?.load(couponDescription);
    const plainText = $('body')?.text()?.trim()?.replace(/(<([^>]+)>)/ig, '');
  
    // Split the text into an array based on newline characters
    const linesArray = plainText?.split('\n');
  
   const  filteredArray = linesArray?.filter(line => line?.trim() !== '');
      trimmedArray = filteredArray?.map(line => line?.trim());
    console.log("heelologgg", filteredArray);
  } else {
    console.log("Invalid or missing HTML content for coupon description");
  }

  return (
    <PlatformSpecificWrapper style={{flex: 1}}>
    

      <View style={{flex: 1,}}>

      {offer?.length>0?<FlatList
showsHorizontalScrollIndicator={false}
showsVerticalScrollIndicator={false}
horizontal={horizontal?true:false}

pagingEnabled
refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        data={offer}
        keyExtractor={(item) => item.id}
        renderItem={renderoffer}
        onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          // ListFooterComponent={() => (
          //   <View>
          //     <Button text="Load More" onPress={handleLoadMore} />
          //   </View>
          // )}
      />:
        <View style={{alignItems:'center',justifyContent:'center',flex:0.8}}>
        <FastImage
                  resizeMode="contain"
                  style={{
                    width: 290,
                    height: 290,


                  }}
                  source={require('../assets/icons/paymentimage.png')}
                /> 
                <Text style={[Styles.text,{fontSize:17}]}>No Offers Here</Text>  
        </View>}



      </View>

      <RBSheet
        ref={refoffer}
        closeOnDragDown={false}
        closeOnPressMask={true}
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
          <View
            style={{
              flex: 1,
              backgroundColor: '#F2F2F2',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingHorizontal: 25,
              }}>
              <TouchableOpacity
                onPress={() => {
                  refoffer.current.close();
                }}>
                <FastImage
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  source={require('../assets/icons/cut.png')}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                // marginTop: 10,
                marginHorizontal:20,marginTop:15
              }}>
         <View style={{padding:10,backgroundColor:'#F6E8DC',borderRadius:15,marginBottom:10,paddingVertical:15,paddingHorizontal:15,}}>
 <View style={{}}>
    <Text  style={[Styles.heading]}>{offerdetails?.couponCode}</Text>
    <Text numberOfLines={1} style={[Styles.name,{marginTop:5}]}>{offerdetails?.couponTitle}</Text>
    </View>

   
 </View>

{offerdetails?.couponDescription&& <View>
 <View style={{marginTop:10}}>
 <Text  style={[Styles.heading,{fontFamily:Fonts.FONT_MEDIUM}]}>Terms & conditions</Text>
 </View>

<ScrollView  
showsVerticalScrollIndicator={false}
>

      {trimmedArray?.map((line, index) => (
        <View key={index} style={{  flexDirection: 'row',marginTop:10,
    // alignItems: 'center',
    marginBottom: 10,}}>
        <FastImage
                  resizeMode="contain"
                  style={{
                    width: 18,
                    height: 18,
                    marginTop:5
                  }}
                  source={require('../assets/icons/stylearrow.png')}
                />
          <Text  style={[Styles.terms,{marginLeft:10,flex:1,lineHeight:20}]}>{line}</Text>
        </View>
      ))}
      </ScrollView>
</View>}



            </View>
            {/* <View style={{marginTop: 10}}>
              <Button
            //   onPress={addlicense}
               text="Apply offer"  />
            </View> */}
          </View>
        </View>
      </RBSheet>

      {isLoading && <Loader />}


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
    marginLeft: 10,
  },
  heading: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    color: '#000000',
  },
  name: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 11,
    color: '#000000',
    // marginTop:10

  },
  terms: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 13,
    color: '#2E304D',
    // padding:15
  },
});
