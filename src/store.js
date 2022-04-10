import { configureStore } from '@reduxjs/toolkit';
import ir from './reducers/ir';

export default configureStore({
  reducer: {
    ir: ir.reducer,
  }
});

console.log(ir.actions);
