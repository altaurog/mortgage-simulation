import { createSlice } from '@reduxjs/toolkit';
import * as scale from '../scale';

const points = [
  scale.pt(0, {x: 0, y: 1.6}),
  scale.pt(2, {x: 10, y: 1.2}),
  scale.pt(3, {x: 20, y: 6.5}),
  scale.pt(1, {x: 30, y: 5.6}),
];

export default createSlice({
  name: 'ir',
  initialState: {
    points,
  },
  reducers: {
    dragPoint(state, action) {
      const point = action.payload;
      const points = state.points.map(p => p.id === point.id ? point : p);
      points.sort((a, b) => a.viewX - b.viewX);
      return { ...state, points };
    },
    selectPoint(state, action) {
      return {
        ...state,
        selection: action.payload,
      };
    }
  },
});
