import { createStore } from 'redux';

const initialState = [
  {id: 0, x: 20, y: 50},
  {id: 1, x: 700, y: 250},
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
