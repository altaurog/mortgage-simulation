import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'loanParams',
  initialState: {
    loanAmount: 800000,
  },
  reducers: {
    changeAmount(state, action) {
      const amount = action.payload;
      return { ...state, loanAmount: amount };
    }
  }
});
