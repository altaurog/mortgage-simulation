import { createSlice } from '@reduxjs/toolkit';
import * as scale from '../scale';

const points = [
  scale.pt(0, {x: 0, y: 1.6}),
  scale.pt(1, {x: 30, y: 5.6}),
  scale.pt(2, {x: 20, y: 6.5}),
];

export default createSlice({
  name: 'ir',
  initialState: {
    points,
  },
  reducers: {
    dragPoint(state, action) {
      const point = action.payload;
      return {
        ...state,
        points: state.points.map(p => p.id === point.id ? point : p),
      };
    },
  },
});
