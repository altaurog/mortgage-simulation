import { createStore } from 'redux';
import * as scale from './scale';

const initialState = [
  {id: 0, x: scale.x(0), y: scale.y(1.6)},
  {id: 1, x: scale.x(30), y: scale.y(5.5)},
];

function points(state, action) {
  switch (action.type) {
    case 'point/drag':
      const point = action.payload;
      return state.map(p => p.id === point.id ? point : p);
    default:
      return state;
  }
}

export default createStore(points, initialState);
