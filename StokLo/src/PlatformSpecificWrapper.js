import React from 'react';
import { View, SafeAreaView, Platform,TouchableWithoutFeedback,Keyboard, StatusBar } from 'react-native';

const PlatformSpecificWrapper = ({ children, style,props }) => {
  const WrapperComponent = Platform.OS === 'ios' ? SafeAreaView : View;
  const handleKeyboardDismiss = () => {
    // Dismiss the keyboard when tapping outside the text input
    Keyboard.dismiss();
  };
 
    return <WrapperComponent style={[style, { marginTop: 40 }]}>
     <StatusBar backgroundColor={'#F2F2F2'} barStyle='dark-content' translucent />
    {children}</WrapperComponent>;
 
};
 


export default PlatformSpecificWrapper;
