import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    filter: {
      value: '',
      method: '',
    },
    filtredList: [],
    isLoading: false,
    total: 200,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter.value = action.payload.filterValue.trim().toLowerCase();
      state.filter.method = action.payload.filterMethod;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setProducts: (state, action) => {
      state.filtredList = action.payload;
    },
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { setProducts, setLoading, setTotal, setFilter } =
  productSlice.actions;

export default productSlice.reducer;
