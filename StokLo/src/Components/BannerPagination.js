import React from 'react';
import { StyleSheet, Animated, View, Dimensions } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('screen');

const BannerPagination = ({ data, scrollX, home }) => {
    console.log('Maynnk',scrollX )
    if (!scrollX) {
        // Handle the case where scrollX is undefined
        return null;
      }
    return (
        <View style={styles.container}>
            {data?.map((_, idx) => {
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                const dotWidth = scrollX?.interpolate({
                    inputRange,
                    outputRange: home ? [8, 16, 8] : [11, 11, 11],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX?.interpolate({
                    inputRange,
                    outputRange: [0.2, 1, 0.1],
                    extrapolate: 'clamp',
                });

                const backgroundColor = scrollX?.interpolate({
                    inputRange,
                    outputRange: ['#FFD2A8', '#FF8F28', '#FFD2A8'],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={idx.toString()}
                        style={[
                            home ? styles.dot1 : styles.dot,
                            { width: dotWidth, backgroundColor },
                        ]}
                    />
                );
            })}
        </View>
    );
};

export default BannerPagination;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    dot: {
        height: 10,
        borderRadius: 10,
        marginHorizontal: 4,
        backgroundColor: '#cccccc',
    },
    dot1: {
        height: responsiveHeight(0.7),
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: '#cccccc',
    },
    dotActive: {
        backgroundColor: '#000000',
    },
});
