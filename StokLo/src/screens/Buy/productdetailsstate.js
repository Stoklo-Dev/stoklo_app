import { createSlice }  from "@reduxjs/toolkit";
import { CommonService } from "../../api/CommonService";
import { Utility } from "../../util";
import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';


const productdetailsstate =createSlice({
name:"productdetailsstate",
initialState:null,
reducers:{
    productdetails(state,action){

        return action.payload;
    },
   
   
}



})


const ProductDetailsComponent = () => {
const [productdetailss, setProductdetailss] = useState(null)
const dispatch = useDispatch();

useEffect(() => {
  getorderdetails()
  }, [ ])
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
        // Handle the promise rejection here
        //   if (error.code == 402) {
        //       Utility.showToast(error?.message);
        //       navigation.dispatch(
        //         CommonActions.reset({
        //             index: 0,
        //             routes: [
        //                 { name: 'Login' }
        //             ]
        //         })
        //     )
        //     }
      
        // Handle other error cases if needed
      });
    } catch (error) {
      Utility.log("Catch error:", error)
    
      // Utility.showToast(error)
    }
  }
};

export default ProductDetailsComponent;