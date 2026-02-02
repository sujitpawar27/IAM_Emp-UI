import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEmployeesApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from "../../services/apis";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getEmployeesApi();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch employees");
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (data, { rejectWithValue }) => {
    try {
      const employee = await createEmployeeApi(data);
      return employee;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create employee");
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const employee = await updateEmployeeApi(id, data);
      return employee;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update employee");
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteEmployeeApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete employee");
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
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
      // Fetch
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload ?? [];
        state.error = null;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createEmployee.pending, (state) => {
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.push(action.payload);
        }
        state.error = null;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update
      .addCase(updateEmployee.pending, (state) => {
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        if (action.payload) {
          const idx = state.list.findIndex((e) => e.id === action.payload.id);
          if (idx >= 0) state.list[idx] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = employeesSlice.actions;
export default employeesSlice.reducer;
