import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {RefreshControl} from 'react-native-gesture-handler';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../Components/Button';
import Filterbuttonui from '../../Components/Filterbuttonui';
import Inputcard from '../../Components/Inputcard';
import Loader from '../../Components/Loader';
import Maincart from '../../Components/Maincart';
import Threeicons from '../../Components/Threeicons';
import PlatformSpecificWrapper from '../../PlatformSpecificWrapper';
import {CommonService} from '../../api/CommonService';
import Fonts from '../../constants/Fonts';
import {Utility} from '../../util';
import {productActions} from './productSlice';
export default function Buy({navigation, props, route}) {
  const dispatch = useDispatch();

  const loader = useSelector(state => state?.product?.isLoader);
  const refbonus = useRef(null);
  const itemRef = useRef(null);
  const [productlist, setProductlist] = useState(null);
  const [productdetails, setProductdetails] = useState(null);
  const [cardlist, setCardlist] = useState(null);
  const [cardcount, setCardcount] = useState('');
  const [search, setSearch] = useState('');
  let [page, setPage] = useState(1);
  let [currentPage, setCurrentPage] = useState(1);
  const isFocused = useIsFocused();
  let [cartitem, setCartitem] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  let [isRefreshing, setIsRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);

  const [cart, setCart] = useState(route?.params?.quantityList);
  console.log('helshdytsbw', cart);
  const [quantities, setQuantities] = useState(cart ? cart : {});
  const [selectedItems, setSelectedItems] = useState({});
  const isError = useSelector(state => state.product.isError);
  const {height, width} = Dimensions.get('window');

  const rbsheetheight = height * 0.87;

  //API FOR BUY LISTING
  useEffect(() => {
    getUserData();
  }, [isFocused]);

  console.log('thisnisordercartvalue', isError);
  const getUserData = async () => {
    let user = await Utility.getValueFromAsyncStorage('UserData');
    setUserData(JSON.parse(user));
  };

  const userid = userData?.id.toString();
  console.log('sntsvsnds', `quantityList${userData?.id}`, userid);
  useEffect(() => {
    page = 1;
    setPage(1);
    getproductlisting('useEffect');
    getcartlist();
  }, [search]);

  const onRefresh = () => {
    isRefreshing = true;
    setIsRefreshing(true);
    setPage(1);
    page = 1;
    getproductlisting('onRefresh');
  };
  console.log('jsjsjsjs', JSON.stringify(productlist?.product));

  const loadMoreData = () => {
    if (
      page <= Math.ceil(productlist?.count / 3) &&
      productlist?.product?.length >= 3
    ) {
      page = page + 1;
      setPage(page + 1);
      getproductlisting('loadMoreData');
    }
  };

  //logic for trigger automatic refresh(OOS)-----

  // useEffect(() => {
  //   // Check your condition to determine when to trigger automatic refresh

  //   if (isError) {
  //     // Set refreshing to true after a short delay
  //     const timer = setTimeout(() => {
  //       setIsRefreshing(true);
  // // setShow(true)
  //       // Your refresh logic goes here
  //    getproductlisting()

  //       // After completing the refresh action, set refreshing back to false
  //       setIsRefreshing(false);
  //       // setShow(false)
  //     }, 1); // Adjust the delay as needed

  //     // Clear the timer when the component unmounts
  //     return () => clearTimeout(timer);
  //   }
  // }, [isError]);

  //api for product listing ---

  const getproductlisting = from => {
    if (!isRefreshing) {
      setIsLoading(true);
    }
    let url = `product-list?&search=${search}&page=${page}`;
    try {
      //check where prodcut api call
      console.log('jsysyshsjsw', from);
      CommonService.fetchGetApi(url)
        .then(response => {
          console.log('JHGFDGH', response);
          setIsLoading(false);
          setIsRefreshing(false);
          if (response.code == 200) {
            if (productdetails?.length > 0 && page > 1) {
              setProductlist(response?.data);
              setProductdetails([
                ...productdetails,
                ...response?.data?.product,
              ]);
            } else {
              setProductlist(response?.data);
              setProductdetails(response?.data?.product);
            }
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
  // Initialize quantities based on product ID

  useEffect(() => {
    if (cardlist) {
      const defaultQuantities = {};
      cardlist?.forEach(item => {
        defaultQuantities[item?.productDetails?.id] = item?.quantity;
      });
      setQuantityList(defaultQuantities);
    }
  }, [cardlist]);

  // api for cardlisting
  const getcartlist = () => {
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
            setCardlist(response?.data?.cartData);
            setCardcount(response?.data?.count);
          } else {
            Utility.log('else', response);
            // if (response.code == 402) {
            //   Utility.Logout(props.navigation, response);
            // }
          }
        })
        .catch(error => {
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
          Utility.log('Promise rejection:', error);
          setIsLoading(false);
          setIsRefreshing(false);
          // Handle other error cases if needed
        });
    } catch (error) {
      setIsLoading(false);
      setIsRefreshing(false);
      Utility.log('Catch error:', error);
      // Utility.showToast(error)
    }
  };

  //static data for filters
  const data = [
    {id: '1', name: 'Recommended'},
    {id: '2', name: 'Top products'},
    {id: '3', name: 'Bestsellers'},
    {id: '4', name: 'Schems'},
  ];

  //filter component rendering---
  const renderItem = ({item}) => (
    <View style={{marginLeft: 20}}>
      <Filterbuttonui text={item?.name} />
    </View>
  );

  //for increament decrememnt logic
  const [quantityList, setQuantityList] = useState({});
  const [itemCountList, setItemCountList] = useState({});
  const handleIncrement = itemId => {
    setQuantityList(prevQuantityList => {
      const currentQuantity = prevQuantityList[itemId?.id] || 0;
      const updatedQuantity = currentQuantity + 1;

      // Check if the updated quantity exceeds the available stock
      if (updatedQuantity > itemId?.noOfStock) {
        Utility.showToast(`${itemId?.productName} is out of stock`);
        return prevQuantityList; // Return the previous state if out of stock
      }

      // If the updated quantity is within the available stock, proceed with the increment
      logProductDetails(itemId?.id, updatedQuantity);
      return {...prevQuantityList, [itemId?.id]: updatedQuantity};
    });
  };

  //handle decrement --------
  const handleDecrement = itemId => {
    setQuantityList(prevQuantityList => {
      const updatedQuantity = Math.max(
        (prevQuantityList[itemId?.id] || 0) - 1,
        0,
      );
      logProductDetails(itemId?.id, updatedQuantity);

      const updatedQuantityList = {
        ...prevQuantityList,
        [itemId?.id]: updatedQuantity,
      };

      // Remove quantity from the list if it becomes zero
      if (updatedQuantity === 0) {
        const {[itemId?.id]: _, ...rest} = updatedQuantityList;
        return rest;
      }

      return updatedQuantityList;
    });
  };

  //handle buy ----
  const handleBuy = itemId => {
    // console.log("itemidhaiye",itemId?.noOfStock,isError['id'],isError['isError'])
    // dispatch(productActions.addToCartAsync({ id: itemId?.id}))
    // if(itemId?.id === isError["id"] && isError["isError"])

    // {
    //   Utility.showToast(`${itemId?.productName} is out of stock`)
    //   return

    // }
    //   else{

    setQuantityList(prevQuantityList => {
      const updatedQuantity = 1;
      logProductDetails(itemId?.id, updatedQuantity);
      return {...prevQuantityList, [itemId?.id]: updatedQuantity};
    });
    // }
  };

  //doing all buy , incremnt ,decremt in simple one function to achive all states -----
  const logProductDetails = (itemId, quantity) => {
    const item = productdetails?.find(product => product?.id === itemId);
    console.log('haihaibian', item?.noOfStock);
    if (item) {
      // if(item?.noOfStock>0){
      console.log('id:', item.id, 'qunatoty', quantity);
      dispatch(
        productActions.addToCartAsync({
          id: item.id,
          quantity: quantity,
          navigation,
        }),
      );
      console.log('Product ID:', item.id);
      console.log('Quantity:', quantity);
      console.log('MRP:', item.mrp);
      // }
      // else{
      //   console.log("kjshsjjsksusjs")
      //   Utility.showToast("Product is out of stock");
      // }
    }
  };

  //get the object length for some logic behind ---
  const isQuantityListEmpty = Object?.keys(quantityList)?.length === 0;

  const lengthOfObject = Object.keys(quantityList).length;

  console.log('Length of the object:', lengthOfObject);
  let totalMRP = 0;

  // Iterate over productDetails and sum up the product of quantity and MRP
  productdetails?.forEach(item => {
    // const hasError =  isError?.id === item?.id && isError?.isError;
    // if(!isError["id"]==item.id&&isError['isError'])
    // {
    // const quantity = quantityList[item.id] || 0;
    // totalMRP += quantity * item.mrp;
    // }else{
    //   const quantity = quantityList[item.id] || 0;
    // totalMRP += quantity * item.mrp;
    // }
    // if (!hasError) {
    const quantity = quantityList[item.id] || 0;
    totalMRP += quantity * item?.netPrice;
    // }
  });

  console.log('itemmmmmm', {totalMRP}, quantityList);

  //qunaity of loadlist----
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
    const saveQuantityList = async () => {
      try {
        await AsyncStorage.setItem(
          `quantityList`,
          JSON.stringify(quantityList),
        );
        console.log('Quantity List Saved:', quantityList);
      } catch (error) {
        console.error('Error saving quantityList to AsyncStorage:', error);
      }
    };

    saveQuantityList();
  }, [quantityList, userData?.id]);

  //hadle prodcut details ----
  const handledetails = item => {
    navigation.navigate('Productorderdetails', {
      itemid: item?.id,
      name: 'Buy products',
    });
  };

  const renderSeparator = () => <View style={{marginBottom: 70}} />;

  //cart fucntions of maincart of buying---
  const rendercart = ({item}) => (
    <View style={{marginTop: 5}}>
      {console.log('jshshgshs', item?.mrpPerUnit)}
      <TouchableOpacity onPress={() => handledetails(item)}>
        <Maincart
          id={item.id}
          productComposition={item?.compositionName}
          productName={item?.productName}
          compositionName={item?.vendorName}
          dimestion={item?.dimestion}
          netPrice={item?.netPrice}
          netPricePerUnit={item?.netPricePerUnit}
          mrp={item?.mrp}
          unit={item?.smallestUnit}
          units={item?.units}
          margin={item?.margin}
          mrpPerUnit={item?.mrpPerUnit}
          marginPerUnit={item?.marginPerUnit}
          productImage={item?.image}
          noofstock={item?.noOfStock}
          quantity={quantityList[item.id] || 0}
          onIncrement={() => handleIncrement(item)}
          onDecrement={() => {
            handleDecrement(item);
          }}
          onBuy={() => handleBuy(item)}
        />
      </TouchableOpacity>
    </View>
  );

  const handlecart = () => {
    navigation.navigate('Viewcart');
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
                // navigation.dispatch(
                // navigation.reset({
                //     index: 0,
                //     routes: [
                //         { name: 'BottomTab' }
                //     ]
                // })
                navigation.goBack();
                // )
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
            <Text style={Styles.header}>Buy products</Text>
          </View>
          <Threeicons navigation={navigation} />
        </View>
      </View>

      <View style={{flex: Platform.OS == 'android' ? 0.95 : 1}}>
        <View>
          <Inputcard
            image1={require('../../assets/icons/serachicon.png')}
            maxLength={18}
            placeholdertext="Search here..."
            value={search}
            onChangeText={text => {
              setSearch(text);
            }}
            viewstyle={{marginTop: -15}}
          />
        </View>

        <View style={{marginTop: 10}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 20}}
            horizontal
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>

        {productdetails?.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            data={productdetails}
            keyExtractor={item => item.id}
            renderItem={rendercart}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.2}
          />
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
            <Text style={[Styles.text, {fontSize: 17}]}>List is Empty</Text>
          </View>
        )}
        <View></View>
      </View>

      {!isQuantityListEmpty ? (
        <View>
          <View style={{borderWidth: 1, borderColor: '#ffffff'}}></View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 20, flex: 1.5, marginLeft: 25}}>
              <Text
                style={
                  Styles.carttext
                }>{`${lengthOfObject} items in cart`}</Text>
              <Text style={Styles.amount}>{`₹${totalMRP}`}</Text>
            </View>
            <View style={{marginTop: 15, flex: 1}}>
              <Button
                onPress={handlecart}
                text="View cart"
                view={{
                  marginHorizontal: responsiveHeight(1.8),
                  backgroundColor: '#4855F0',
                  borderColor: '#4855F0',
                  paddingVertical: 8,
                }}
                textstyle={{fontSize: 15}}
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
