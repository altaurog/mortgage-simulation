import * as d3 from 'd3';
import * as scale from './scale';

function render(store, svg) {
  const state = store.getState();
  return update(svg, state);
}

function update(svg, points) {
  const data = Array.from(points);
  data.sort((a, b) => a.viewX - b.viewX);
  const line = d3.line(d => d.viewX, d => d.viewY)
    .curve(d3.curveMonotoneX);

  svg.selectAll("path")
    .data([data])
    .join("path")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "black")
  ;

  return svg.selectAll("circle")
    .data(points, d => d.id)
    .join("circle")
    .attr("r", 5)
    .attr("cx", d => d.viewX)
    .attr("cy", d => d.viewY);
}

export default function ir(store, element) {
  const svg = d3.select(element)
    .append('svg')
    .attr('style', 'border: 1px solid gray')
    .attr('width', scale.width)
    .attr('height', scale.height)
    .attr('viewBox', scale.viewBox)
  ;

  const plot = svg.append('g').attr('id', 'plot');

  svg.append('g')
    .attr('transform', `translate(0,${scale.height})`)
    .call(d3.axisBottom(scale.x));

  svg.append('g').call(d3.axisLeft(scale.y));

  function dragDrag() {
    return (event, d) => {
      const x = pin(d, Math.max(0, Math.min(event.x, scale.width)));
      const y = Math.max(0, Math.min(event.y, scale.height));
      const point = scale.viewPt(d.id, {x, y});
      store.dispatch({type: 'point/drag', payload: point});
    }
  }

  const ir = () => render(store, plot);
  store.subscribe(ir);
  ir()
    .call(d3.drag()
    .on("drag", dragDrag(store)));
}

function pin(d, x) {
  if ([0, 1].includes(d.id)) {
    return d.viewX;
  }
  return x;
}
