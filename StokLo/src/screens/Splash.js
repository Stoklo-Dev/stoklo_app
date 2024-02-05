
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Image, ImageBackground, StyleSheet, Linking, AppState } from 'react-native';
import FastImage from 'react-native-fast-image';


import Fonts from '../constants/Fonts';
import { Utility } from '../util';


export default function Splash({ navigation }) {
    // const [showWelcome, setShowWelcome] = useState(true);
    const handleHomeScreen=async ()=>{
        const isLogin=await Utility.getValueFromAsyncStorage('IsLogin');
  const isbonus=await Utility.getValueFromAsyncStorage('checkbonus');


        console.log('====================================');
        console.log("heelologin",isLogin);
        console.log('====================================');
     
      const timeout = setTimeout(() => {
        if(isLogin=='true'){
            if(isbonus=='true'){
                
                navigation.replace('BottomTab');

            }else{
                Utility.setValueInAsyncStorage("Isfirsttime",'false');

                navigation.replace('BottomTab');
            }
        }
        else{
        navigation.replace('Login'); }
      }, 3000); 
  
    
      return () => clearTimeout(timeout);
    }

    useEffect(() => {
        handleHomeScreen()
        
    }, []);


  

  
    // useEffect(() => {
       

    //     handleRoute();
    // }, [])
    // const handleRoute = async () => {
       
    //     var isFirstTime = true;
    //     var isFirst = await Utility.getValueFromAsyncStorage('FirstTimeUser');
    //     if (isFirst == 'false') {
    //         isFirstTime = false;
    //     } else {
    //         isFirstTime = true;
    //     }
    //     await link()

    //     setTimeout(async () => {
    //         if (isLogged != null) {
    //             Utility.log("QQQQQQQQQQQQQQ", invitedEventEmail, userData?.email, eventInvitationType)
    //             if (invitedEmail && (invitedEmail !== userData?.email && invitationType !== 'manual')) {
    //                 await Utility.removeItemAsyncStorage('TOKEN');
    //                 await Utility.removeItemAsyncStorage('UserData');
    //                 await Utility.removeItemAsyncStorage('ChosenSports');
    //                 navigation.navigate('Login');
    //                 return;
    //             }
    //             if (invitedEventEmail && (invitedEventEmail !== userData?.email && eventInvitationType !== 'manual')) {
    //                 await Utility.removeItemAsyncStorage('TOKEN');
    //                 await Utility.removeItemAsyncStorage('UserData');
    //                 await Utility.removeItemAsyncStorage('ChosenSports');
    //                 navigation.navigate('Login');
    //                 return;
    //             }
    //             navigation.dispatch(
    //                 CommonActions.reset({
    //                     index: 0,
    //                     routes: [
    //                         { name: (isFirstTime || isSportSelected == 'false') ? 'SelectFavouriteSport' : 'HomeTab' }
    //                     ]
    //                 })
    //             )

    //         } else {
    //             navigation.dispatch(
    //                 CommonActions.reset({
    //                     index: 0,
    //                     routes: [
    //                         { name: isFirstTime ? 'Onboarding' : 'Login' }
    //                     ]
    //                 })
    //             )
    //         }
    //     }, 3000)


    // }

    return (
        <>
            <StatusBar backgroundColor={'transparent'} barStyle='dark-content' translucent />
            <View style={styles.splashContainer}>
               
                    <Image
                        source={require('../assets/icons/stoklologo.png')}
                        resizeMode='contain'
                        style={{ height: 165, width: 294 }}
                    />
                  
            
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    splashBackground: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#F2F2F2"
    },
    punchLine: {
        fontFamily: Fonts.FONT_MEDIUM,
        fontSize: 15,
        lineHeight: 22,
        color: '#293299',
    },
    splashContainer: {
        flex: 1,
        backgroundColor:"#F2F2F2",
        alignItems: 'center',
        justifyContent: 'center',
    },
})