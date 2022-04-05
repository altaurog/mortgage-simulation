import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider, useSelector } from 'react-redux';

import * as d3 from 'd3';

// redux
const initialState = [
  {id: 0, x: 20, y: 50},
  {id: 1, x: 700, y: 250},
];

const store = createStore(points, initialState);

function points(state, action) {
  switch (action.type) {
    case 'point/drag':
      const point = action.payload;
      return state.map(p => p.id === point.id ? point : p);
    default:
      return state;
  }
}


// react
const container = document.createElement('div');
document.body.append(container)
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <Data/>
  </Provider>
);

function Data() {
  const points = useSelector(state => state);

  return (
    <div>
      {points.map(p => <p key={p.id}>({p.x}, {p.y})</p>)}
    </div>
  );
};


// d3
const owidth = 800;
const oheight = 300;

const svg = d3.select('body')
  .append('svg')
  .attr('width', owidth)
  .attr('height', oheight)
  .attr('viewBox', `0 0 ${owidth} ${oheight}`);

function render() {
  const state = store.getState();
  return update(svg, state);
}

store.subscribe(render);
render()
  .call(d3.drag()
  .on("drag", dragDrag));

function update(svg, points) {
  console.log(points);
  return svg.selectAll("circle")
    .data(points, d => d.id)
    .join("circle")
    .attr("r", 5)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
}

function dragDrag(event, d) {
  const point = {
    ...d,
    x: event.x,
    y: event.y,
  };
  store.dispatch({type: 'point/drag', payload: point});
}
