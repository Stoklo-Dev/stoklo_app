import { CommonActions, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { default as RBSheet, default as SelectImageSheet } from 'react-native-raw-bottom-sheet';
import {
  responsiveHeight
} from 'react-native-responsive-dimensions';
import Inputcard from '../Components/Inputcard';
import PlatformSpecificWrapper from '../PlatformSpecificWrapper';
import styles from '../Styles/styles';
import Fonts from '../constants/Fonts';

import { Utility } from '../util';

import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '../Components/Button';


import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { RESULTS } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import {
  checkCameraPermission,
  checkMediaPermission
} from '../Components/CameraPermission';
import Drivinglicense from '../Components/Drivinglicense';
import Dropdowncard from '../Components/Dropdowncard';
import Loader from '../Components/Loader';
import PermissionModal from '../Components/PermissionModal';

import { CommonService } from '../api/CommonService';
import { UploadService } from '../api/UploadService';
import { formatDate } from '../util/Utility';
export default function Completeprofile({navigation, props, route}) {
  const [openDatePickerr, setOpenDatePickerr] = useState({});

  const {height, width} = Dimensions.get('window');
  const deviceModel = DeviceInfo.getModel();
  const androidVersion = DeviceInfo.getSystemVersion();
console.log('Android Version:', androidVersion);
const userData = useSelector((state)=>state.Userdata)
console.log("userdatatata",userData)
const [ownershiplist, setOwnershiplist] = useState(null);
const [licenselist, setLicenselist] = useState(null);
const [pri, setpri] = useState('Privacy_Policy');
const [isLoading, setIsLoading] = useState(false);
let [isRefreshing, setIsRefreshing] = useState(false);
const [tr, setTr] = useState(true);

  //Personal details States-------
  const [personal, setPersonal] = useState(route?.params?.details);
  // const [number, setNumber] = useState(route?.params?.number);
  const [retailer, setRetailer] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState(route?.params?.number);
  const [secondmobile, setSecondmobile] = useState('');
  const [allow, setAllow] = useState(true);
  const [updates, setUpdates] = useState(true);
  const [terms, setTerms] = useState(true);
  const [tick, setTick] = useState(route?.params?.edit?true:false);
  const [tick1, setTick1] = useState(route?.params?.edit=='Licence details'?true:false);
  const [licen, setLicen] = useState(route?.params?.edit=='Licence details'?true:false);
  const [tick2, setTick2] = useState(false);
  const [refferal, setRefferal] = useState('');
  const [radio, setRadio] = useState('No');



  //Businesss details States------

  const [shopname, setShopname] = useState('');
  const [shop, setShop] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [owner, setOwner] = useState('');
  const [panname, setPanname] = useState('');
  const [pannumber, setPannumber] = useState('');
  const [gst, setGst] = useState('');
  const [name, setName] = useState(route?.params?.edit);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedProfileImage1, setSelectedProfileImage1] = useState(null);
  const [selectedProfileImage2, setSelectedProfileImage2] = useState(null);
  const [profileImage1, setProfileImage1] = useState(null);
  const [profileImage2, setProfileImage2] = useState(null);
  const [type, setType] = useState(route?.params?.edit?route?.params?.edit:'Personal details');
  let [selectedLicense, setSelectedLicense] = useState([]);
  const [appliedLicenses, setAppliedLicenses] = useState([]);
  const screenwidth = width * 0.88;
  const rbsheetheight = height * 0.67;
  const [textInputValues, setTextInputValues] = useState(Array(appliedLicenses.length * 2).fill(''));
  const [licenseData, setLicenseData] = useState({});
  const [allItemsRemoved, setAllItemsRemoved] = useState(false);
  const [filllater, setFilllater] = useState(route?.params?.edit?true:false);
  const imageState = {}; 
  const [selectedLicenses, setSelectedLicenses] = useState(null);
//licemse rbsheet

const licensesheet = useRef();
const [chosenDate, setChosenDate] = useState(new Date());
const [selectedDate, setSelectedDate] = useState({});
  const isFocused = useIsFocused();
  // const route = useRoute();
  //   console.log("qwejnckjncjdbncj", route)
  console.log('adresssss', name);
  const imageSheet = useRef();
  const imageSheet1 = useRef();
  const imageSheet2 = useRef();
  const [permissionStatus, setPermissionStatus] = useState(RESULTS.UNAVAILABLE);
  const [permissionStatus2, setPermissionStatus2] = useState(
    RESULTS.UNAVAILABLE,
  );
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [firstTime, setFirstTime] = useState(true);
  const [firstTime2, setFirstTime2] = useState(true);
  const [camera, setCamera] = useState(false);
  const [fill, setFill] = useState(route?.params?.edit ? true :false);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(route?.params?.edit=='Licence details'?false:true);
  const [step3, setStep3] = useState(true);


  //for permission check ----
  useEffect(() => {
    const checkPermission = async () => {
      const status = await checkCameraPermission();
      console.log('camera',status);
      const first = await AsyncStorage.getItem('isFirstTimeCamera');
      setFirstTime(first);
      setPermissionStatus(status);
    };
    const checkPermission2 = async () => {
      const status = await checkMediaPermission();
      console.log('photos',status);
      const first = await AsyncStorage.getItem('isFirstTimeMedia');
      setFirstTime2(first);
      setPermissionStatus2(status);
    };

    checkPermission();
    checkPermission2();
  }, [showModal, count]);


 

//upload store front image-----

  const selectLibraryImage = async () => {
    let options = {
      mediaType: 'photo',
      quality: 0.5,
      presentationStyle: 'fullScreen',
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        setSelectedProfileImage(response);
        setProfileImage(response?.assets[0]);
      } else {
        return;
      }
      imageSheet.current.close();
    });
  };
  const selectCameraImage = async () => {
    let options = {
      mediaType: 'photo',
      quality: 0.5,
      presentationStyle: 'fullScreen',
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        return;
      } else {
        setSelectedProfileImage(response);
        setProfileImage(response?.assets[0]);
      }
      imageSheet.current.close();
    });
  };

  
//upload pan card images 
  const selectLibraryImage1 = async () => {
    let options = {
      mediaType: 'photo',
      quality: 0.5,
      presentationStyle: 'fullScreen',
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        setSelectedProfileImage1(response);
        setProfileImage1(response?.assets[0]);
      } else {
        return;
      }
      imageSheet1.current.close();
    });
  };
  const selectCameraImage1 = async () => {
    let options = {
      mediaType: 'photo',
      quality: 0.5,
      presentationStyle: 'fullScreen',
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        return;
      } else {
        setSelectedProfileImage1(response);
        setProfileImage1(response?.assets[0]);
      }
      imageSheet1.current.close();
    });
  };
  const chooseImageUploader = type => {
    if (type === 'camera') {
      selectCameraImage();

    }
    if (type === 'library') {
      selectLibraryImage();

    }
  };
  const chooseImageUploader1 = type => {
    if (type === 'camera') {

      selectCameraImage1();
    }
    if (type === 'library') {

      selectLibraryImage1();
    }
  };
