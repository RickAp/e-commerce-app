import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const productSlice = createSlice({
    name: 'product',
    initialState: {
      products: [],
      isFormOpen: false,
    },
    reducers: {
      setProducts: (state, action) => {
        state.products = action.payload;
      },
      addProduct: (state, action) => {
        if (!state.products.find(product => product.id === action.payload.id)) {
          state.products.push(action.payload);
        }
      },
      toggleForm: (state) => {
        state.isFormOpen = !state.isFormOpen;
      },
      setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
      },
      sortProductsAsc: (state) => {
        state.products = [...state.products].sort((a, b) => a.price - b.price);
      },
      sortProductsDesc: (state) => {
        state.products = [...state.products].sort((a, b) => b.price - a.price);
      },
    },
 
    extraReducers: (builder) => {
      builder.addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.product,
        };
      });
    },
  });
  
  export const { setProducts,addProduct, toggleForm, setSearchTerm, sortProductsAsc, sortProductsDesc } = productSlice.actions;
  
  const makeStore = () => configureStore({
    reducer: {
  
      [productSlice.name]: productSlice.reducer,
    },
    devTools: true, 
  });
  
  export const wrapper = createWrapper(makeStore, { debug: true });