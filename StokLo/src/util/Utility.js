import * as ApiConstants from '../constants/ApiConstants';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import CurrencySymbolMap from 'currency-symbol-map';
import RNCalendarEvents from "react-native-calendar-events";
import "moment-timezone";
import "tz-lookup";
export function log() {
    if (ApiConstants.CONSOLE_ENABLED) {
        console.log(...arguments);
    }
}

export function validateEmail(value) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(value) !== false;
}

export function validatePhoneNumber(value) {
    let reg = /^[6-9]\d{9}$/;
    return reg.test(value) !== false;
}

export function validateName(value) {
    let reg = /^[a-zA-Z ]{4,50}$/;
    return reg.test(value);
}
export function validatePassword(value) {
    let reg = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*?[#?!@$%^&<>*~:`-])[A-Za-z\0-9\#?!@$%^&<>*~:`-]{8,}$/
    // let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    // let reg = /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{8,16}$/;

    return reg.test(value) !== false;
}

export async function setValueInAsyncStorage(key, item) {
    try {
        await AsyncStorage.setItem(key, item);
    } catch (error) {
        log(error);
    }
}
export async function removeItemAsyncStorage(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        log(error);
    }
}

export async function getValueFromAsyncStorage(key) {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        log(error);
    }
}

export async function getMultipleValuesFromAsyncStorage(keys) {
    log('multiGetAsyncValueInPersistStore  KEYS :' + keys);
    return await AsyncStorage.multiGet(keys)
}

export async function clearStorage() {
    try {
        return await AsyncStorage.clear();
    } catch (error) {
        log(error);
    }
}

export function showToast(message) {
    Toast.show(message, Toast.SHORT)
}

export async function Logout(navigation, response) {
    
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Login' }
            ]
        })
    )
}

export function getCurrencySymbol(currencyCode) {
    const currencySymbol = CurrencySymbolMap(currencyCode);
    return currencySymbol;
};

export function getTimeZone() {
    const now = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMinutes = now.getTimezoneOffset();
    const offsetHours = Math.abs(offsetMinutes / 60);
    const offHours = Math.floor(offsetHours);
    const offsetSign = offsetMinutes < 0 ? '+' : '-';

    return {
        timeZone: timeZone,
        utc: `${offsetSign}${offHours.toString().padStart(2, '0')}:${Math.abs(offsetMinutes % 60).toString().padStart(2, '0')}`
    }

}

export function formatTime(dateTimeString,lat,long) {
    const tzlookup = require('tz-lookup');
    const moment = require('moment-timezone');
    
   
    function getTimeZoneAbbreviationForCoordinates(latitude, longitude) {
      const timeZone = tzlookup(latitude, longitude);
      const now = moment.tz(timeZone);
      let timeZoneAbbreviation = now.format('z');
      if(timeZoneAbbreviation==="+04"){
        timeZoneAbbreviation="GST"
      return timeZoneAbbreviation;
      } if(timeZoneAbbreviation==="+0330"){
        timeZoneAbbreviation="IRST"
      return timeZoneAbbreviation;
      }else{
        return timeZoneAbbreviation;
      }
    console.log("timezoness",now)

    }
    let timeZoneAbbreviationForNewDelhi="";
  if(lat&&long){
       timeZoneAbbreviationForNewDelhi = getTimeZoneAbbreviationForCoordinates(lat, long);

  }
    const date = new Date(dateTimeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm} ${timeZoneAbbreviationForNewDelhi}`;
    return formattedTime;
}

export function formatDatetime(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    };
  
    const formattedDate = date.toLocaleString('en-IN', options);
  
    return formattedDate;
  }
  
  export function formatDatetime1(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
  
    const formattedDate = date.toLocaleString('en-IN', options);
  
    return formattedDate;
  }
  
  

 export function formatDate(dateTimeString, type,) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const date = new Date(dateTimeString);
    const datee = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const date1 = datee < 10 ? `0${datee}` : datee
    let formattedDate;
    if (type == 'numeric') {
        formattedDate = `${year}-${month + 1}-${date1}`;
    } else if (type == 'month') {
        formattedDate = `${months[month]?.slice(0, 3)}`;
    } else if (type == 'date') {
        formattedDate = `${date1}`;
    } else if (type === 'fulldate') {
        formattedDate = `${date1} ${months[month]?.slice(0, 3)}, ${year} `;
    }  else if (type === 'fullmonth') {
        formattedDate = `${date1} ${months[month]?.slice(0, 3)} `;
    } 
    else {
        formattedDate = `${date1} ${months[month]?.slice(0, 3)}`;
    }



    return formattedDate;
}