import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Fonts from '../constants/Fonts';
import FastImage from 'react-native-fast-image';

const PopupModal = ({ isVisible, text, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
     <View style={styles.modalContainer}>
        <View style={{backgroundColor:"#ffffff",marginHorizontal:15,padding:10,paddingHorizontal:15,borderRadius:10}}>
        <View style={{flexDirection:"row",alignItems:'center'}}>
        <FastImage style={{height:40,width:40}} resizeMode='contain' source={require('../assets/icons/stoklologo.png')}/>
        <Text style={{ fontFamily: Fonts.FONT_MEDIUM,
        fontSize: 15,
        lineHeight: 22,
        color: '#293299',marginLeft:15}}>Stoklo</Text>
              <Text style={{ fontFamily: Fonts.FONT_MEDIUM,
        fontSize: 15,
        lineHeight: 22,
        color: '#293299',marginLeft:15}}>Stoklo</Text>
        </View>
        </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  
  modalContainer: {
    flex:1,
    backgroundColor:'#00000064',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
});

export default PopupModal;
