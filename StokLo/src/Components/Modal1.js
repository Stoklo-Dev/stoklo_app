import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image,Linking,Dimensions } from 'react-native';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import FastImage from 'react-native-fast-image';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight } from 'react-native-responsive-dimensions';


export default function Modal1(props) {
  const {height,width} = Dimensions.get('window');
  const screenheight=height*0.08
    console.log('====================================');
    console.log(props?.isModalVisible);
    console.log('====================================');
    const phoneNumber = '+917372900900';
    const handleCallPress = () => {
        props?.setIsModalVisible(false);

        const phoneNumberWithPrefix = `tel:${phoneNumber}`;
        Linking.openURL(phoneNumberWithPrefix);
       

      };
    const handlequery = () => {
        props?.setIsModalVisible(false);

        props.navigation.navigate("HelpandSupport")
      };
    const handleclose = () => {
        props?.onclose
      };

    return (



        <View style={styles.container}>


            <Modal
                animationType="slide"
                transparent={true}
                visible={props?.isModalVisible}

            >
                <View style={styles.modalContainer}>
               
                    <View style={styles.modalContent}>
                    <TouchableOpacity
onPress={()=>props?.setIsModalVisible(false)}
style={{position: 'absolute', right: -30, top: -10}}>
<View
  style={{
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginRight: 20,
    height: 30,
    width: 30,
    backgroundColor: '#ffffff',
    borderRadius: 15,
  }}>
  <FastImage
    resizeMode="contain"
    style={{
      height: 20,
      width: 20,
    }}
    source={require('../assets/icons/cross.png')}
  />
</View>
</TouchableOpacity>
                        <TouchableOpacity
                        onPress={handleCallPress}
                        >

                        <View style={{padding:responsiveHeight(0.7),backgroundColor:'#FFD2A8',borderRadius:15,marginHorizontal:screenheight}}>
                        <View style={{flexDirection:'row',alignItems:"center",}}>
                        <View >

                        <FastImage
              resizeMode="contain"
              style={{
                width: 42,
                height: 42,

               
              }}
              source={require('../assets/icons/helpicon.png')}
            />
            
            </View>
                            <Text style={{ fontFamily: Fonts.FONT_MEDIUM, fontSize: responsiveFontSize(1.8), color: "#000000", }}>+91-7372900900</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={handlequery}
                        
                        >
                        <View style={{padding:responsiveHeight(0.7),backgroundColor:'#FFD2A8',borderRadius:15,marginTop:20,marginBottom:20,marginHorizontal:screenheight}}>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                        <View>

                        <FastImage
              resizeMode="contain"
              style={{
                width: 42,
                height: 42,

               
              }}
              source={require('../assets/icons/shad.png')}
            />
                 <FastImage
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                position:"absolute",
                bottom:10,left:11

               
              }}
              source={require('../assets/icons/query.png')}
            />
            </View>
                            <Text style={{ fontFamily: Fonts.FONT_MEDIUM, fontSize: responsiveFontSize(1.8), color: "#000000", }}>Submit Your Query</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        <View >
                            
                        </View>
                    
                    </View>
                </View>
            </Modal>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black'

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000070'

    },
    modalContent: {
        backgroundColor: '#F2F2F2',
        paddingTop: 20,
        borderRadius: 10,
        marginHorizontal: 30,
        // paddingHorizontal:30
        // alignItems:"center"

        


    },
    modalTitle: {
        fontSize: 18,
        // fontWeight: 'bold',
        fontFamily: Fonts.Coltan_Gea_Bold
    },
    modalMessage: {
        // marginVertical: 15,
        fontSize: 17,
        // marginHorizontal: 10,
        fontFamily: Fonts.Coltan_Gea
    },
    modalButton: {
        fontSize: 18,
        fontFamily: Fonts.FONT_REGULAR,
        color: '#ffffff',
        fontWeight: 'bold'
    },
});

// export default App;