//api for ownershiplist

useEffect(() => {

  getownership();
}, [])
const getownership = () => {
  let url = 'ownership-type-list';
  try {
      CommonService.fetchGetApi(url).then((response) => {
          if (response.code == 200) {
              let ownership = [];
              for (let i = 0; i < response?.data?.length; i++) {
                  ownership.push({ label: response.data[i].types, value: response.data[i].id })
              }
              setOwnershiplist(ownership);
              // getStateList();
          } else {
              Utility.log("else", response);
              if (response.code == 401) {
                  Utility.Logout(navigation, response);
              }
          }
      })
  } catch (error) {
      Utility.log("Catch error:", error)
      Utility.showToast(error)
  }
}


//handlevalidatepersonaldetails
  const handlepersonaldetails = () => {
    // validate()
    if (!retailer) {
      Utility.showToast("Please enter retailer full name");
      return;
    } else if (Utility.validateName(retailer) == false) {
      Utility.showToast("Please enter valid retailer name");
      return;
    }
    if (aadhar) {
      if (!/^[0-9]*$/.test(aadhar) ||  aadhar.length !== 12) {
        Utility.showToast('Please enter a valid 12-digit Aadhar number');
        return;
  } 
    }

    if (email) {
      if (Utility.validateEmail(email) == false) {
        Utility.showToast("Please enter a valid email");
        return;
  } 
    }
  
    if (!mobile) {
      Utility.showToast('Please enter your mobile number');
      return;
  } else if  (!/^[0-9]*$/.test(mobile) || mobile.length !== 10|| /^0+/.test(mobile)) {
    Utility.showToast('Please enter a valid mobile number');
    return
}
  if (radio=='Yes') {
    if (!secondmobile) {
      Utility.showToast('Please enter your Secondary mobile number');
      return;
  } else if  (!/^[0-9]*$/.test(secondmobile) || secondmobile.length !== 10|| /^0+/.test(mobile)|| /^[1-4]/.test(secondmobile)) {
      Utility.showToast('Please enter a valid Secondary mobile number');
      return
  }
  else if (secondmobile === mobile) {
    Utility.showToast('Secondary mobile number should be different from the primary mobile number');
    return;
}
}
if (!terms) {
  Utility.showToast('Please accept Terms & Conditions or Privacy Policy');
  return;
}

handleperosnalstep()
  };

//personal details api
  const handleperosnalstep = () => {


    let data = {
      retailerName: retailer,
      // aadharNumber: aadhar,
      email: email,
      phoneNumber: mobile,
      isWhatsapp: allow?1:0,
      isUpdateOnEmail: updates?1:0,
      termCondition: terms?1:0,
       
    }
    if (email) {
      data['email'] = email
  }
  if (aadhar) {
    data['aadharNumber'] = aadhar
}

    if (radio=='Yes') {
          data['secondaryMobileNumber'] = secondmobile
      }
      if (refferal) {
        data['referralCode'] = refferal
    }
  
Utility.log("sjsgsthas",data)
    setIsLoading(true);
    let url = 'update-user-details';
    UploadService.fetchPostFormData(url, (data)).then((response) => {
      console.log("hello",response,data)
        setIsLoading(false);
        if (response.code == 200) {
          setTick(true)
            Utility.showToast(response?.message);
Utility.setValueInAsyncStorage("IsLogin",'true');

            Utility.setValueInAsyncStorage("Isfirsttime",'true');
Utility.setValueInAsyncStorage("checkbonus",'true');

    handletab('Business details')
setFilllater(true)
setStep1(false)
setStep2(false)



        } else {
            Utility.showToast(response?.message);
            // if (response.code == 402) {
            //     Utility.Logout(navigation, response);
            // }
        }
    })
    .catch((error) => {
      // Handle the promise rejection here
        if (error.code == 402) {
            Utility.showToast(error?.message);
            navigation.dispatch(
              CommonActions.reset({
                  index: 0,
                  routes: [
                      { name: 'Login' }
                  ]
              })
          )
          }
      Utility.log("Promise rejection:", error);
      setIsLoading(false);
      setIsRefreshing(false);
      // Handle other error cases if needed
    });
}







//for handlebusnnes details validation




const handlebusinessdetails = () => {
  // validate()
  if (!shopname) {
    Utility.showToast("Please enter shop's  name");
    return;
  } else if (Utility.validateName(shopname) == false) {
    Utility.showToast("Please enter valid shop name");
    return;
  }
  if (!selectedProfileImage) {
    Utility.showToast(`Please add store front image`)
            return;
}
  if (!owner) {
    Utility.showToast("Please select type of ownership");
    return;
  } 
  // if (!pannumber.toUpperCase()) {
  //   Utility.showToast('Please enter your PAN card number');
  //   return 
  // } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pannumber.toUpperCase())) {
  //   Utility.showToast('Please enter a valid PAN card number');
  //   return
  // }

  if (pannumber.toUpperCase()||panname||selectedProfileImage1) {
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pannumber.toUpperCase())) {
      Utility.showToast('Please enter a valid PAN card number ex:(ABCDE1234F)');
      return;
} 
if (!panname) {
  Utility.showToast("Please enter PAN card holder name");
  return;
} else if (Utility.validateName(panname) == false) {
  Utility.showToast("Please enter valid PAN card holder name");
  return;
}

if (!selectedProfileImage1) {
  Utility.showToast(`Please add PAN card image`)
          return;
}
  }


if (gst.toUpperCase()) {
  if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(gst.toUpperCase())) {
    Utility.showToast('Please enter a valid GST number ex:(22ABCDE1234F1Z5) ');
    return;
} 
}
if (!shop) {
  Utility.showToast("Please enter shop Address");
  return;
}

handlebusinessstep()
};


