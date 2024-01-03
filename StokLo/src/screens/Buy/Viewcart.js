import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { RefreshControl } from 'react-native-gesture-handler';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Components/Button';
import Loader from '../../Components/Loader';
import Maincart from '../../Components/Maincart';
import Threeicons from '../../Components/Threeicons';
import PlatformSpecificWrapper from '../../PlatformSpecificWrapper';
import { CommonService } from '../../api/CommonService';
import Fonts from '../../constants/Fonts';
import { Utility } from '../../util';
import { productActions } from './productSlice';

export default function Viewcart({navigation, props}) {
  const dispatch = useDispatch();
  const refRb = useRef();
  const loader = useSelector(state => state?.product?.isLoader);

  const [productlist, setProductlist] = useState(null);
  const [productdetails, setProductdetails] = useState(null);
  const [search, setSearch] = useState('');
  let [page, setPage] = useState(1);
  let [currentPage, setCurrentPage] = useState(1);
  const isFocused = useIsFocused();
  let [cartitem, setCartitem] = useState(0);
  const [offer, setOffer] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let [isRefreshing, setIsRefreshing] = useState(false);
  const [show, setShow] = useState(false);
  const [applyoffer, setApplyoffer] = useState('');
  const [offername, setOffername] = useState('');
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData();
  }, [isFocused]);

  const getUserData = async () => {
    let user = await Utility.getValueFromAsyncStorage('UserData');
    setUserData(JSON.parse(user));
  };
  const userid = userData?.id.toString();
  const {height, width} = Dimensions.get('window');
  const rbsheetheight = height * 1;

  let [quantityList, setQuantityList] = useState({});
  const [itemCountList, setItemCountList] = useState({});


  //load qunaity in viewcart ,logic behind repeat order
  useEffect(() => {
    const loadQuantityList = async () => {
      try {
        const storedQuantityList = await AsyncStorage.getItem(`quantityList`);
        console.log('Stored Quantity List:', storedQuantityList);
        if (storedQuantityList) {
          setQuantityList(JSON.parse(storedQuantityList));
        }
      } catch (error) {
        console.error('Error loading quantityList from AsyncStorage:', error);
      }
    };
    if (isFocused) {
      loadQuantityList();
    }
  }, [isFocused]);

  useEffect(() => {
    const filteredQuantityList = Object.fromEntries(
      Object.entries(quantityList).filter(([key, value]) => value !== 0),
    );

    const saveQuantityList = async () => {
      try {
        await AsyncStorage.setItem(
          `quantityList`,
          JSON.stringify(filteredQuantityList),
        );
        console.log('Quantity List Saved:', filteredQuantityList);
      } catch (error) {
        console.error('Error saving quantityList to AsyncStorage:', error);
      }
    };

    saveQuantityList();
  }, [quantityList, userData?.id]);
  useEffect(() => {
    page = 1;
    setPage(1);
    getproductlisting();
  }, [search]);

  const onRefresh = () => {
    isRefreshing = true;
    setIsRefreshing(true);
    setPage(1);
    page = 1;
    getproductlisting();
  };

  useEffect(() => {
    const isAnyQuantityZero = Object.values(quantityList).some(
      quantity => quantity === 0,
    );
    console.log('jsjsjsj', isAnyQuantityZero);
    if (!isAnyQuantityZero) {
      const timer = setTimeout(() => {
        setIsRefreshing(true);

        getproductlisting();

        setIsRefreshing(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [quantityList]);



  //cartlisting
  const getproductlisting = () => {
    if (!isRefreshing) {
      setIsLoading(true);
    }
    let url = `cart-list`;
    try {
      CommonService.fetchGetApi(url)
        .then(response => {
          setIsLoading(false);
          setIsRefreshing(false);
          if (response.code == 200) {
            Utility.log('response?.data?.cartData', response?.data);
            if (productdetails?.length > 0 && page > 1) {
              setProductlist(response?.data);
              setProductdetails([
                ...productdetails,
                ...response?.data?.cartData,
              ]);
            } else {
              setProductlist(response?.data);
              setProductdetails(response?.data?.cartData);
            }
          } else {
            Utility.log('else', response);

            if (response.code == 400) {
              navigation.goBack();
            }
          }
        })
        .catch(error => {
          if (error.code == 402) {
            Utility.showToast(error?.message);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }),
            );
          }
          Utility.log('Promise rejection:', error);
          setIsLoading(false);
          setIsRefreshing(false);
        });
    } catch (error) {
      setIsLoading(false);
      setIsRefreshing(false);
      Utility.log('Catch error:', error);
    }
  };



//handleincremt in cart---
  const handleIncrement = itemId => {
    setQuantityList(prevQuantityList => {
      const updatedQuantity = (prevQuantityList[itemId] || 0) + 1;
      logProductDetails(itemId, updatedQuantity);
      return {...prevQuantityList, [itemId]: updatedQuantity};
    });
  };
//handle decremnt in cart----
  const handleDecrement = itemId => {
    setQuantityList(prevQuantityList => {
      const updatedQuantity = Math.max((prevQuantityList[itemId] || 0) - 1, 0);
      logProductDetails(itemId, updatedQuantity);

      const updatedQuantityList = {
        ...prevQuantityList,
        [itemId]: updatedQuantity,
      };

      if (updatedQuantity === 0) {
        const {[itemId]: _, ...rest} = updatedQuantityList;
        return rest;
      }

      return updatedQuantityList;
    });
  };
//handle increment , decremnet in simple fucntion----
  const logProductDetails = (itemId, quantity) => {
    setOffer(false);
    const item = productdetails?.find(
      product => product?.productDetails?.id === itemId,
    );
    if (item) {
      console.log('jdjdjddygasbbns', item, quantity);
      dispatch(
        productActions.addToCartAsync({
          id: item?.productDetails?.id,
          quantity: quantity,
          navigation,
        }),
      );

      console.log('Product ID:', item?.productDetails?.id);
      console.log('Quantity:', quantity);
      console.log('MRP:', item?.productDetails.netPrice);
    }
  };



  useEffect(() => {
    if (shouldRefresh) {
      getproductlisting();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const isQuantityListEmpty = Object?.keys(quantityList)?.length === 0;
  const lengthOfObject = Object.keys(quantityList).length;

  console.log('Length of the object:', lengthOfObject);
  let totalMRP = 0;

  productdetails?.forEach(item => {
    const quantity = quantityList[item?.productDetails?.id] || 0;
    totalMRP += quantity * item?.productDetails?.netPrice;
  });

  console.log('hdhdh', {totalMRP}, quantityList);
  const handledetails = item => {
    navigation.navigate('Productorderdetails', {
      itemid: item?.id,
      name: 'Your cart',
    });
  };
//render cart is m,aincart of buying compennt----
  const rendercart = ({item}) => (
    <View style={{marginTop: 5}}>
      <TouchableOpacity onPress={() => handledetails(item?.productDetails)}>
        <Maincart
          id={item?.productDetails?.id}
          productComposition={item?.productDetails?.compositionName}
          productName={item?.productDetails?.productName}
          compositionName={item?.productDetails?.vendorDetails?.name}
          dimestion={item?.productDetails?.dimestion}
          unit={item?.productDetails?.smallestUnit}
          units={item?.productDetails?.units}
          netPrice={item?.productDetails?.netPrice}
          netPricePerUnit={parseFloat(
            item?.productDetails?.netPricePerUnit,
          )?.toFixed(2)}
          mrp={item?.productDetails?.mrp}
          margin={item?.productDetails?.margin}
          mrpPerUnit={parseFloat(item?.productDetails?.mrpPerUnit)?.toFixed(2)}
          marginPerUnit={parseFloat(
            item?.productDetails?.marginPerUnit,
          )?.toFixed(2)}
          productImage={item?.image}
          quantity={quantityList[item?.productDetails?.id] || 0}
          onIncrement={() => handleIncrement(item?.productDetails?.id)}
          onDecrement={() => {
            handleDecrement(item?.productDetails?.id);
          }}
          noofstock={item?.productDetails?.noOfStock}
        />
      </TouchableOpacity>
    </View>
  );
//calculation as gst slab now at 12%------

  const GSTRate = 0.12;
  const netAmount =
    totalMRP -
    (offer ? applyoffer?.couponAmount : 0) -
    productlist?.calculatedAmount?.walletDiscount +
    productlist?.calculatedAmount?.deliveryAmount;
  const gst = GSTRate * netAmount;
  const totalbill =
    totalMRP +
    gst -
    (offer ? applyoffer?.couponAmount : 0) -
    productlist?.calculatedAmount?.walletDiscount +
    productlist?.calculatedAmount?.deliveryAmount;

  console.log('heelo', totalbill, netAmount, gst);
  const handleproceed = () => {
    navigation.navigate('Paymentscreen', {
      totalamount: totalbill,
      coupencode: offer ? applyoffer?.couponAmount : 0,
      coupenname: offer ? offername : '',
      gst: gst.toFixed(2),

      wallet: productlist?.calculatedAmount?.walletDiscount,
    });
  };
  return (
    <PlatformSpecificWrapper style={{flex: 1}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();

                setSearch('');
              }}>
              <FastImage
                resizeMode="contain"
                style={{
                  width: 42,
                  height: 42,
                }}
                source={require('../../assets/icons/arrowback.png')}
              />
            </TouchableOpacity>
            <Text style={Styles.header}>Your cart</Text>
          </View>
          <Threeicons navigation={navigation} />
        </View>
        {productdetails?.length > 0 ? (
          <View
            style={{
              backgroundColor: '#FFD2A8',

              marginTop: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              {/* <Text style={Styles.text}>₹400 away from 2.5% cashbback</Text> */}
            </View>
          </View>
        ) : (
          <View
            style={{
              borderWidth: 0.6,
              borderColor: '#0000001A',
              marginTop: 15,
            }}></View>
        )}
      </View>

      <View style={{flex: Platform.OS == 'android' ? 0.95 : 1, marginTop: 15}}>
        {productdetails?.length > 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginBottom: 50}}>
            <FlatList
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }
              data={productdetails}
              keyExtractor={item => item.id}
              renderItem={rendercart}
              onEndReachedThreshold={0.2}
            />

            {!isQuantityListEmpty ? (
              <View style={{paddingHorizontal: 25, marginBottom: 40}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={[Styles.text, {color: '#4855F0'}]}>
                    Billing details
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={[Styles.bill]}>Item price</Text>
                  <Text style={[Styles.bill]}>{`₹${totalMRP}`}</Text>
                </View>

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text style={[Styles.bill]}>Discount</Text>
                    {/* <Text style={[Styles.bill]}>{`-₹${productlist?.calculatedAmount?.offerAmount}`}</Text> */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                      width: responsiveWidth(60),
                    }}>
                    <Text
                      style={[Styles.bill, {fontFamily: Fonts.FONT_SEMIBOLD}]}>
                      Wallet Discount
                    </Text>
                    <Text
                      style={[
                        Styles.bill,
                        {fontFamily: Fonts.FONT_SEMIBOLD},
                      ]}>{`-₹${productlist?.calculatedAmount?.walletDiscount?.toFixed(
                      2,
                    )}`}</Text>
                  </View>

                  {offer && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                        alignItems: 'center',
                        marginTop: -10,
                        marginBottom: -14,
                      }}>
                      <View
                        style={{
                          padding: 10,
                          width: responsiveWidth(60),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginLeft: -10,
                        }}>
                        <Text
                          style={[
                            Styles.bill,
                            {fontFamily: Fonts.FONT_SEMIBOLD},
                          ]}>
                          {offername}
                        </Text>
                        <Text
                          style={[
                            Styles.bill,
                            {fontFamily: Fonts.FONT_SEMIBOLD},
                          ]}>{`-₹${applyoffer?.couponAmount}`}</Text>
                      </View>
                      <TouchableOpacity onPress={() => setOffer(!offer)}>
                        <Text style={[Styles.text, {color: '#4855F0'}]}>
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={[Styles.bill]}>Delivery charges</Text>
                  <Text
                    style={[
                      Styles.bill,
                    ]}>{`+₹${productlist?.calculatedAmount?.deliveryAmount}`}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={[Styles.bill]}>GST(12%)</Text>
                  <Text style={[Styles.bill]}>{`+₹${gst?.toFixed(2)}`}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text style={[Styles.text]}>TOTAL</Text>
                  <Text style={[Styles.text]}>{`₹${totalbill?.toFixed(
                    2,
                  )}`}</Text>
                </View>
              </View>
            ) : null}
          </ScrollView>
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 0.8}}>
            <FastImage
              resizeMode="contain"
              style={{
                width: 290,
                height: 290,
              }}
              source={require('../../assets/icons/paymentimage.png')}
            />
            <Text style={[Styles.text, {fontSize: 17}]}>Cart is Empty</Text>
          </View>
        )}
      </View>

      {!isQuantityListEmpty ? (
        <View>
          <View style={{borderWidth: 1, borderColor: '#ffffff'}}></View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 20, flex: 1.5, marginLeft: 25}}>
              <Text style={Styles.carttext}>Payable amount</Text>
              <Text style={Styles.amount}>{`₹${totalbill?.toFixed(2)}`}</Text>
            </View>
            <View style={{marginTop: 15, flex: 1}}>
              <Button
                onPress={handleproceed}
                text="Proceed"
                view={{
                  marginHorizontal: responsiveHeight(1.5),
                  backgroundColor: '#4855F0',
                  borderColor: '#4855F0',
                  paddingVertical: 10,
                }}
              />
            </View>
          </View>
        </View>
      ) : null}

      {loader || (isLoading && <Loader />)}
    </PlatformSpecificWrapper>
  );
}

const Styles = StyleSheet.create({
  header: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    color: '#03041A',
    marginLeft: 10,
  },
  text: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 13,
    color: '#03041A',
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
  name: {
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 11,
    color: '#000000',
  },
});
