import React, {useEffect, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';

import Login from './screens/Login';
import Splash from './screens/Splash';
import Otpverify from './screens/Otpverify';
import Signup from './screens/Signup';
import MapScreen from './Components/MapScreen';
import Completeprofile from './screens/Completeprofile';
import Buy from './screens/Buy/Buy';
import Orders from './screens/Orders/Orders';
import Homescreen from './screens/Homescreen/Homescreen';
import BottomTab from './navigations/BottomTab';
import Terms from './screens/Terms&consition/Terms';
import Privacy from './screens/Terms&consition/Privacy';
import HelpandSupport from './screens/HelpSupport/HelpandSupport';
import Viewcart from './screens/Buy/Viewcart';
import Paymentscreen from './screens/Payments/Paymentscreen';
import Confrimationpayment from './screens/Payments/Confrimationpayment';
import Orderdetails from './screens/Orders/Orderdetails';
import Productorderdetails from './Components/Productorderdetails';
import Walletmodule from './screens/Wallet/Walletmodule';



import messaging from '@react-native-firebase/messaging';
import WebViewContent from './Components/WebViewContent';
import notifee, {EventType} from '@notifee/react-native';

import Notification from './screens/Notification/Notification';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {Alert, Linking, Platform} from 'react-native';
const Stack = createStackNavigator();

export default function AppContainer() {
  useEffect(() => {
    foregroundNotification();
  }, []);

  useEffect(() => {
    const checkNotificationPermission = async () => {
      const authStatus = await messaging().hasPermission();
      if (authStatus === messaging?.AuthorizationStatus.AUTHORIZED) {
        console.log('Notification permission already granted');
      } else {
        requestUserPermission();
      }
    };

    checkNotificationPermission();
  }, []);

  useEffect(() => {
    const checkAndRequestNotificationPermission = async () => {
      if (Platform.OS === 'android') {
        const permissionStatus = await check(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );

        if (permissionStatus !== RESULTS.GRANTED) {
          const requestPermissionResult = await request(
            PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
          );

          if (requestPermissionResult === RESULTS.DENIED) {
          } else if (requestPermissionResult === RESULTS.BLOCKED) {
            console.warn('Notification permission blocked on Android');
          }
        }
      }
    };

    const openAppSettings = () => {
      Linking.openSettings();
    };

    checkAndRequestNotificationPermission();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('Permission denied for push notifications.');
    }
  };
  const foregroundNotification = async () => {
    console.log('Push Notification foregroundNotification');
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default',
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'Push Notification Foreground',
        JSON.stringify(remoteMessage),
      );
      await notifee.displayNotification({
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,

        android: {
          channelId: channelId,

          pressAction: {
            id: 'default',
          },
          importance: 4,
        },
      });
    });
    return unsubscribe;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otpverify" component={Otpverify} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="Completeprofile" component={Completeprofile} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Homescreen" component={Homescreen} />
        <Stack.Screen name="Buy" component={Buy} />
        <Stack.Screen name="Viewcart" component={Viewcart} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Orderdetails" component={Orderdetails} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="HelpandSupport" component={HelpandSupport} />
        <Stack.Screen name="Paymentscreen" component={Paymentscreen} />
        <Stack.Screen
          name="Confrimationpayment"
          component={Confrimationpayment}
        />
        <Stack.Screen
          name="Productorderdetails"
          component={Productorderdetails}
        />
        <Stack.Screen name="Walletmodule" component={Walletmodule} />



        <Stack.Screen name="WebViewContent" component={WebViewContent} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
