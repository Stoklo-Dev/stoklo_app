import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

export default function Loader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.LOADER_COLOR} style={styles.activityIndicator}
            


            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor:'transparent'
    },
    loader: {
        alignSelf: 'center',
        height: 150,
        width: 150,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
})