//busines details api
const handlebusinessstep = () => {
  let storefrontimage = {
    name: selectedProfileImage?.assets[0].fileName,
    type: selectedProfileImage?.assets[0].type,
    uri: selectedProfileImage?.assets[0].uri,
    size: selectedProfileImage?.assets[0].fileSize,
}
let pancardimage = {
  name: selectedProfileImage1?.assets[0].fileName,
  type: selectedProfileImage1?.assets[0].type,
  uri: selectedProfileImage1?.assets[0].uri,
  size: selectedProfileImage1?.assets[0].fileSize,
}


 
   
  let data = new FormData();
  data.append('shopName', shopname);
  data.append('shopImage', storefrontimage);
  data.append('type', owner?.value);

  // data.append('panName', panname);
  // data.append('panImage', pancardimage);
  data.append('shopLocation', shop);
 
  if (gst.toUpperCase()) {
    data.append('gstNumber', gst.toUpperCase())
}
if (pannumber.toUpperCase()) {
  data.append('panBussiness', pannumber.toUpperCase())
}
if (panname) {
  data.append('panName', panname)
}
if (selectedProfileImage1) {
  data.append('panImage',pancardimage)
}

console.log("shsshsgswss",data)


  setIsLoading(true);
  let url = 'update-user-details';
  UploadService.fetchPostFormData(url, data).then((response) => {
    console.log("busniesssssshello",response,JSON.stringify(data))
      setIsLoading(false);
      if (response.code == 200) {
        setTick1(true)
setLicen(true)
          Utility.showToast('Business detail saved successfully.');
         { route?.params?.edit?null:      Utility.setValueInAsyncStorage("Isfirsttime",'true')}
         { route?.params?.edit?null:    Utility.setValueInAsyncStorage("checkbonus",'true')}

  handletab('Licence details')
  setStep2(false)
  setStep3(false)
  route?.params?.edit?navigation.dispatch(
    CommonActions.reset({
        index: 0,
        routes: [
            { name: 'BottomTab' }
        ]
    })
  ):null



      } else {
          Utility.showToast(response?.errors?.msg);
          // if (response.code == 402) {
          //     Utility.Logout(navigation, response);
          // }
      }
  })
  .catch((error) => {
    // Handle the promise rejection here
      if (error.code == 402) {
          Utility.showToast(error?.message);
          navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Login' }
                ]
            })
        )
        }
    Utility.log("Promise rejection:", error);
    setIsLoading(false);
    setIsRefreshing(false);
    // Handle other error cases if needed
  });
}


//handle lciense details vaidltaions

const handlelicensedetails =()=>{
  console.log('handlelicensedetails')
  const validationErrors = [];

    appliedLicenses.forEach((license) => {
        if (!licenseData[license]?.pan) {
            validationErrors.push(`License number is required for ${license}`);
            return
        }
        else if (!licenseData[license]?.pan1) {
            validationErrors.push(`Expiry Date is required for ${license}`);
            return
        }
      else  if (!licenseData[license]?.imageUri) {
            validationErrors.push(`License image is required for ${license}`);
            return
        }


    });

    if (validationErrors.length > 0) {
        // Display all validation errors
        validationErrors.forEach((error) => Utility.showToast("Please add drug license details to proceed."));
        return;
    }


      handlelicensesstep();


}

//handle license details api

const handlelicensesstep = async() => {
  const licenseDataArray = appliedLicenses.map((license) => {
      let licenseimage = {
          name: licenseData[license]?.imageUri.assets[0].fileName,
          type: licenseData[license]?.imageUri.assets[0].type,
          uri: licenseData[license]?.imageUri.assets[0].uri,
          size: licenseData[license]?.imageUri.assets[0].fileSize,
      };

      return {
        licenceName: license,
          licenceNumber: licenseData[license]?.pan,
          expiryDate: licenseData[license]?.pan1,
          storeImage: licenseimage,
      };
  });

  const transformedData = licenseDataArray?.map(detail => ({
    licenceNumber: detail?.licenceNumber,
    expiryDate: detail?.expiryDate,
    approvedLicenceName: detail?.licenceName, // You can modify this logic as needed

    // storeImage: detail?.storeImage
  }));

  const transformedData1 = licenseDataArray?.map(detail => ({
    // licenceNumber: detail?.licenceNumber,
    // expiryDate: detail?.expiryDate,
    // approvedLicenceName: detail?.licenceName, // You can modify this logic as needed

    storeImage: detail?.storeImage
  }));
const licenceNameArray = [];
const licenceNumberArray = [];
const expiryDateArray = [];
const storeImageArray = [];
const storeImagename = [];
const storeImagesize = [];
const storeImagetype = [];

licenseDataArray?.forEach((licence) => {
  licenceNameArray?.push(licence?.licenceName);
  licenceNumberArray?.push(licence?.licenceNumber);
  expiryDateArray?.push(licence?.expiryDate);
  storeImageArray?.push(licence?.storeImage?.uri);
  storeImagename?.push(licence?.storeImage?.name);
  storeImagesize?.push(licence?.storeImage?.size);
  storeImagetype?.push(licence?.storeImage?.type);
});
let image = {
  name: storeImagename,
  type: storeImagetype,
  uri: storeImageArray,
  size: storeImagesize,
};
const transformedData2 = {
  "storeImage": transformedData1?.storeImage?.map(item => item?.storeImage)
};
console.log("jsjshsgtsgsb",licenceNameArray,licenceNumberArray,expiryDateArray,storeImageArray)
// const { name, type, uri, size } = image?.storeImage;


// const transforimage = name?.map((_, index) => ({
//   name: name[index],
//   type: type[index],
//   uri: uri[index],
//   size: size[index]
// }));

const transforimage = Array.from({ length: image?.name?.length }, (_, index) => ({
  name: image?.name[index],
  type: image?.type[index],
  uri: image?.uri[index],
  size: image?.size[index]
}));


let data = new FormData();
data.append('licenceDetail',JSON.stringify( transformedData)
  );


  transforimage?.forEach((image) => {
    data.append('storeImage', image);
  });

  console.log("jsjshsgtsgsb", 
  // JSON.stringify(data) 
  JSON.stringify(data)
  )
  const token = await AsyncStorage.getItem('TOKEN');
  console.log("jsjsjsj",token)

  setIsLoading(true);
  let url = 'insert-licence-details';

//   const res = await fetch(
//     url,
//     {
//         method: 'POST',
//         headers: {
//           "Accept": 'application/json',
//           'Content-Type': 'multipart/form-data',
//           "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJpYXQiOjE3MDE2ODU1NzV9.tEnzedlmWV92gZaTjUJ3tknyKRFRirAEmGwCT1CVtwU"
//         },
//         body: data,
//     }
// )
// try {
//   const response = await res.json();

//   console.log("responserepsosne", response);

//   if (response.code === 200) {
//     // Handle success case
//     console.log("nsnssnsnsnsnns", response);
//     Utility.showToast('Licence detail saved successfully.');
//     // Additional logic after successful API call
//     // For example, navigating to another screen
//     navigation.dispatch(
//       CommonActions.reset({
//           index: 0,
//           routes: [
//               { name: 'BottomTab' }
//           ]
//       })
//     );
//     setStep3(true);
//   } else {
//     // Handle error case
//     console.error("API Error:", response);
//     // Utility.showToast(response?.errors?.msg);
//     // if (response.code === 402) {
//     //   Utility.Logout(props.navigation, response);
//     // }
//   }
// } catch (error) {
//   // Handle JSON parsing error or any other errors
//   setIsLoading(false);
//   //     setIsRefreshing(false);
//   console.error("Error parsing JSON:", error);
// }

  UploadService.fetchPostFormData(url,data).then((response) => {
      setIsLoading(false);
      if (response.code === 200) {
        setTick2(true)

          Utility.showToast('Licence detail saved successfully.');
          console.log("nsnssnsnsnsnns", response, JSON.stringify(data));


          { route?.params?.edit?null:    Utility.setValueInAsyncStorage("IsLogin",'true')}
          { route?.params?.edit?null:   Utility.setValueInAsyncStorage("Isfirsttime",'true')}
          { route?.params?.edit?null:   Utility.setValueInAsyncStorage("checkbonus",'true')}

setStep3(false)


navigation.dispatch(
  CommonActions.reset({
      index: 0,
      routes: [
          { name: 'BottomTab' }
      ]
  })
)
          // Additional logic after successful API call
      } else {
          Utility.showToast(response?.errors?.msg);
         
          // if (response.code == 402) {
          //   Utility.Logout(props.navigation, response);
          // }

          
      }
  }) .catch((error) => {
    // Handle the promise rejection here
      if (error.code == 402) {
          Utility.showToast(error?.message);
          navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Login' }
                ]
            })
        )
        }
    Utility.log("Promise rejection:", error);
    setIsLoading(false);
    setIsRefreshing(false);
    // Handle other error cases if needed
  });
};




