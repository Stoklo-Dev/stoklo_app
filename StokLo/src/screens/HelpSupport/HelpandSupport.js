import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Button from '../../Components/Button';
import PlatformSpecificWrapper from '../../PlatformSpecificWrapper';
import { Utility } from '../../util';

import { CommonActions, useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Inputcard from '../../Components/Inputcard';
import Fonts from '../../constants/Fonts';

import Loader from '../../Components/Loader';
import { CommonService } from '../../api/CommonService';
import { UploadService } from '../../api/UploadService';
export default function HelpandSupport({navigation, props}) {
    const [name, setName] = useState('');
    const [businessname, setbusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
const isFocused = useIsFocused();

    const [description, setDescription] = useState('');
    const [fill, setFill] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const maxCharacters = 500;
const [userData, setUserData] = useState(null);
const [productdetailss, setProductdetailss] = useState(null)


useEffect(() => {
  getUserData()
  

}, [isFocused])
useEffect(() => {

  getorderdetails()


}, [])
useEffect(() => {

if(productdetailss)
{  setName(productdetailss?.retailerName)
  setEmail(productdetailss?.email?productdetailss?.email:'')
  setMobile(productdetailss?.mobileNumber)
  setbusinessName(productdetailss?.BussinessDetail?.shopName)}


}, [productdetailss])

const getUserData = async () => {
  let user = await Utility.getValueFromAsyncStorage("UserData");
  setUserData(JSON.parse(user));
};
const getorderdetails = () => {

  
  let url = `user-detail`;;
  try {

    CommonService.fetchGetApi(url).then((response) => {
      console.log("JHGFDGH",response)
    
      if (response.code == 200) {
        setProductdetailss(response?.data)


      } else {
        Utility.log("else", response);
      
      }
    }).catch((error) => {
      Utility.log("Promise rejection:", error);
      
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
    
      
    });
  } catch (error) {
    Utility.log("Catch error:", error)
  
    
  }
}


 




    const handleInputChange = (inputNumber, text) => {
        switch (inputNumber) {
          case 1:
            setName(text);
            break;
          case 2:
            setMobile(text);
            break;
          case 3:
            setbusinessName(text);
            break;
          case 4:
            if (text.length <= maxCharacters) {
              setDescription(text);

            }
            break;
        }
      };
    
      React.useEffect(() => {
     
          if (name && mobile && businessname && description) {
            setFill(true);
          } else {
            setFill(false);
          }
        
      }, [name, mobile, businessname, description,]);


      

      const handlehelp = () => {
        
        if (!name) {
          Utility.showToast("Please enter name full name");
          return;
        } else if (Utility.validateName(name) == false) {
          Utility.showToast("Please enter valid  name");
          return;
        }
        
        if (email) {
            if (!Utility.validateEmail(email)) {
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
     
      if (!businessname) {
        Utility.showToast("Please enter Business name");
        return;
      } else if (Utility.validateName(businessname) == false) {
        Utility.showToast("Please enter valid Business name");
        return;
      }
   
      if (!description) {
        Utility.showToast("Please enter Description");
        return;
      }
    handlehelpsupport()
      };
    
    
      const handlehelpsupport = () => {
    
    
        let data = {
            name: name,


            phone: mobile,
          bussinessName: businessname,
          description: description,

           
        }
      
          if (email) {
            data['email'] = email
        }
      
        
    
        setIsLoading(true);
        let url = 'help-support';
        UploadService.fetchPostFormData(url, data).then((response) => {
          console.log("hello",response,data)
            setIsLoading(false);
            if (response.code == 200) {
                Utility.showToast(response?.message);
       
                navigation.goBack()
    
    
            } else {
                Utility.showToast(response?.message);
                
                
                
            }
        })
        .catch((error) => {
          
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
          
        });
    }



  return (
    <PlatformSpecificWrapper  style={{flex: 1}}>
    
    <View>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:"center"}}>
          <TouchableOpacity   
          onPress={()=>{navigation.goBack()
          }}
          >
          <FastImage
                  resizeMode="contain"
                  style={{
                    width: 42,
                    height: 42,


                  }}
                  source={require('../../assets/icons/arrowback.png')}
                />
                </TouchableOpacity>
        <Text style={Styles.header}>Help & support</Text>
                </View>
                
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
     contentContainerStyle={{ flex: 1}}>
     <View style={{marginBottom:Platform.OS=='ios'?200:200}}>
    <Inputcard
            name="Name"
            placeholdertext="Enter Here"
              maxLength={20}
              editable={false}
            value={name}
            onChangeText={(text) => handleInputChange(1, text)}
          />

<Inputcard
            name="Email ID(optional)"
            placeholdertext="Enter Here"
              maxLength={25}
            value={email}
            editable={productdetailss?.email?false:true}

            onChangeText={value => setEmail(value)}
          />

<Inputcard
            name="Phone number"
            placeholdertext="Enter Here"
            keyboardType="numeric"
            maxLength={10}
            value={mobile}
            editable={false}

            onChangeText={(text) => handleInputChange(2, text)}
          />
            <Inputcard
            name="Business name"
            placeholdertext="Enter Here"
              maxLength={20}
              editable={productdetailss?.BussinessDetail?.shopName?false:true}

            value={businessname}

              onChangeText={(text) => handleInputChange(3, text)}
          />
           <Inputcard
            name="Description"
            placeholdertext="Write Here"
              maxLength={500}
              multi
              multiline={true}
            
              
            
            
            
            value={description}
            onChangeText={(text) => handleInputChange(4, text)}
            less={description?.length}
            max={maxCharacters}
          />
          </View>
          </ScrollView>
          
          <View>
          <View style={{borderWidth: 1, borderColor: '#ffffff'}}></View>
          <View style={{marginTop: 15}}>
            <Button

             disabled={fill?false:true}
             onPress={handlehelp}
              text="Submit"
              view={{backgroundColor:fill?"#FF8F28":"grey",borderColor:fill?"#FF8F28":"grey"}}
            />
          </View>
        </View>
        {
                isLoading && <Loader />
            }
    </PlatformSpecificWrapper>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.FONT_MEDIUM,
    fontSize: 15,
    color: '#03041A',
  },
  header: {
    fontFamily: Fonts.FONT_BOLD,
    fontSize: 17,
    color: '#03041A',
    marginLeft:10, 
  },
});
