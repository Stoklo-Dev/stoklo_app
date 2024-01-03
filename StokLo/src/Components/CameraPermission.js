import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import React from 'react';
import { View, Text, Button, Linking,Platform } from 'react-native';

export const checkCameraPermission = async () => {
  try {
    const permissionStatus = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA
    );

    return permissionStatus;
  } catch (error) {
    console.error('Error checking camera permission:', error);
    return RESULTS.DENIED;
  }
};
export const checkMediaPermission = async () => {
  let androidVersion
  
    if (Platform.OS === 'android') {
      androidVersion = Platform.constants['Release'];
      console.log('Android Version:', androidVersion);
    }
  try {
    const permissionStatus = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
        :androidVersion>12?PERMISSIONS.ANDROID.READ_MEDIA_IMAGES:PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    );

    return permissionStatus;
  } catch (error) {
    console.error('Error checking camera permission:', error);
    return RESULTS.DENIED;
  }
};

export const PermissionDeniedScreen = () => {
  const openAppSettings = () => {
    Linking.openSettings();
  };

  return (
    <View>
      <Text style={{marginBottom:20}}>Camera access is required to use this feature.</Text>
      <Button  title="Open App Settings" onPress={openAppSettings} />
    </View>
  );
};

export default PermissionDeniedScreen;