const handlecontinue =()=>{
  console.log('handlecontinue')
if(type == 'Personal details'){
handlepersonaldetails()
}
else if(type == 'Business details'){
  handlebusinessdetails()
}
else if(licen){
  Utility?.showToast("Please fill Drug Licence details, or skip with Fill Later")
}else{
    handlelicensedetails();

}


}


  const handleFillLater = () => {
    // validate()

// navigation.dispatch('Homescreen'
// );
route?.params?.edi?null:Utility.setValueInAsyncStorage("IsLogin",'true')
navigation.dispatch(
  CommonActions.reset({
      index: 0,
      routes: [
          { name: 'BottomTab' }
      ]
  })
)
  };

  //api for getlicense lits
  useEffect(() => {
  
    getlicenselist();
  }, [])

  const getlicenselist = () => {
   
    let url = `licence-list`;
    try {
      CommonService.fetchGetApi(url).then(response => {
        setIsLoading(false);
        setIsRefreshing(false);
        if (response.code == 200) {
setLicenselist(response?.data)
console.log("ksksksksksks",licenselist)
         
        } else {
          Utility.log('else', response);
          // if (response.code == 402) {
          //   Utility.Logout(props.navigation, response);
          // }
        }
      }) .catch((error) => {
        // Handle the promise rejection here
          if (error.code == 402) {
              Utility.showToast(error?.message);
              navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Login' }
                    ]
                })
            )
            }
        Utility.log("Promise rejection:", error);
        setIsLoading(false);
        setIsRefreshing(false);
        // Handle other error cases if needed
      })
    } catch (error) {
      setIsLoading(false);
      setIsRefreshing(false);
      Utility.log('Catch error:', error);
      // Utility.showToast(error)
    }
  };



  const data = [
    { id: '1', title: '20A' },
    { id: '2', title: '20B' },
    { id: '3', title: '21A' },
    { id: '4', title: '21B' },
    // { id: '5', title: '20' },
    // { id: '6', title: '21' },
    // { id: '7', title: 'Insec' },
    // { id: '8', title: 'dolo' },
   
  ];

  //logic for fill later button 
  const handleInputChange = (inputNumber, text) => {
    switch (inputNumber) {
      case 1:
        setRetailer(text);
        break;
      case 2:
        setAadhar(text);
        break;
      case 3:
        setEmail(text);
        break;
      case 4:
        setMobile(text);
        break;
    }
  };

  React.useEffect(() => {
    if (radio=='Yes') {
      if (retailer  && mobile && secondmobile && terms) {
        route?.params?.edit?null:  setFill(true);
      } else {
        route?.params?.edit?null:  setFill(false);
      }
    } else {
      if (retailer   && mobile && terms) {
        route?.params?.edit?null:   setFill(true);
      } else {
        route?.params?.edit?null:   setFill(false);
      }
    }
  }, [retailer, mobile, secondmobile, radio,terms]);


 
console.log('checkkk',retailer,aadhar,email,mobile,fill)
  const handletab = name => {
    if (name == 'Personal details') {
      setType('Personal details');
      if (type == 'Personal details') {
        setType(!type);
      }
    }
    if (name == 'Business details') {
      setType('Business details');
      if (type == 'Business details') {
        setType(!type);
      }
    }
    if (name == 'Licence details') {
      setType('Licence details');
      if (type == 'Licence details') {
        setType(!type);
      }
    }
  };

  const handleradio = name => {
    if (name == 'Yes') {
      setRadio('Yes');
    }
    if (name == 'No') {
      setRadio('No');
      setSecondmobile('')
    }
  };

  // useEffect(() => {
  //   if (isFocused) {
  //     setShop(route?.params?.data?.description);
  //     setLatitude(route?.params?.details?.geometry?.location?.lat);
  //     setLongitude(route?.params?.details?.geometry?.location?.lng);
  //     route.params = null;
  //   }
  // }, [isFocused]);
  const mapscreen = () => {
    navigation.navigate('MapScreen');
  };


//multislect


let defaultLicense = ["21D", "21C"];
const handleLicense = (license) => {
  let updatedSelectedLicense;

  if (selectedLicense.includes(license)) {
    // Remove the selected license and its related item
    updatedSelectedLicense = selectedLicense.filter(
      (item) => item !== license && item !== getRelatedItem(license)
    );
  } else {
    // Add the selected license and its related item
    updatedSelectedLicense = [...selectedLicense, license, getRelatedItem(license)];
  }
  const updatedSelectedLicense1 = updatedSelectedLicense.filter(item => !defaultLicense.includes(item));
  setSelectedLicense(updatedSelectedLicense1);
};

// Helper function to get the related item
const getRelatedItem = (license) => {
  return license.startsWith('20') ? license.replace('20', '21') : license.replace('21', '20');
};


const handlelicense =()=>{
  // setLicen(false)
  setSelectedLicense(appliedLicenses)
  licensesheet.current.open();

}
const addlicense = () => {
  const newAppliedLicenses = Array.from(new Set(appliedLicenses.concat(selectedLicense)));
  setAppliedLicenses(newAppliedLicenses.filter((item) => selectedLicense.includes(item)))
console.log('ssjsjsjjsjsjw',newAppliedLicenses)
selectedLicense.length>0?setLicen(false):setLicen(true)
  licensesheet.current.close()

};





const handleChange = (license, property, value) => {
  setLicenseData((prevData) => ({
    ...prevData,
    [license]: {
      ...prevData[license],
      [property]: value,
    },
  }));
};
const handleRemoveLicense = (license) => {
  // Remove the selected license and its related item
  const newLicenses = appliedLicenses.filter(
    (item) => item !== license && item !== getRelatedItem1(license)
  );
  setAppliedLicenses(newLicenses);
console.log('jsjsjjsjsstete',newLicenses)
  const newLicenseData = { ...licenseData };
  delete newLicenseData[license];
  delete newLicenseData[getRelatedItem1(license)]; // Remove the related item data
  setLicenseData(newLicenseData);
  setSelectedDate(new Date());
  newLicenses.length>0?setLicen(false): setLicen(true)
};

