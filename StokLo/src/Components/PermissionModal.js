import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet,TouchableOpacity,Linking,Platform } from 'react-native';

import { request, PERMISSIONS,  } from 'react-native-permissions';
import { RESULTS } from 'react-native-permissions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Fonts from '../constants/Fonts';
import FastImage from 'react-native-fast-image';
const PermissionModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const openAppSettings = () => {
    props.setShowModal(false)
    props.rbsheet.current.close()
    Linking.openSettings();
  };
  const setInitialValue = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTimeCamera');
  
      if (isFirstTime === null) {
        await AsyncStorage.setItem('isFirstTimeCamera', 'true');
       
      }
  
      
    } catch (error) {
      console.error('Error setting initial value:', error);
      return false;
    }
  };
  const setInitialValue2 = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTimeMedia');
  
      if (isFirstTime === null) {
        await AsyncStorage.setItem('isFirstTimeMedia', 'true');
       
      }
  
      
    } catch (error) {
      console.error('Error setting initial value:', error);
      return false;
    }
  };
  const requestCameraPermission = async () => {
  
  
    try {
      const permissionStatus = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA
      );
      
      if (permissionStatus === RESULTS.GRANTED) {
        console.log('Camera permission granted');
        setInitialValue()
        props.setShowModal(false)
        props.onSuccessCamera();
      } else {
        setInitialValue()
        props.setShowModal(false)
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };
  const requestMediaAccessPermission=async ()=>{
    let androidVersion
    if (Platform.OS === 'android') {
      androidVersion = Platform.constants['Release'];
      console.log('Android Version:', androidVersion);
    }
    try {
          const permissionStatus = await request(
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
              : androidVersion>12?PERMISSIONS.ANDROID.READ_MEDIA_IMAGES:PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          );
          
          if (permissionStatus === RESULTS.GRANTED) {
            console.log('Camera permission granted');
            setInitialValue2()
        props.setShowModal(false)
        props.onSuccessImage();

         
          } else {
            setInitialValue2()
        props.setShowModal(false)
            console.log('Camera permission denied');
          }
        } catch (error) {
          console.error('Error requesting camera permission:', error);
        }
  }

  return (
    <View style={styles.container}>
     

      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isVisible}
        onRequestClose={toggleModal}
        style={{
   

        }}
      >
        <View style={styles.modalContainer}>
        <View style={{backgroundColor:"#ffffff",marginHorizontal:15,padding:10,paddingHorizontal:15,borderRadius:10}}>
        <View style={{flexDirection:"row",alignItems:'center'}}>
        <FastImage style={{height:40,width:40}} resizeMode='contain' source={require('../assets/icons/stoklologo.png')}/>
        <Text style={{ fontFamily: Fonts.FONT_MEDIUM,
        fontSize: 15,
        lineHeight: 22,
        color: '#293299',marginLeft:15}}>Stoklo</Text>
        </View>
        {props.Camera?
        <View>
        {!props.firstTime?
          <Text style={styles.modalText}>{"To capture photos, allow Stoklo access to your camera. Tap Setting > Permissions, and turn Camera on."}</Text>:<Text style={styles.modalText}>To capture photos, allow Stoklo access to your camera.</Text>}
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,marginTop:20}}>
          <TouchableOpacity onPress={()=>props.setShowModal(false)}>
          <Text style={{fontFamily:Fonts.FONT_REGULAR,color:'#D32F2F'}}>Not now</Text></TouchableOpacity>
          {props.firstTime?
          <TouchableOpacity onPress={requestCameraPermission}>
          <Text style={{fontFamily:Fonts.FONT_REGULAR,color:'#D32F2F'}}>Continue</Text></TouchableOpacity>: <TouchableOpacity onPress={openAppSettings}>
          <Text style={{fontFamily:Fonts.FONT_REGULAR,color:'#D32F2F'}}>Setting</Text></TouchableOpacity>}
          </View>
          </View>:<View>
        {!props.firstTime2?
          <Text style={styles.modalText}>{`To use media, allow Stoklo access to your devices's photos. Tap Setting > Permissions, and turn "Photos and videos" on.`}</Text>:<Text style={styles.modalText}>To use media, allow Stoklo access to your devices's photos.</Text>}
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,marginTop:20}}>
          <TouchableOpacity onPress={()=>props.setShowModal(false)}>
          <Text style={{fontFamily:Fonts.FONT_REGULAR,color:'#D32F2F'}}>Not now</Text></TouchableOpacity>
          {props.firstTime2?
          <TouchableOpacity onPress={requestMediaAccessPermission}>
          <Text style={{fontFamily:Fonts.FONT_REGULAR,color:'#D32F2F'}}>Continue</Text></TouchableOpacity>: <TouchableOpacity onPress={openAppSettings}>
          <Text style={{fontFamily:Fonts.FONT_REGULAR,color:'#D32F2F'}}>Setting</Text></TouchableOpacity>}
          </View>
          </View>}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex:1,
    backgroundColor:'#00000064',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color:'#000000'
    ,fontFamily:Fonts.FONT_REGULAR
  },
});

export default PermissionModal;
