import { createSlice }  from "@reduxjs/toolkit";

const Userdata =createSlice({
name:"Userdata",
initialState:null,
reducers:{
    adduser(state,action){

        return action.payload;
    },
    logoutUser(state) {
      return null; // Reset the user state to null on logout
    },
   
}



})
export const{adduser,logoutUser}=Userdata.actions
export default Userdata.reducer