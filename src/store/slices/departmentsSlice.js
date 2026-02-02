import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDepartmentsApi } from "../../services/apis";

export const fetchDepartments = createAsyncThunk(
  "departments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDepartmentsApi();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch departments");
    }
  }
);

const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload ?? [];
        state.error = null;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = departmentsSlice.actions;
export default departmentsSlice.reducer;
