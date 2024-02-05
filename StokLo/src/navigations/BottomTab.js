import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info';



import Buy from '../screens/Buy/Buy';
import Orders from '../screens/Orders/Orders';
import Homescreen from '../screens/Homescreen/Homescreen';

import Fonts from '../constants/Fonts';
import dukaan from '../assets/icons/dukaan.png'
import buy from '../assets/icons/buy.png'
import orders from '../assets/icons/orders.png'




const Tab = createBottomTabNavigator();
function getTabBarHeight() {
    if (Platform.OS == 'ios') {
        const hasNotch = getStatusBarHeight(true) > 24;
        return hasNotch ? 90 : 66
    } else {
        return 66
    }
}
export default function BottomTab() 




{

    const deviceModel = DeviceInfo.getModel();

    const {height,width} = Dimensions.get('window');

    const screenwidth=width*0.88
    const screenheight=height*0.11
    let labell
    if(deviceModel === 'iPhone 6' || deviceModel === 'iPhone 6s' || deviceModel === 'iPhone 7' || deviceModel === 'iPhone 8' || deviceModel==='iPhone SE'){
        labell=height*0.015
    }else if(deviceModel === 'iPhone 14' || deviceModel === 'iPhone 13' || deviceModel === 'iPhone 12' || deviceModel === 'iPhone 11' || deviceModel==='iPhone X'){
        labell=height*0.005 
    }
    else{
        labell=height*0.025 
    }
    return (
        <Tab.Navigator
            backBehavior='firstRoute'
            activeColor={'#D32F2F'}
            inactiveColor={'#4E5061'}
            shifting={false}
            initialRouteName='Homescreen'
            screenOptions={() => ({
                headerShown: false,
                // tabBarActiveTintColor: '#D32F2F',
                // tabBarInactiveTintColor: '#4E5061',
                tabBarLabelStyle: { fontFamily: Fonts.FONT_BOLD, fontSize: 13,color:'#000000',marginBottom:labell  },
          
                tabBarStyle: { height: screenheight,backgroundColor:"#F2F2F2",borderTopColor:'#ffffff',borderTopWidth:2},
               
            })}
        >
            <Tab.Screen
                name='Homescreen'
                component={Homescreen}
               
                options={{
                    tabBarVisible: true,
                    tabBarLabel: 'Dukaan',
                    tabBarIcon: ({ focused, color }) => (
                        <View style={{ backgroundColor: focused ? '#FFD2A8' : 'transparent',width:37,height:37,alignSelf:"center",alignItems:'center',justifyContent:'center',borderRadius:15 }}>
                        <FastImage
                            source={dukaan}
                            style={styles.iconStyle}
                            resizeMode='contain'
                           
                        />
                        </View>
                    ),
                    
                }}
            >

            </Tab.Screen>
            <Tab.Screen
                name='Buy'
                component={Buy}
                options={{
                    tabBarStyle:{display:'none'},
                    tabBarLabel: 'Buy',
                    tabBarIcon: ({ focused, color }) => (
                        <View style={{ backgroundColor: focused ? '#FFD2A8' : 'transparent',width:37,height:37,alignSelf:"center",alignItems:'center',justifyContent:'center',borderRadius:15 }}>
                        <FastImage
                            source={buy}
                            style={styles.iconStyle}
                            resizeMode='contain'
                           
                        />
                        </View>
                    ),
                   
                }}
            >

            </Tab.Screen>
            <Tab.Screen
                name='Orders'
                component={Orders}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ focused, color }) => (
                        <View style={{ backgroundColor: focused ? '#FFD2A8' : 'transparent',width:37,height:37,alignSelf:"center",alignItems:'center',justifyContent:'center',borderRadius:15 }}>
                        <FastImage
                            source={orders}
                            style={[styles.iconStyle,{marginRight:5}]}
                            resizeMode='contain'

                        />
                        </View>
                    ),
                    
                }}
            >

            </Tab.Screen>
            
          

           
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    iconStyle: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    }
})