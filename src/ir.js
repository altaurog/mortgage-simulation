import * as d3 from 'd3';

const owidth = 800;
const oheight = 300;

export default function ir(store) {
  const svg = d3.select('body')
    .append('svg')
    .attr('width', owidth)
    .attr('height', oheight)
    .attr('viewBox', `0 0 ${owidth} ${oheight}`);

  const ir = () => render(store, svg);
  store.subscribe(ir);
  ir()
    .call(d3.drag()
    .on("drag", dragDrag(store)));
}

function render(store, svg) {
  const state = store.getState();
  return update(svg, state);
}

function update(svg, points) {
  return svg.selectAll("circle")
    .data(points, d => d.id)
    .join("circle")
    .attr("r", 5)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
}

function dragDrag(store) {
  return (event, d) => {
    const point = {
      ...d,
      x: event.x,
      y: event.y,
    };
    store.dispatch({type: 'point/drag', payload: point});
  }
}