// Helper function to get the related item
const getRelatedItem1 = (license) => {
  return license.startsWith('20') ? license.replace('20', '21') : license.replace('21', '20');
};
const handleDateChange = (date) => {
  console.log('openDatePicker called for license:', date);

  setChosenDate(date);
  handleChange(selectedLicense, 'pan1', date);
};

const openDatePicker = (license) => {
  setOpenDatePickerr((prevOpenDatePickers) => ({
    ...prevOpenDatePickers,
    [license]: true,
  }));
};
useEffect(() => {
  setAllItemsRemoved(appliedLicenses.length === 0);
}, [appliedLicenses]);
console.log("Applied Licenses:", appliedLicenses);

const selectLibraryImage2 = (license) => {
  const options = {
    mediaType: 'photo',
    quality: 0.5,
    presentationStyle: 'fullScreen',
  };

  launchImageLibrary(options, (response) => {
    console.log('Library image response:', response);
    if (response.assets) {
      const imageUri = response;
      console.log('Selected image URI:', imageUri);
      handleChange(license, 'imageUri', imageUri);
    }
    imageSheet2.current.close()
  });
};

const selectCameraImage2 = (license) => {
  const options = {
    mediaType: 'photo',
    quality: 0.5,
    presentationStyle: 'fullScreen',
  };

  launchCamera(options, (response) => {
    if (!response.didCancel) {
      const imageUri = response;
      handleChange(license, 'imageUri', imageUri);
    }
    imageSheet2.current.close()

  });
};
const chooseImageUploader2 = (type,licence) => {
  if (type === 'camera') {
    selectCameraImage2(licence);

  }
  if (type === 'library') {
    selectLibraryImage2(licence);

  }
};
const openImageSheet2 = (license) => {
  setSelectedLicenses(license);
  setCount(count+1);
  imageSheet2.current.open();
};
const currentDate = new Date();
const nextDate = new Date(currentDate);

console.log("kaskkskskssss",licenseData)


  return (
    <PlatformSpecificWrapper style={{flex: 1}}>
      <View>
        <View>
          <Text style={Styles.text}>Complete your profile</Text>
        </View>
        <View
          style={{
            borderWidth: 0.6,
            borderColor: '#0000001A',
            marginTop: 15,
          }}></View>
      </View>



      <ScrollView  
      showsVerticalScrollIndicator={false}
       style={{flex: 1}}>
        <View style={{paddingHorizontal: 20, marginTop: 20}}>
       
            <View style={[Styles.contanier,{backgroundColor:step1?"rgba(71, 82, 245, 0.1)":'#FF8F2898'}]}>
            <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center",flex:1}}>
              <Text
                style={[
                  Styles.terms,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    fontSize: 17,
                    fontFamily: Fonts.FONT_BOLD,
                  },
                ]}>
                Personal details
              </Text>

             { tick && <FastImage
                  resizeMode="contain"
                  style={{
                    width: 22,
                    height: 22,


                  }}
                  source={require('../assets/icons/greentick.png')}
                />}
              </View>
            
            </View>
        
        </View>

        {type == 'Personal details' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animatable.View
              animation={
                type == 'Personal details' ? 'slideInDown' : 'slideOutUp'
              }
              duration={1000}>
              <Inputcard
                name="Retailer Name"
                placeholdertext="Enter Here"
                //   maxLength={10}
                value={retailer}
                onChangeText={(text) => handleInputChange(1, text)}
              />
              <Inputcard
                name="Aadhar Number(optional)"
                placeholdertext="Enter Here"
                keyboardType="numeric"
                maxLength={12}
                value={aadhar}
                onChangeText={(text) => handleInputChange(2, text)}

              />
              <Inputcard
                name="Email Address(optional)"
                placeholdertext="Enter Here"
                //   maxLength={10}
                value={email}
                onChangeText={(text) => handleInputChange(3, text)}

              />
              <Inputcard
                name="Phone Number(primary)"
                placeholdertext="Enter Here"
                keyboardType="numeric"
                maxLength={10}
                value={mobile}
                editable={false}
                onChangeText={(text) => handleInputChange(4, text)}

              />
              <View style={{marginTop: 15}}>
                <Text style={Styles.text1}>
                  Would you like to add another number?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: responsiveHeight(3),
                    marginTop: 10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => handleradio('Yes')}>
                      {radio == 'Yes' ? (
                        <FastImage
                          resizeMode="contain"
                          style={{
                            width: 30,
                            height: 30,
                          }}
                          source={require('../assets/images/radioorange.png')}
                        />
                      ) : (
                        <FastImage
                          resizeMode="contain"
                          style={{
                            width: 30,
                            height: 30,
                          }}
                          source={require('../assets/images/radiogrey.png')}
                        />
                      )}
                    </TouchableOpacity>
                    <Text
                      style={[Styles.text1, {fontSize: 17, marginLeft: 10}]}>
                      Yes
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 51,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => handleradio('No')}>
                      {radio == 'No' ? (
                        <FastImage
                          resizeMode="contain"
                          style={{
                            width: 30,
                            height: 30,
                          }}
                          source={require('../assets/images/radioorange.png')}
                        />
                      ) : (
                        <FastImage
                          resizeMode="contain"
                          style={{
                            width: 30,
                            height: 30,
                          }}
                          source={require('../assets/images/radiogrey.png')}
                        />
                      )}
                    </TouchableOpacity>
                    <Text
                      style={[Styles.text1, {fontSize: 17, marginLeft: 10}]}>
                      No
                    </Text>
                  </View>
                </View>
              </View>
              {radio == 'Yes' ? (
                <Inputcard
                  name="Phone number(Secondary)"
                  placeholdertext="Enter Here"
                  keyboardType="numeric"
                  maxLength={10}
                  value={secondmobile}
                  onChangeText={value => setSecondmobile(value)}
                />
              ) : null}

              <Inputcard
                name="Referral code(if any)"
                placeholdertext="Enter Here"
                //   maxLength={10}
                value={refferal}
                onChangeText={value => setRefferal(value)}
              />
<View>
<View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  marginTop: 10,

                  
                }}>
                <TouchableOpacity onPress={() => setTerms(!terms)}>
                  {terms ? (
                    <FastImage
                      resizeMode="contain"
                      style={{
                        width: 32,

                        height: 62,

                      }}
                      source={require('../assets/images/roundorange.png')}
                    />
                  ) : (
                    <FastImage
                      resizeMode="contain"
                      style={{
                        width: 32,
                        height: 62,

                        
                       
                      }}
                      source={require('../assets/images/roundgreyy.png')}
                    />
                  )}
                </TouchableOpacity>
<View >
<View style={{paddingHorizontal:15}}>
              <View
                style={{

      //  paddingHorizontal:10,
                  marginTop: 5,
                 
                  
                }}>
                <Text style={Styles.terms}>
            I Agree to the platform's{' '}

                  </Text>
