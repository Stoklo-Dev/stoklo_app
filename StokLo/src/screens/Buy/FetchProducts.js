// productSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UploadService } from '../../api/UploadService';
import { Utility } from '../../util';
// import { addToCart,removeFromCart } from './cartSlice';

export const fetchProducts = createAsyncThunk('fetchProducts', async ({ id = '', quantity = '' } = {}) => {
  let url = `add-to-cart&product_id=${id}&quantity=${quantity}`;
  console.log('hshshsh', url);


    const response = await UploadService.fetchPostFormData(url);

    if (response.code === 200) {
      console.log('hellojiki', response);

      // Dispatch addToCart action with the parameters
      // This will add the item to the cart in the Redux store
      // dispatch(addToCart({ id, quantity }));

      return response;
    } else {
      Utility.log('else', response);
      if (response.code === 401) {
        // Handle 401 error
      }
    }
  } 
);

// You can also create another async thunk for removing from cart if needed
// export const removeFromCartAsync = createAsyncThunk('removeFromCartAsync', async ({ id = '', quantity = '' } = {}) => {
//   // Your logic to remove item from the cart
//   dispatch(removeFromCart({ id,quantity }));
// });

// rest of your productSlice code...
