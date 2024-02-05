import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

import { CommonService } from '../api/CommonService';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

import { Utility } from '../util';
import { WebView } from "react-native-webview";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CommonActions } from '@react-navigation/native';
import { UploadService } from '../api/UploadService';
export default function WebViewContent({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');
let [isRefreshing, setIsRefreshing] = useState(false);
const [total, setTotal] = useState(route?.params?.total);
const [coupencode, setCoupencode] = useState(route?.params?.coupencode);
const [name, setName] = useState(route?.params?.name);
const [gst, setGst] = useState(route?.params?.gst);

    useEffect(() => {
        getWebviewContent();
    }, [route])
    const getWebviewContent = () => {
        return;
        let url = `user/get-cms?userType=user&type=${route.params.urlType}`;
        try {
            CommonService.fetchGetApi(url).then((response) => {
                setIsLoading(false);
                if (response.status == 200) {
                    setHtmlContent(response?.data?.cms);
                } else {
                    Utility.log("else", response);
                    if (response.status == 401) {
                        Utility.Logout(navigation, response);
                    }
                }
            })
        } catch (error) {
            setIsLoading(false);
            Utility.log("Catch error:", error)
            Utility.showToast(error)
        }
    }

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


    const handleMessage = event => {
        // Handle the message received from the WebView
        const data = event.nativeEvent.data;
    
        try {
            const jsonData = JSON.parse(data);
            console.log('Received message from WebView:', jsonData);
    
            // Now jsonData is an object containing the response from the WebView
            // You can access jsonData.success and jsonData.message
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };
    

    const handleorder = () => {
        console.log("jsjsjsjjjs")
        
            let data = {
              coupon: name,
              // aadharNumber: aadhar,
              couponCodeAmount: coupencode,
              gstAmount: gst,
              totalAmount:total,
            
               
            }
          

        
            setIsLoading(true);
            let url = 'create-order';
            UploadService.fetchPostFormData(url,data).then((response) => {
                setIsLoading(false);
                if (response.code == 200) {
                    Utility.showToast(response?.message);

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

   

    return (
        <SafeAreaView style={{ flex: 1,marginTop:10 }}>
            <>

                <StatusBar
                    backgroundColor="#f2f2f2"
                    translucent={false}
                    barStyle={"dark-content"}
                />
               <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,marginBottom:20}}>
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
                  source={require('../assets/icons/arrowback.png')}
                />
                </TouchableOpacity>
        <Text style={Styles.header}>PhonePe</Text>
                </View>
                
          </View>
               
                {console.log('webviewhumein',route?.params?.url)}
                <WebView
                    // onLoad={() => this.hideSpinner()}
                    style={{ flex: 1 }}
                    source={{ uri: route?.params?.url }}
                    onNavigationStateChange={data => {
        Utility.log('------------',data)

if(!data?.loading){

if(data?.url==="http://13.235.137.221:3005/api/payment/success"){
    handleorder()

}else if(data?.url==="http://13.235.137.221:3005/api/payment/failed"||data?.url==="http://13.235.137.221:3005/api/payment/status"){
Utility.showToast("Payment Was Failed Please Try Agian")
navigation.goBack()
}
}
                //   setCanGoBack(data.canGoBack);
                //   if (data.url.match('6-6')) {
                //     isFirstLoad ? processInput() : null;
                //   } else if (data?.url?.match(url)) {
                //     dispatch(getAppConfiguration()).then(res => {
                //       ShowLogs('res?.payload?.isValid', res?.payload);
                //       if (res?.payload?.isAuthenticated === false && isFirstLoad) {
                //         setIsFirstLoad(false);
                //         initiateLogout();
                //       }
                //     });
                //   }
                }
                }
                onMessage={handleMessage}
                />
             
                {/* <StatusBar backgroundColor={Colors.SIGNUP_STATUSBAR} barStyle='dark-content' />
            {
                isLoading ?
                    <Loader />
                    :
                    <View style={styles.container}>
                        <SafeAreaView>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingTop: 20 }}>
                                        <FastImage
                                            source={require('../assets/icons/arrowBack.png')}
                                            style={{ height: 16, width: 8 }}
                                            resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                    <Text style={[Styles.fieldHeading, styles.headingText]}>{htmlContent?.slug?.trim().replace(/(<([^>]+)>)/ig, '')}</Text>
                                    <View />
                                </View>
                                <View style={styles.contentView}>
                                    <HTMLView
                                        value={htmlContent?.description}//.trim().replace(/<br|\n|\r\s*\\?>/g, '')}
                                        addLineBreaks={false}
                                    />

                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </View>

            } */}
            </>
        </SafeAreaView>
    )
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