<View style={{flexDirection:'row'}}>
                <TouchableOpacity
             onPress={()=>navigation.navigate("Terms")}
               style={{}}
                >
                  <Text
                    style={[
                      Styles.terms,
                      {
                        color: '#29388E',
                        textDecorationLine:'underline',
                      
                       
                      },
                    ]}>
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
                <Text style={Styles.terms}>{'  '}or{'  '}</Text>
                <TouchableOpacity
                          onPress={()=>navigation.navigate("Privacy")}

                >
                  <Text
                    style={[
                      Styles.terms,
                      {
                        color: '#29388E',
                   
                   
                        textDecorationLine: 'underline',
                      },
                    ]}>
                Privacy Policy
                  </Text>
                </TouchableOpacity>
                </View>
                <Text style={[Styles.terms]}> before proceeding. </Text>
              </View>
              
              </View>

            
                </View>
                
</View>
              </View>

               
        
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  marginTop: 15,
                }}>
                <TouchableOpacity onPress={() => setAllow(!allow)}>
                  {allow ? (
                    <FastImage
                      resizeMode="contain"
                      style={{
                        width: 32,
                        height: 32,
                      }}
                      source={require('../assets/images/roundorange.png')}
                    />
                  ) : (
                    <FastImage
                      resizeMode="contain"
                      style={{
                        width: 32,
                        height: 32,
                      }}
                      source={require('../assets/images/roundgreyy.png')}
                    />
                  )}
                </TouchableOpacity>

                <Text
                  style={[
                    Styles.terms,
                    {
                      marginLeft: 15,
                      alignSelf: 'center',
                      fontFamily: Fonts.FONT_MEDIUM,
                    },
                  ]}>
                  Allow notifications on Whatsapp.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  marginTop: 15,
                  marginBottom: 10,
                }}>
                <TouchableOpacity onPress={() => setUpdates(!updates)}>
                  {updates ? (
                    <FastImage
                      resizeMode="contain"
                      style={{
                        width: 32,
                        height: 32,
                      }}
                      source={require('../assets/images/roundorange.png')}
                    />
                  ) : (
                    <FastImage
                      resizeMode="contain"
                      style={{
                        width: 32,
                        height: 32,
                      }}
                      source={require('../assets/images/roundgreyy.png')}
                    />
                  )}
                </TouchableOpacity>

                <Text
                  style={[
                    Styles.terms,
                    {
                      marginLeft: 15,
                      alignSelf: 'center',
                      fontFamily: Fonts.FONT_MEDIUM,
                    },
                  ]}>
                  Get updates on email.
                </Text>
              </View>
            </Animatable.View>
          </ScrollView>
        ) : null}

        <View style={{paddingHorizontal: 20, marginTop: 20}}>
      
            <View style={[Styles.contanier,{backgroundColor:step2?'rgba(71, 82, 245, 0.1)':'#FF8F2898'}]}>

            <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center",flex:1}}>
              <Text
                style={[
                  Styles.terms,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    fontSize: 17,
                    fontFamily: Fonts.FONT_BOLD,
                  },
                ]}>
                Business details
              </Text>
              { tick1 && <FastImage
                  resizeMode="contain"
                  style={{
                    width: 22,
                    height: 22,


                  }}
                  source={require('../assets/icons/greentick.png')}
                />}
              </View>
            </View>

        </View>

        {type == 'Business details' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animatable.View
              animation={
                type == 'Business details' ? 'slideInDown' : 'slideOutUp'
              }
              duration={1000}>
              <Inputcard
                name="Name of the shop"
                placeholdertext="Enter Here"
                maxLength={50}
               
                value={shopname}
                onChangeText={value => setShopname(value)}
              />
              <View style={{marginTop: 15,flex:1}}>
                <TouchableOpacity
                  onPress={() => {
                    imageSheet.current.open();
                    setCount(count + 1);
                  }}>
                  {console.log('slksllss', selectedProfileImage)}
                  {selectedProfileImage ? (
                    <FastImage
                      resizeMode='stretch'
                      source={{uri: selectedProfileImage?.assets[0]?.uri?.toString()}}
                      style={{
                        flex: 1,
                        height: 145,

                        marginHorizontal: responsiveHeight(3.5),
                      }}
                    />
                  ) : (
                    <FastImage
                      resizeMode="contain"
                      style={{
                        flex: 1,
                        height: 145,
                      }}
                      source={require('../assets/images/storefront.png')}
                    />
                  )}
                </TouchableOpacity>
                {selectedProfileImage ? (
                  <TouchableOpacity
                    onPress={() => setSelectedProfileImage(null)}
                    style={{position: 'absolute', right: -5, top: -10}}>
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
                ) : null}
              </View>

              <Dropdowncard
                name="Type of ownership"
                placeholder="--Select--"
                data={ownershiplist || []}
               
                value={owner}
                onChange={value => setOwner(value)}
              />

<Inputcard
                name="PAN details(optional)"
                placeholdertext="PAN business"
               maxLength={10}
                value={pannumber.toUpperCase()}
                onChangeText={value => setPannumber(value)}
              />
<View style={{marginTop:-20}}>
<Inputcard
               maxLength={25}
               
                placeholdertext="Name on PAN"
               
                value={panname}
                onChangeText={value => setPanname(value)}
              />
              </View>
              <View style={{marginTop: 15}}>
                <TouchableOpacity
                  onPress={() => {
                    imageSheet1.current.open();
                    setCount1(count1 + 1);
                  }}>
                  {console.log('slksllss', selectedProfileImage)}
                  {selectedProfileImage1 ? (
                    <FastImage
                      resizeMode='stretch'
                      source={{uri: selectedProfileImage1?.assets[0]?.uri?.toString()}}
                      style={{
                        flex: 1,
                        height: 145,
                        marginHorizontal: responsiveHeight(3.5),
                      }}
                    />
                  ) : (
                    <FastImage
                      resizeMode="contain"
                      style={{
                        flex: 1,
                        height: 145,
                      }}
                      source={require('../assets/images/pandetails.png')}
                    />
                  )}
                </TouchableOpacity>
                {selectedProfileImage1 ? (
                  <TouchableOpacity
                    onPress={() => setSelectedProfileImage1(null)}
                    style={{position: 'absolute', right: -5, top: -10}}>
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
                ) : null}
              </View>

              <Inputcard
                name="GST number(optional)"
                placeholdertext="Enter Here"
               maxLength={15}
                value={gst.toUpperCase()}
                onChangeText={value => setGst(value)}
              />
<View style={{marginBottom:Platform.OS=='android'?20: deviceModel === 'iPhone 6' || deviceModel === 'iPhone 6s' || deviceModel === 'iPhone 7' || deviceModel === 'iPhone 8' || deviceModel==='iPhone SE' ?  100:0}}>
<Inputcard
            name="Shop Address"
            placeholdertext="Enter Here"
            image={require('../assets/images/location.png')}
disabled={true}
            // onPress={mapscreen}
            // editable={false}
            //   maxLength={10}
            value={shop}
            onChangeText={value => setShop(value)}
          />
          </View>

            </Animatable.View>
          </ScrollView>
        ) : null}

        <View style={{paddingHorizontal: 20, marginTop: 20, marginBottom: 20}}>
      
            <View style={[Styles.contanier,{backgroundColor:step3?'rgba(71, 82, 245, 0.1)':'#FF8F2898'}]}>
            <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center",flex:1}}>
              <Text
                style={[
                  Styles.terms,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    fontSize: 17,
                    fontFamily: Fonts.FONT_BOLD,
                  },
                ]}>
                Licence details
              </Text>
              { tick2 && <FastImage
                  resizeMode="contain"
                  style={{
                    width: 22,
                    height: 22,


                  }}
                  source={require('../assets/icons/greentick.png')}
                />}
              </View>
            </View>

        </View>

       


        {type == 'Licence details'&& appliedLicenses ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animatable.View
              animation={
                type == 'Licence details' ? 'slideInDown' : 'slideOutUp'
              }
              duration={1000}>

           
             
<View style={{ flex: 1,}}>
{appliedLicenses?.map((license, index) =>  (
       <View key={license} >
       <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
        <Text style={{fontFamily:Fonts.FONT_MEDIUM,fontSize:13,color:'#03041A'}}>{license}</Text>
        <TouchableOpacity  onPress={() => handleRemoveLicense(license)} >
        <Text style={{fontFamily:Fonts.FONT_MEDIUM,fontSize:13,color:'#4855F0'}}>Remove</Text>
        </TouchableOpacity>
       </View>
<Inputcard

// viewstyle={{marginTop:-25}}
                placeholdertext="Enter licence number"
                value={licenseData[license]?.pan || ''}
            onChangeText={(text) => handleChange(license, 'pan', text)}
              />
              <Inputcard

image={require('../assets/icons/calender.png')}
editable={false}
maxLength={18}
placeholdertext="Expiry date of licence"
value={licenseData[license]?.pan1?formatDate(licenseData[license]?.pan1,"fulldate"): ''}
            onChangeText={(text) => handleChange(license, 'pan1', text)}
            viewstyle={{marginBottom:15,marginTop:-25}}
            onPress={() => openDatePicker(license)}
/>
{console.log('datetetete',(licenseData[license]),)}
{openDatePickerr[license] && (
            <DatePicker
            modal
            open={openDatePickerr[license]}

              date={selectedDate[license]|| chosenDate}
              mode="date"
              // onDateChange={handleDateChange}
              // isVisible={chosenDate !== null}
              onConfirm={(date) => {
                const selectedDate = new Date(date);
  selectedDate.setHours(7, 16, 0, 0);
  console.log('jsjsjjssj',selectedDate)
    
    
    handleChange(license, 'pan1', selectedDate);


    setSelectedDate((prevSelectedDates) => ({ ...prevSelectedDates, [license]: selectedDate }));
              setOpenDatePickerr((prevOpenDatePickers) => ({ ...prevOpenDatePickers, [license]: false }))}
              }
              onCancel={() => {
              setOpenDatePickerr((prevOpenDatePickers) => ({ ...prevOpenDatePickers, [license]: false }))}}
              minimumDate={new Date()}
              initialDate={selectedDate[license] || new Date()}
            />
          )}
          
<View style={{marginBottom: 15}}>
<TouchableOpacity onPress={() => openImageSheet2(license)}>
                  {console.log('slksllss', imageState[license] && imageState[license]?.imageUri)}
                  {licenseData[license] &&  licenseData[license]?.imageUri?.assets[0]?.uri  ? (
                    <FastImage
                      resizeMode='stretch'
                      source={{ uri: licenseData[license]?.imageUri?.assets[0]?.uri?.toString() }}
                      style={{
                        flex: 1,
                        height: 145,
                        marginHorizontal: responsiveHeight(3.5),
                      }}
                    />
                  ) : (
                    <FastImage
                      resizeMode="contain"
                      style={{
                        flex: 1,
                        height: 145,
                      }}
                      source={require('../assets/images/licence.png')}
                    />
                  )}
                </TouchableOpacity>
                {licenseData[license] && licenseData[license]?.imageUri ? (
                  <TouchableOpacity
                onPress={() => handleChange(license, 'imageUri', null)}
                    style={{position: 'absolute', right: -5, top: -10}}>
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
                ) : null}
              </View>

</View>
      ))}
           
      {type == 'Licence details'&& !(licenselist?.length==appliedLicenses?.length) ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animatable.View
              animation={
                type == 'Licence details' ? 'slideInDown' : 'slideOutUp'
              }
              duration={1000}>

           
             
<View style={{ flex: 1,}}>

<Button
 onPress={handlelicense}
              text=" + Add drug licence"
              view={{
                backgroundColor: '#4855F0',
                marginHorizontal: responsiveHeight(2.5),
                borderColor:"#4855F0"
              }}
              textstyle={{color: '#FFFFFF'}}
            />
          </View>
            </Animatable.View>
          </ScrollView>
        ) : null}


 
      {console.log("mssksksks",appliedLicenses)}
          </View>
            </Animatable.View>
          </ScrollView>
        ) : null}
      </ScrollView>
      <View>
        <View style={{borderWidth: 1, borderColor: '#ffffff'}}></View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 15, flex: 1}}>
            <Button
            onPress={handleFillLater}
            disabled={filllater?false:true}
              text="Fill later"
              view={{
                backgroundColor: '#FFFFFF',
                marginHorizontal: responsiveHeight(1.5),
                borderColor:fill?"#FF8F28":"grey"
              }}
              textstyle={{color: fill?"#FF8F28":"grey"}}
            />
          </View>
          <View style={{marginTop: 15, flex: 1}}>
            <Button

             disabled={fill?false:true}
             onPress={handlecontinue}
              text="Continue"
              view={{marginHorizontal: responsiveHeight(1.5),backgroundColor:fill?"#FF8F28":"grey",borderColor:fill?"#FF8F28":"grey"}}
            />
          </View>
        </View>
      </View>
{/*upload front image*/}
      <SelectImageSheet
        ref={imageSheet}
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
        <View style={{paddingHorizontal: 15, paddingBottom: 20}}>
          <Text style={[styles.fieldHeading, {fontSize: 16}]}>
            Select Image
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCamera(true);
              if (
                permissionStatus === RESULTS.DENIED ||
                permissionStatus === RESULTS.UNAVAILABLE ||
                permissionStatus === RESULTS.BLOCKED
              ) {
                imageSheet.current.close();
                setTimeout(() => {
                  console.log('sdfcgcgcfgg');
                  setShowModal(true);
                }, 500);
              } else chooseImageUploader('camera');
            }}>
            <Text style={Styles.option}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCamera(false);
              if (
                permissionStatus2 === RESULTS.DENIED ||
                permissionStatus2 === RESULTS.UNAVAILABLE ||
                permissionStatus2 === RESULTS.BLOCKED
              ) {
                imageSheet.current.close();
                setTimeout(() => {
                  console.log('sdfcgcgcfgg');
                  setShowModal(true);
                }, 500);
              } else chooseImageUploader('library');
            }}>
            <Text style={Styles.option}>Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => imageSheet.current.close()}>
            <Text style={Styles.option}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SelectImageSheet>




      <PermissionModal
        isVisible={showModal}
        setShowModal={setShowModal}
        firstTime={!firstTime}
        firstTime2={!firstTime2}
        rbsheet={imageSheet}
        Camera={camera}
        onSuccessCamera={() => chooseImageUploader('camera')}
        onSuccessImage={() => chooseImageUploader('library')}
      />



