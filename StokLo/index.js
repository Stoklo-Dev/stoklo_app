/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppContainer from './src/AppContainer';
import Mainapp from './src/Mainapp'
import messaging from '@react-native-firebase/messaging';

import { TextInput,Text } from 'react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background! index', remoteMessage);
});

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent(appName, () => Mainapp);
