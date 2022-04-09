import * as d3 from 'd3';

const xRange = 30;
const yRange = 10;

const width = 500
const height = 300

const margin = 0.08;

const xOrigin = -width * margin;
const yOrigin = -height * margin;
const xView = width * (1 + 2 * margin);
const yView = height * (1 + 2 * margin);

const xScale = d3.scaleLinear()
  .domain([0, width])
  .range([0, xRange]);

const yScale = d3.scaleLinear()
  .domain([height, 0])
  .range([0, yRange]);

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

export default function ir(store, element) {
  const svg = d3.select(element)
    .append('svg')
    .attr('style', 'border: 1px solid gray')
    .attr('width', "500")
    .attr('height', "300")
    .attr('viewBox', `${xOrigin} ${yOrigin} ${xView} ${yView}`);

  function dragDrag() {
    return (event, d) => {
      const { x, y } = event;
      const point = {
        id: d.id,
        sx: xScale(x),
        sy: yScale(y),
        x: Math.max(0, Math.min(x, width)),
        y: Math.max(0, Math.min(y, height)),
      };
      store.dispatch({type: 'point/drag', payload: point});
    }
  }

  const ir = () => render(store, svg);
  store.subscribe(ir);
  ir()
    .call(d3.drag()
    .on("drag", dragDrag(store)));
}
