import { Platform, StyleSheet } from "react-native";
// import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
  
    },
    splashContainer: {
        flex: 1,
      
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginField: {
        flex: 2,
    
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 30,
        paddingHorizontal: 15
    },
    fieldHeading: {
        fontFamily: Fonts.FONT_BOLD,
        fontSize: 20,
        color:'#000000'
      
    },
    fieldTitle: {
        fontFamily: Fonts.FONT_REGULAR,
        fontSize: 11,

    },
    textInputWrapper: {

        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        paddingHorizontal: 5,
        paddingVertical: Platform.OS == 'ios' ? 15 : 0,
    },
    textInput: {
        flex: 1,
        fontFamily: Fonts.FONT_REGULAR,
        fontSize: 15,
 
    },
    forgetPassword: {
        fontFamily: Fonts.FONT_REGULAR,
        fontSize: 15,
  
        textAlign: 'right'
    },
    button: {
        borderRadius: 10,
backgroundColor:'#FF8F28',
        paddingVertical: 16,
        borderColor: '#FF8F28',
        borderWidth: 1,
        marginBottom: 13,
        // marginTop:-10

    },
    btnText: {
        fontFamily: Fonts.FONT_MEDIUM,
        fontSize: 17,

        textAlign: 'center',

        // borderWidth:1,

    },
    secondaryButton: {
        borderRadius: 10,

        paddingVertical: 14,
        borderColor: '#D32F2F',
        borderWidth: 1
    },
    secondaryBtnText: {
        fontFamily: Fonts.FONT_MEDIUM,
        fontSize: 17,
        color: '#D32F2F',

        textAlign: 'center'
    },
   
    noAccountWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    noAccountText: {
        fontFamily: Fonts.FONT_REGULAR,
        fontSize: 13,

        marginRight: 5
    },
    signupText: {
        fontFamily: Fonts.FONT_MEDIUM,
        fontSize: 13,

    },
    viewSpace: {
        width: 15
    },
    title: {
        fontFamily: Fonts.FONT_REGULAR,
        fontSize: 13,
        color: '#4E5061',
        textAlign: 'center'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E5E8',
        paddingHorizontal: 17,
        paddingVertical: Platform.OS == 'ios' ? 17 : 0
    },
    regularText: {
        fontFamily: Fonts.FONT_REGULAR,
        fontSize: 13,
       
    },
    pickerItem: {
        // height: 50,
        // paddingHorizontal: 5,
      
        fontSize: 15,
        fontFamily: Fonts.FONT_REGULAR,

    },
    listCard: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20
    },
    roundAddButton: {
        height: 64,
        width: 64,
        borderRadius: 64 / 2,
        position: 'absolute',
        bottom: 45,
        right: 15


    },
    bodyContainer: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "#ffffff",
        flex: 1,
        paddingHorizontal: 15,marginTop:10
    },
    upperContainer: {
        paddingHorizontal: 15,
        paddingBottom: 30,
        paddingTop: 45,

    },
    multilineInput: {
        minHeight: 140,
        lineHeight: 24,
        textAlignVertical: 'top',
        marginTop: 5,
        borderWidth: 1,

        borderRadius: 10,

        paddingHorizontal: 5,
        paddingVertical: Platform.OS == 'ios' ? 15 : 0,
    },
    imageSheetOptions: {
        fontFamily: Fonts.FONT_REGULAR,
        fontSize: 15,
        lineHeight: 24,

        marginTop: 15
    },
    selectImageView: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,

        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -11,
        bottom: -11,

        borderWidth: 0.5
    },
    selectImage: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2,

    }
})