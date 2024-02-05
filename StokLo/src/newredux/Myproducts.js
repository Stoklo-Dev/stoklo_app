import { createSlice }  from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LANG_STORAGE_KEY = "selectedLanguage";
const Myproducts =createSlice({
name:"language",
initialState:"en",
reducers:{
    addlanguage(state,action){
        AsyncStorage.setItem(LANG_STORAGE_KEY, action.payload);
        return action.payload;
    },
    loadLanguage: (state) => {
       
        return state;
      },
}



})
export const{addlanguage,loadLanguage}=Myproducts.actions
export default Myproducts.reducer