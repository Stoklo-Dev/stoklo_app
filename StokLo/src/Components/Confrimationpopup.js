import React, { useState } from 'react'
import { StyleSheet, Switch, SafeAreaView, Text, View, Image, FlatList, Touchable, StatusBar, TouchableOpacity, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import FastImage from 'react-native-fast-image';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Fonts from '../constants/Fonts';
import RBSheet from 'react-native-raw-bottom-sheet';
const Confrimationpopup = (props) => {
  return (
    <View>
      <RBSheet
        ref={props.refRBSheet}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000099',
          },
          container: {
            height: 'auto',
            borderColor: 'grey',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,

          },
          draggableIcon: {
            borderBottomWidth: 5,
            marginTop: 9,
            marginHorizontal: 129,
            borderBottomColor: '#E6E6E6',
            borderRadius: 5,
            width: 0,
          },
        }}>
        <View>

          
          <Text
            style={{
              fontFamily: Fonts.FONT_BOLD,
              fontSize: responsiveFontSize(2.7),
              marginTop: 20,
              textAlign: 'center',
              fontWeight: '500',
              color: 'black',
            }}>
            {props.status}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.FONT_REGULAR,
              fontSize: responsiveFontSize(2),
              marginTop: 20,
              textAlign: 'center',
              fontWeight: '500',
              color: '#4E5061',
              paddingHorizontal: 60,
              lineHeight: 25
            }}>
            {props.text}
          </Text>

          <View style={{ marginTop: responsiveHeight(8) }} >
            <TouchableOpacity onPress={props.ok} style={{ position: 'relative', left: 25, bottom: responsiveHeight(5) }}>
              <View style={{ width: responsiveWidth(87), borderRadius: responsiveHeight(1.4),backgroundColor:'#FF8F28', }}>
              {props.logout?<Text style={{ marginVertical: responsiveHeight(1.8), textAlign: 'center', fontSize: responsiveFontSize(2.2), color: '#FFFFFF' }}>{props.nameOfButton}</Text>:
                <Text style={{ marginVertical: responsiveHeight(1.8), textAlign: 'center', fontSize: responsiveFontSize(2.2), color: '#FFFFFF' }}>OK</Text>}
              </View>
            </TouchableOpacity>
          </View>
          {!props.isCancel ? null : <View style={{ marginTop: responsiveHeight(3) }} >

            <TouchableOpacity onPress={() => props.refRBSheet.current.close()} style={{ position: 'relative', bottom: responsiveHeight(5), alignSelf: 'center' }}>
              <View style={{ alignSelf: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(2.2), color: '#4E5061' }}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>}


        </View>
      </RBSheet>
    </View>
  )
}

export default Confrimationpopup