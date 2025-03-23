import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const fetchCities = createAsyncThunk("cdq/fetchCities", async () => {
  //if (state.cities.length === 0) {
  const response = await axiosInstance.get("cdq/getcities");
  //console.log("getcities run!!!");
  return response.data;
  //}
  //console.log("getcities NO RUNNNN")
  //return null;
});

export const fetchDistricts = createAsyncThunk(
  "cdq/fetchDistricts",
  async (id) => {
    const response = await axiosInstance.get(
      "cdq/getdistricts?cityid=" + id
    );
    return response.data;
  }
);

export const fetchQuarters = createAsyncThunk(
  "cdq/fetchQuarters",
  async (id) => {
    const response = await axiosInstance.get("cdq/getquarters?districtId=" + id);
    return response.data;
  }
);

export const cdqSlice = createSlice({
  name: "cdq",
  initialState: {
    cities: [],
    districts: [],
    quarters: [],
    inputCity: 0,
    inputDistrict: 0,
    inputQuarter: 0,
    inputAddress: "",
  },
  reducers: {
    setInputCity: (state, action) => {
      state.inputCity = action.payload;
    },
    setInputDistrict: (state, action) => {
      state.inputDistrict = action.payload;
    },
    setInputQuarter: (state, action) => {
      state.inputQuarter = action.payload;
    },
    setInputAddress: (state, action) => {
      state.inputAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload !== null) {
          state.cities = action.payload;
        }
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchDistricts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.districts = action.payload;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchQuarters.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchQuarters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quarters = action.payload;
      })
      .addCase(fetchQuarters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {setInputCity,setInputDistrict,setInputQuarter,setInputAddress}=cdqSlice.actions;
export default cdqSlice.reducer;