{/*upload pan image*/}


<SelectImageSheet
        ref={imageSheet1}
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
        <View style={{paddingHorizontal: 15, paddingBottom: 20}}>
          <Text style={[styles.fieldHeading, {fontSize: 16}]}>
            Select Image
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCamera(true);
              if (
                permissionStatus === RESULTS.DENIED ||
                permissionStatus === RESULTS.UNAVAILABLE ||
                permissionStatus === RESULTS.BLOCKED
              ) {
                imageSheet1.current.close();
                setTimeout(() => {
                  console.log('sdfcgcgcfgg');
                  setShowModal1(true);
                }, 500);
              } else chooseImageUploader1('camera');
            }}>
            <Text style={Styles.option}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCamera(false);
              if (
                permissionStatus2 === RESULTS.DENIED ||
                permissionStatus2 === RESULTS.UNAVAILABLE ||
                permissionStatus2 === RESULTS.BLOCKED
              ) {
                imageSheet1.current.close();
                setTimeout(() => {
                  console.log('sdfcgcgcfgg');
                  setShowModal1(true);
                }, 500);
              } else chooseImageUploader1('library');
            }}>
            <Text style={Styles.option}>Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => imageSheet1.current.close()}>
            <Text style={Styles.option}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SelectImageSheet>
      <PermissionModal
        isVisible={showModal1}
        setShowModal={setShowModal1}
        firstTime={!firstTime}
        firstTime2={!firstTime2}
        rbsheet={imageSheet1}
        Camera={camera}
        onSuccessCamera={() => chooseImageUploader1('camera')}
        onSuccessImage={() => chooseImageUploader1('library')}
      />


