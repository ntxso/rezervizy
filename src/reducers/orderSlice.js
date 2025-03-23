import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { act } from "react-dom/test-utils";

// http://localhost:3000/orders adresinden verileri getiren asenkron bir fonksiyon
// export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   };
//   const url =
//     "https://api.tekrem.com/api/order/getbydate2?supplierId=1&dateFirst=2024-1-1&dateLast=2024-2-29";
//   const response = await axios.get(url, config);
//   //const response = await axios.get("http://localhost:3000/orders");
//   return response.data;
// });

export const fetchOrdersTwoDate = createAsyncThunk(
  "order/fetchOrdersTwoDate",
  async (dateOneTwo) => {
    const supplierId = localStorage.getItem("supplierid");
    if (supplierId) {
      const url = `order/getbydate2?supplierId=${supplierId}&datefirst=${dateOneTwo.one}&datelast=${dateOneTwo.two}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } else {
      return [];
    }
  }
);

export const fetchOrdersByCustomerId = createAsyncThunk(
  "order/fetchOrdersByCustomerId",
  async (id) => {
    const response = await axiosInstance.get(
      "order/getbycustomerid?customerid=" + id
    );
    return response.data;
  }
);

export const fetchAddOrder = createAsyncThunk(
  "order/fetchAddOrder",
  async (order) => {
    const response = await axiosInstance.post("order/add", order);
    return response.data;
  }
);

export const fetchUpdateOrder = createAsyncThunk(
  "order/fetchUpdateOrder",
  async (order) => {
    const response = await axiosInstance.post("order/update", order);
    return response.data;
  }
);

// order durumunu yöneten bir slice
export const orderSlice = createSlice({
  name: "orderx",
  initialState: {
    orders: [], // verilerin depolanacağı dizi
    ordersCustomer: [],
    status: "idle", // veri çekme durumunu belirten değer
    error: null, // veri çekme sırasında oluşan hata
  },
  reducers: {
    // burada normal reducer fonksiyonları tanımlanabilir
    updateOrder: (state, action) => {
      const newOrder = action.payload;
      const index = state.orders.findIndex(
        (order) => order.orderId === newOrder.orderId
      );
      if (index !== -1) {
        Object.assign(state.orders[index], newOrder);
      }
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchOrders.pending, (state, action) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchOrders.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.orders = action.payload;
      // })
      // .addCase(fetchOrders.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      .addCase(fetchOrdersByCustomerId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersByCustomerId.fulfilled, (state, action) => {
        state.status = "succeded";
        state.ordersCustomer = action.payload;
      })
      .addCase(fetchOrdersByCustomerId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOrdersTwoDate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchAddOrder.fulfilled, (state, action) => {
        state.status = "sipariş oluştur:" + action.payload;
      });
  },
});

export const { updateOrder, addOrder, clearOrders } = orderSlice.actions;
// slice'ın reducer fonksiyonunu dışarıya aktar
export default orderSlice.reducer;

// orders dizisini seçen bir selector fonksiyonu tanımla
export const selectOrders = (state) => state.orderx.orders; //orderx index.js de tanımlı
