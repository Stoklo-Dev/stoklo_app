import React, { useEffect, useState } from 'react';
import { View, Text, Touchable, Image, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import ImageComponents from '../../../components/ImageComponents';
// import Loader from '../../../components/Loader';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as ApiConstants from '../constants/ApiConstants';

const MapScreen = ({ navigation, route }) => {
    const handleLocationSelect = (data, details) => {
        
        // return
       
            navigation.navigate('Completeprofile', { data, details });
    
     
       
    };
    return (

        <View style={styles.container}>
            <GooglePlacesAutocomplete
             textInputProps={{
        placeholderTextColor: 'black',
        returnKeyType: "search",
        textAlign:'left'

      }}
                placeholder="Search"
                onPress={handleLocationSelect}
                fetchDetails
                suppressDefaultStyles={false}
                // currentLocation={true}
                // currentLocationLabel='current'
                styles={searchStyles}
                query={{
                    key: 'AIzaSyDnOy7WwBfBhcFuz_VMgFX1OlA_XVig25Q',
                    language: 'en',
                }}
                
            />

        </View>




    )
};

export default MapScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },



});

const searchStyles = StyleSheet.create({
    container: {
        // flex:1
        // position: 'absolute',
        // top: 50,
        // left: 10,
        // right: 10,
        marginTop: 50,
        marginBottom: 100,
        marginHorizontal: 10
    },
    textInputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth: 0,

        
        
       
    },
    
    textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: 'black',
        fontSize: 16,
        
    
    },
    
    poweredContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: '#c8c7cc',
        borderTopWidth: 0.5,
      },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
    description:{
        color:'black',
       
    },

   

});