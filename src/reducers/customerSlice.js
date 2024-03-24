import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

// http://localhost:3000/orders adresinden verileri getiren asenkron bir fonksiyon
export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async () => {
    //const { customers } = getState().customers; 
    console.log("custs adet:");
    const loginControl=localStorage.getItem("supplierid");
    if(loginControl){
      const response = await axiosInstance.get(
        "customer/getlistdto?supplierid="+loginControl
      );
      return response.data;
    }
    
  }
);

export const fetchCustomerById = createAsyncThunk(
  "customer/fetchCustomerById",
  async (id) => {
    const response = await axiosInstance.get("customer/getbyiddto?id=" + id);
    return response.data;
  }
);

export const fetchGetCustomerById = createAsyncThunk(
  "customer/fetchGetCustomerById",
  async (id) => {
    const response = await axiosInstance.get("customer/getbyid?id=" + id);
    return response.data;
  }
);

export const fetchGetAddress = createAsyncThunk(
  "customer/fetchGetAddress",
  async (id) => {
    //const cust=await axiosInstance.get("customer/getbyid?id="+id);
    const addr = await axiosInstance.get("address/getbycustomerid?id=" + id);
    return addr.data;
  }
);

export const fetchFullAddress = createAsyncThunk(
  "customer/fetchFullAddress",
  async (custDto) => {
    const response = await axiosInstance.post(
      "address/getfulladdressdto",
      custDto
    );
    return response.data;
  }
);

export const fetchFullAddressByAddress = createAsyncThunk(
  "customer/fetchFullAddressByAddress",
  async (address) => {
    const response = await axiosInstance.post(
      "address/getfulladdress",
      address
    );
    return response.data;
  }
);

export const fetchCustomerUpdate = createAsyncThunk(
  "customer/fetchCustomerUpdate",
  async (customer) => {
    await axiosInstance.post("customer/update", customer, {
      responseType: "text",
    });
    // const updatedData = await axiosInstance.get(
    //   "customer/getbyid?id=" + customer.id
    // );
    //console.log("APİİİ:"+JSON.stringify(updatedData));
    if (customer.name) {
      customer.name = customer.name.toUpperCase();
    }
    return customer;
  }
);

export const fetchAddressUpdate = createAsyncThunk(
  "address/fetchAddressUpdate",
  async (address) => {
    const response = await axiosInstance.post("address/update", address);
    //const addr = await axiosInstance.get("address/getbycustomerid?id=" + id);
    return address;
  }
);

export const fetchGetCustomerNote = createAsyncThunk(
  "customernote/fetchGetCustomerNote",
  async (id) => {
    const response = await axiosInstance.get(
      "customernote/getbycustid?custid=" + id
    );
    return response.data;
  }
);

export const fetchAddOrUpdateCustomerNote = createAsyncThunk(
  "customernote/fetchAddOrUpdateCustomerNote",
  async (custNote) => {
    if (custNote.noteId !== 0) {
      await axiosInstance.post("customernote/update", custNote);
    } else {
      await axiosInstance.post("customernote/add", custNote);
    }
    console.log(JSON.stringify(custNote));
  }
);

export const fetchCustomerAdd = createAsyncThunk(
  "customer/fetchCustomerAdd",
  async (customer) => {
    const resp = await axiosInstance.post("customer/add", customer, {
      responseType: "text",
    });
    return resp.data;
  }
);

export const fetchAddressAdd = createAsyncThunk(
  "address/fetchAddressAdd",
  async (address) => {
    const response = await axiosInstance.post("address/add", address);
    //const addr = await axiosInstance.get("address/getbycustomerid?id=" + id);
    return response.data;
  }
);

// order durumunu yöneten bir slice
export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [], // verilerin depolanacağı dizi
    activeCustomer: {},
    activeCustomerDto: {},
    activeAddress: {},
    activeFullAddress: "",
    activeCustomerNote: {},
    status: "idle", // veri çekme durumunu belirten değer
    error: null, // veri çekme sırasında oluşan hata
  },
  reducers: {
    // burada normal reducer fonksiyonları tanımlanabilir
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    clearCustomers:(state)=>{
      state.customers=[];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
        // if (action.payload.length!==0) {
        //   state.activeCustomerDto = action.payload[-1];
        // }
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.status = "Başarılı";
        state.activeCustomerDto = action.payload;
      })
      .addCase(fetchFullAddress.fulfilled, (state, action) => {
        state.status = "Başarılı";
        state.activeFullAddress = action.payload;
      })
      .addCase(fetchGetCustomerById.fulfilled, (state, action) => {
        state.status = "Başarılı";
        state.activeCustomer = action.payload;
      })
      .addCase(fetchGetAddress.fulfilled, (state, action) => {
        state.status = "Başarılı";
        state.activeAddress = action.payload;
      })
      .addCase(fetchFullAddressByAddress.fulfilled, (state, action) => {
        state.status = "Başarılı";
        state.activeFullAddress = action.payload;
      })
      .addCase(fetchCustomerUpdate.fulfilled, (state, action) => {
        state.status = "Başarılı";
        state.activeCustomer = action.payload;
      })
      .addCase(fetchAddressUpdate.fulfilled, (state, action) => {
        state.status = "Başarılı";
        state.activeAddress = action.payload;
      })
      .addCase(fetchGetCustomerNote.fulfilled, (state, action) => {
        state.status = "Başarılı";
        state.activeCustomerNote = action.payload;
      });
  },
});

export const { addCustomer,clearCustomers } = customerSlice.actions;
// slice'ın reducer fonksiyonunu dışarıya aktar
export default customerSlice.reducer;

// orders dizisini seçen bir selector fonksiyonu tanımla
//export const selectCustomers = (state) => state.customer.customers;
