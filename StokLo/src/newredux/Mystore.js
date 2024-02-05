import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./Myproducts";

import Userdata from "./Userdata";
import ProductReducer from '../screens/Buy/productSlice';
import userReducer from "../screens/UserRedux/userReducer.js";


export const Mystore=configureStore({
reducer:{
    addlanguage:languageReducer,
    Userdata:Userdata,
    product: ProductReducer,
    user: userReducer,

}

})