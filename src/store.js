import { createStore } from 'redux';
import * as scale from './scale';

const initialState = [
  scale.pt(0, {x: 0, y: 1.6}),
  scale.pt(1, {x: 30, y: 5.6}),
  /*
  {id: 0, viewX: scale.x(0), viewY: scale.y(1.6)},
  {id: 1, viewX: scale.x(30), viewY: scale.y(5.5)},
  */
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
