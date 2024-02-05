// productSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UploadService } from '../../api/UploadService';
import { Utility } from '../../util';
import { CommonService } from '../../api/CommonService';
import { CommonActions,useNavigation } from '@react-navigation/native';

const initialState = {
  isError: false,
};
// Async thunk for adding to cart
export const addToCartAsync = createAsyncThunk('product/addToCart', async ({ id, quantity ,navigation,getcartlist}, { getState,dispatch }) => {
  const url = `add-to-cart`;
  const data = { product_id: id, quantity };

  try {

    const response = await UploadService.fetchPostFormData(url,data);

    if (response.code === 200) {
      // Utility.showToast(response?.message)
      getcartlist('from addToCartAsync');
      dispatch(productSlice.actions.setIsError({ id, isError: false }));
      return { id, quantity };

    } else if (response.code === 400) {
      // Product is out of stock
      dispatch(productSlice.actions.setIsError({ id, isError: true }));
      Utility.showToast("Product is out of stock");


      
    } else {
    
        // Utility.showToast(error?.message);
        // Utility.log("ye hai error", response?.message);

    
      // Handle other response codes or errors
      throw new Error('Failed to add to cart');
      
    }
  }catch (error) {
    // Handle promise rejection here
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

    // Re-throw the error to propagate it further
    throw error;
  }
});




const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      // Update state based on the successful addToCartAsync response
      // This assumes addToCartAsync returns the updated state, modify as needed
      return action.payload;
    });
  },
});

export const productActions = { ...productSlice.actions, addToCartAsync };
export default productSlice.reducer;
