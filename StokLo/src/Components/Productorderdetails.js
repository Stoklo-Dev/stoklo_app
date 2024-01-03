import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Image, ImageBackground, StyleSheet, Linking, AppState, SafeAreaView,TextInput, Platform,Dimensions, TouchableOpacity,Animated, BackHandler, FlatList, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Fonts from '../constants/Fonts';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import RBSheet from 'react-native-raw-bottom-sheet';

import { useDispatch } from 'react-redux';
import { addlanguage } from '../newredux/Myproducts';
import Button from './Button';
import { CommonService } from '../api/CommonService';
import { Utility } from '../util';
import BannerPagination from './BannerPagination';
import Loader from './Loader';
import Confrimationpopup from './Confrimationpopup';
import FastImage from 'react-native-fast-image';
import { LiquidLike } from 'react-native-animated-pagination-dots';
import Threeicons from './Threeicons';
import PlatformSpecificWrapper from '../PlatformSpecificWrapper';
import styles from '../Styles/styles';
export default function Productorderdetails({route,props,navigation}) {
    const {height,width} = Dimensions.get('window');
    const deviceModel = DeviceInfo.getModel();
const scrollX = useRef(new Animated.Value(0))?.current;


const rbsheetheight = height * 0.87;
    const [productdetailss, setProductdetailss] = useState(null)
    const [currentPage, setCurrentPage] = useState(0);
    const flatListRef = useRef();
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const refRb=useRef();
  const refbonus=useRef();
  const [id, setId] = useState(route?.params?.itemid)
  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  const data = [
    {
      image:
        'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
      backgroundColor: '#7bcf6e',
    },
    {
      image:
        'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
      backgroundColor: '#4654a7',
    },
    {
      image:
        'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
      backgroundColor: '#7370cf',
    },
    {
      image:
        'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
      backgroundColor: '#db4747',
    },
  ];
    const screenwidth=width*0.88
    useEffect(() => {

     if(id){
      getorderdetails()
      refbonus.current.open()
     }

      
      }, [])
    
    console.log("jsjhsgshssjsjss",id)
    const getorderdetails = () => {
      setIsLoading(true);

  
        let url = `product-detail?&id=${id}`;
        try {
      
          CommonService.fetchGetApi(url).then((response) => {
          
            if (response.code == 200) {
      setIsLoading(false);

              setProductdetailss(response?.data)
      
      
            } else {
              Utility.log("else", response);
      setIsLoading(false);

            
            }
          }).catch((error) => {
            Utility.log("Promise rejection:", error);
      setIsLoading(false);

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
          
            // Handle other error cases if needed
          });
        } catch (error) {
      setIsLoading(false);

          Utility.log("Catch error:", error)
        
          // Utility.showToast(error)
        }
      }

      // useEffect(() => {
      //   if(data.length>0){
      //     const interval = setInterval(() => {
      //       if (currentPage < data.length - 1) {
      //         setCurrentPage(currentPage + 1);
      //         flatListRef?.current?.scrollToIndex({
      //           index: currentPage + 1,
      //           animated: true,
      //         });
      //       } else {
      //         setCurrentPage(0);
      //         flatListRef?.current?.scrollToIndex({ index: 0, animated: true });
      //       }
      //     }, 3000);
      //     return () => clearInterval(interval);
      //   }
    
        
    
        
      // }, [currentPage]);


const transformedData = productdetailss?.productImage?.map(item => item.productImage);
console.log("jsjsysyeyeugs",transformedData)
const handleOnScroll = (event) => {
  Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          },
        },
      },
    ],
    {
      useNativeDriver: false,
    }
  )(event);
};
const handleOnViewableItemsChanged = (({ viewableItems }) => {
  Utility.log("viewableItems:", viewableItems);
  setIndex(viewableItems[0]?.index);
}).current;
const viewabilityConfig = useRef({
  itemVisiblePercentThreshold: 50,
}).current;

      console.log("jssjhydhdbne",productdetailss?.productImage)

return(
<PlatformSpecificWrapper style={{flex:1}}>
<View>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:"center"}}>
          <TouchableOpacity   
            onPress={() => {
              // navigation.dispatch(
  // navigation.reset({
  //     index: 0,
  //     routes: [
  //         { name: 'BottomTab' }
  //     ]
  // })
  navigation.goBack()
// )
                setSearch('');
              }}
          >
          <FastImage
                  resizeMode="contain"
                  style={{
                    width: 42,
                    height: 42,


                  }}
                  source={require('../assets/icons/arrowback.png')}
                />
                </TouchableOpacity>
        <Text style={{ fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    color: '#03041A',
    marginLeft:10, }}>{route?.params?.name}</Text>
                </View>
                <Threeicons navigation={navigation}/>
          </View>
       
        </View>
