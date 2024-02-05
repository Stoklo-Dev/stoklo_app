import { NavigationActions } from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    console.log('navigatorRef:', navigatorRef)
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    console.log('routeName, params', routeName, params)
    _navigator.navigate(routeName, params);
}

function goBack() {
    console.log('goback')
    _navigator.dispatch(NavigationActions.back());
}


export default {
    navigate,
    setTopLevelNavigator,
    goBack,
};