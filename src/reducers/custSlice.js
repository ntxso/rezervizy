// actions.js veya başka bir yer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

// export const fetchData = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axiosInstance.get('/data');
//       dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
//     } catch (error) {
//       dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
//     }
//   };
// };

export const fetchCustomerById = createAsyncThunk(
  "customer/fetchCustomerById",
  async (id) => {
    const response = await axiosInstance.get("customer/getbyid?id=" + id);
    console.log("tttt:" + JSON.stringify(response.data));
    return response.data;
  }
);

export const customerByIdSlice = createSlice({
  name: "customerbyid",
  initialState: {
    customer: {}, // verilerin depolanacağı dizi
    status: "idle", // veri çekme durumunu belirten değer
    error: null, // veri çekme sırasında oluşan hata
  },
  reducers: {
    // burada normal reducer fonksiyonları tanımlanabilir
    getCustomerById: (state, action) => {
      //state.activeDay =action.payload;
      return fetchCustomerById(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// slice'ın reducer fonksiyonunu dışarıya aktar
export default customerByIdSlice.reducer;

// orders dizisini seçen bir selector fonksiyonu tanımla
export const selectCustomerById = (state) => state.customerById.customer;
