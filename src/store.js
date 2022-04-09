import { createStore } from 'redux';

const initialState = [
  {id: 0, x: 10, y: 10},
  {id: 1, x: 20, y: 20},
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