<View style={{flex: 1,marginTop:10}}>
<RBSheet
        ref={refbonus}
        closeOnDragDown={false}
        closeOnPressMask={true}
        onClose={()=>{

                    navigation.goBack()

            }}
        closeOnPressBack={true}
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
            
                <View style={{marginTop:20,flexDirection:"row",justifyContent:'flex-end',paddingHorizontal:25}}>

                  <TouchableOpacity  onPress={()=>{
                    refbonus.current.close()
                    // navigation.goBack()

            }} >
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
            

         { isLoading?<Loader/>:  <View style={{flex: 1,marginTop:10}}>
<View >
            <Animated.FlatList
                  data={productdetailss?.productImage}
                  horizontal
                  pagingEnabled
                  bounces={false}
                  scrollEnabled={true}
                  ref={flatListRef}
                  snapToAlignment="center"
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleOnScroll}
                  onViewableItemsChanged={handleOnViewableItemsChanged}
                  viewabilityConfig={viewabilityConfig}
                  style={{
                    flexGrow: 0,
                    alignSelf:"center"
                  }}
                  renderItem={({ item, index }) => (
                    <Animated.View style={{ marginRight: 5 }}>
                    {console.log("eena meena",item)}
                      <TouchableOpacity
                        // onPress={() =>
                        //   navigation.navigate("PromotionNew", {
                        //     data: item,
                        //   })
                        // }
                      >
                        <FastImage
                          source={{uri:item?.productImage}}
                          style={{ width: Dimensions.get('window').width, height: 200,padding:15,paddingHorizontal:20,}}
                          resizeMode='contain'
                        >
                       
                      
                       

                        </FastImage>
                      </TouchableOpacity>
                    </Animated.View>
                  )}
                  keyExtractor={(item) => item.id}
                />
                </View>
                <BannerPagination data={productdetailss?.productImage} scrollX={scrollX} index={index} />


<ScrollView showsVerticalScrollIndicator={false}>

<View style={{paddingHorizontal:25,marginTop:5}}>
<View style={{padding:10,alignSelf:"flex-start",backgroundColor:'#FFD2A8',borderRadius:10}}>
 {productdetailss?.noOfStock>0? <Text style={Styles.instock} > In stock</Text>:<Text style={Styles.instock} > Out of stock</Text>}
</View>
</View>


<View style={{paddingHorizontal:25,marginTop:10}}>
  <Text style={Styles.header}>{productdetailss?.productName}</Text>
</View>

<View style={{paddingHorizontal:25,marginTop:10}}>
  <Text style={Styles.manu}>{productdetailss?.vendorDetails?.name}</Text>
</View>


<View style={{paddingHorizontal:25,marginTop:10,flexDirection:"row",justifyContent:"space-between"}}>
  <Text style={[Styles.manu,{color:"#4855F0"}]}>{`Margin ₹${productdetailss?.margin} `}</Text>
  <Text style={[Styles.manu,{fontSize:13}]}>{`₹${productdetailss?.marginPerUnit != null ? Math.floor(productdetailss?.marginPerUnit * 100) / 100 : null}/${productdetailss?.smallestUnit} `}</Text>
</View>


<View style={{paddingHorizontal:25,marginTop:10,flexDirection:"row",justifyContent:"space-between"}}>
  <Text style={[Styles.manu,{color:"#A1A2B2",textDecorationLine:"line-through"}]}>{`MRP ₹${productdetailss?.mrp} `}</Text>
  <Text style={[Styles.manu,{fontSize:13}]}>{`₹${productdetailss?.mrpPerUnit != null ? Math.floor(productdetailss?.mrpPerUnit * 100) / 100 : null}/${productdetailss?.smallestUnit} `}</Text>
</View>


<View style={{paddingHorizontal:25,marginTop:10,flexDirection:"row",justifyContent:"space-between"}}>
  <Text style={[Styles.manu,{color:"#2E304D"}]}>{`Net Price ₹${productdetailss?.netPrice} `}</Text>
  <Text style={[Styles.manu,{fontSize:13}]}>{`₹${productdetailss?.netPricePerUnit != null ? Math.floor(productdetailss?.netPricePerUnit * 100) / 100 : null}/${productdetailss?.smallestUnit} `}</Text>
</View>

<View style={{paddingHorizontal:25,marginTop:10}}>
  <Text style={[Styles.manu,{color:"#2E304D"}]}>Packaging</Text>
  <Text style={[Styles.manu,{fontSize:13}]}>{`${productdetailss?.dimestion} `}</Text>
</View>

{productdetailss?.compositionName &&<View style={{paddingHorizontal:25,marginTop:10,marginBottom:15}}>
  <Text style={[Styles.manu,{color:"#2E304D"}]}>Composition</Text>
  <Text   style={[Styles.manu,{fontSize:13}]}>{`${productdetailss?.compositionName}  `}</Text>
</View>}
{productdetailss?.productComposition &&<View style={{paddingHorizontal:25,marginTop:10,marginBottom:15}}>
  <Text style={[Styles.manu,{color:"#2E304D"}]}>Description</Text>
  <Text   style={[Styles.manu,{fontSize:13}]}>{`${productdetailss?.productComposition}  `}</Text>
</View>}



  
</ScrollView>

            </View>}

          
          </View>
        </View>
      </RBSheet>

            </View>
            


<View>

</View>


      {isLoading&&<Loader/>}
 
</PlatformSpecificWrapper>
)

}

const Styles=StyleSheet.create({
maincontainer:{
    width: 335,
height: 90,
borderRadius: 16,
backgroundColor: "#F2F2F2",
shadowColor: "rgba(10, 10, 10, 0.05)",
shadowOffset: {
	width: -10,
	height: -10
},
shadowRadius: 4,
shadowOpacity: 1
},
textstyle:{
    fontFamily: Fonts.FONT_REGULAR,
    fontSize: 11,
    color: "#2E304D",
    
},
instock:{
  fontFamily: Fonts.FONT_MEDIUM,
  fontSize: 13,
  color: "#212BA3",
  
},
header:{
  fontFamily: Fonts.FONT_BOLD,
  fontSize: 17,
  color: "#03041A",
  
},
manu:{
  fontFamily: Fonts.FONT_MEDIUM,
  fontSize: 15,
  color: "#2E304D",
  
}

})
