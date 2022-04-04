import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

import * as d3 from 'd3';

const owidth = 800;
const oheight = 300;
const initialState = [
  {id: 0, x: 20, y: 50},
  {id: 1, x: 700, y: 250},
];
const store = createStore(points, initialState);

const container = document.createElement('div');
document.body.append(container);
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <Drag/>
  </Provider>
);

function points(state, action) {
  switch (action.type) {
    case 'point/drag':
      const point = action.payload;
      return state.map(p => p.id === point.id ? point : p);
    default:
      return state;
  }
}

function Drag() {
  const points = useSelector(state => state);
  const dispatch = useDispatch();
  const svgRef = React.useRef(null);

  function dragDrag(event, d) {
    const point = {
      ...d,
      x: event.x,
      y: event.y,
    };
    dispatch({type: 'point/drag', payload: point});
  }

  function update(el) {
    return el.select("g")
      .selectAll("circle")
      .data(points, d => d.id)
      .join("circle")
      .attr("r", 5)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  React.useEffect(() => {
    const el = d3.select(svgRef.current);
    update(el);
  }, [points]);

  React.useEffect(() => {
    const el = d3.select(svgRef.current);
    update(el)
      .call(d3.drag()
      .on("drag", dragDrag));
  }, []);

  return (
    <svg
      ref={svgRef}
      height={oheight}
      width={owidth}
      viewBox={`0 0 ${owidth} ${oheight}`}
    >
      <g/>
    </svg>
  );
};
