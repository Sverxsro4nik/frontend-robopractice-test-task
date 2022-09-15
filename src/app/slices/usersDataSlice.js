import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    const { data } = await axios.get('/api/users');
    return data;
  }
)

const usersDataAdapter = createEntityAdapter();
const initialState = usersDataAdapter.getInitialState({
  isLoading: false,
  loadingErrors: null,
})

const usersData = createSlice({
  name: usersDataAdapter,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
      state.loadingErrors = null;
    }).addCase(fetchData.fulfilled, (state, { payload }) => {
      usersDataAdapter.setAll(state, payload);
      state.isLoading = false;
      state.loadingErrors = null;
    }).addCase(fetchData.rejected, (state, { error }) => {
      state.isLoading = false;
      state.loadingErrors = error;
    });
  }
});

export const selectors = usersDataAdapter.getSelectors((state) => state.usersData);

export const getAllData = (state) => selectors.selectAll(state);

export default usersData.reducer;