<SelectImageSheet
        ref={imageSheet2}
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
        <View style={{paddingHorizontal: 15, paddingBottom: 20}}>
          <Text style={[styles.fieldHeading, {fontSize: 16}]}>
            Select Image
          </Text>
          <TouchableOpacity
             onPress={() => {
              setCamera(true);
              if (
                permissionStatus === RESULTS.DENIED ||
                permissionStatus === RESULTS.UNAVAILABLE ||
                permissionStatus === RESULTS.BLOCKED
              ) {
                imageSheet2.current.close();
                setTimeout(() => {
                  console.log('sdfcgcgcfgg');
                  setShowModal2(true);
                }, 500);
              } else chooseImageUploader2('camera',selectedLicenses);
            }}>
            <Text style={Styles.option}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
             onPress={() => {
              setCamera(false);
              if (
                permissionStatus2 === RESULTS.DENIED ||
                permissionStatus2 === RESULTS.UNAVAILABLE ||
                permissionStatus2 === RESULTS.BLOCKED
              ) {
                imageSheet2.current.close();
                setTimeout(() => {
                  console.log('sdfcgcgcfgg');
                  setShowModal2(true);
                }, 500);
              } else {chooseImageUploader2('library',selectedLicenses);}
            }}>
            <Text style={Styles.option}>Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => imageSheet2.current.close()}>
            <Text style={Styles.option}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SelectImageSheet>
      <PermissionModal
        isVisible={showModal2}
        setShowModal={setShowModal2}
        firstTime={!firstTime}
        firstTime2={!firstTime2}
        rbsheet={imageSheet2}
        Camera={camera}
        onSuccessCamera={() => chooseImageUploader2('camera',selectedLicenses)}
        onSuccessImage={() => chooseImageUploader2('library',selectedLicenses)}
      />





 <RBSheet
        ref={licensesheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          container: {
            height: rbsheetheight,
            borderColor: 'grey',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,

            backgroundColor: 'transparent',
          },
          wrapper: {
            backgroundColor: '#00000099',
          },
        }}>
        <View style={{flex: 1}}>



          <View
            style={{
              flex: 1,
              backgroundColor: '#F2F2F2',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            
                <View style={{marginTop:20,flexDirection:"row",justifyContent:'space-between',paddingHorizontal:25}}>
                  <Text
                    style={[
                      Styles.title,
                      {fontFamily: Fonts.FONT_SEMIBOLD, fontSize: 17,color:'#000000'},
                    ]}>
                   Add licence
                  </Text>
                  <TouchableOpacity  onPress={()=>{licensesheet.current.close()

                setSelectedLicense([])}} >
                  <FastImage
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,

                  }}
                  source={require('../assets/icons/cut.png')}
                />
                </TouchableOpacity>
                </View>
            

            <View style={{flex: 1,marginTop:10}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={licenselist}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                  onPress={() => handleLicense(item.licence)}
                  >
                  <Drivinglicense
                    language={item.licence}
                    isSelected={selectedLicense.includes(item.licence)} 
          onSelect={() => handleLicense(item.licence)} 
                  />
                  </TouchableOpacity>
                )}
              />
            </View>
            {console.log('jsjskskxsxsx',selectedLicense)}
            <View style={{marginTop: 10}}>
              <Button
              onPress={addlicense}
               text="Add"  />
            </View>
          </View>
        </View>
      </RBSheet>
      {
                isLoading && <Loader />
            }
    </PlatformSpecificWrapper>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    marginTop: 15,
    marginLeft: 20,

    color: '#03041A',
  },
  text1: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 13,
    // marginTop: 15,
    marginLeft: 25,

    color: '#03041A',
  },
  contanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(71, 82, 245, 0.1)',
    borderColor: 'rgba(71, 82, 245, 0.1)',
    borderRadius: 10,
  },
  title: {
    fontFamily: Fonts.FONT_SEMIBOLD,
    fontSize: 13,
    lineHeight: 22,
    color: '#4855F0',
    marginBottom: 10,
  },
  terms: {
    fontFamily: Fonts.FONT_SEMIBOLD,
    fontSize: 13,
    // marginTop: 15,
lineHeight:20,

    color: '#03041A',
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  option: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 15,
    lineHeight: 24,
    color: "#000000",
    marginTop: 15,
  },
  selectImageView: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -11,
    bottom: -11,
    // borderColor: Colors.PRIMARY,
    borderWidth: 0.5,
  },
  selectImage: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    // backgroundColor: Colors.PRIMARY
  },
});
