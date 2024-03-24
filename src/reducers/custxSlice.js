import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const fetchCustx = createAsyncThunk("custx/fetchCustx", async () => {

  const custIds = [13815, 13814, 12845];
  const response = await axiosInstance.post(
    "customer/getbyidlistsdto?supplierId=1",
    custIds
  );
  return response.data;
});

// custx durumunu yöneten bir slice
export const custxSlice = createSlice({
  name: "custx",
  initialState: {
    custx: [], // verilerin depolanacağı dizi
    status: "idle", // veri çekme durumunu belirten değer
    error: null, // veri çekme sırasında oluşan hata
  },
  reducers: {
    // burada normal reducer fonksiyonları tanımlanabilir
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustx.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCustx.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.custx = action.payload;
      })
      .addCase(fetchCustx.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// slice'ın reducer fonksiyonunu dışarıya aktar
export default custxSlice.reducer;

// custx nesnesini seçen bir selector fonksiyonu tanımla
export const selectCustx = (state) => state.custx.custx;
