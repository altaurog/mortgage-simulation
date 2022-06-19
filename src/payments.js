import * as d3 from 'd3';
import * as scale from './scale';

function update(svg, payments) {
  const yMax = payments.reduce(
    (m, { monthlyPayment }) => Math.max(m, monthlyPayment),
    0,
  );
  const yScale = scale.y.copy().domain([0, yMax]).nice();
  const yZero = yScale(0);
  const xWidth = scale.x(0.9);
  const data = payments.map(
    ({ monthlyPayment }, i) => [scale.x(i + 0.05), yScale(monthlyPayment)]
  );

  svg.select("#y-axis").call(d3.axisLeft(yScale));

  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("fill", "steelblue")
    .attr("x", d => d[0])
    .attr("y", d => d[1])
    .attr("width", xWidth)
    .attr("height", d => yZero - d[1])
  ;
}

function render(store, svg) {
  const state = store.getState();
  return update(svg, state.mortgage);
}

export default function payments(store, element) {
  const svg = d3.select(element)
    .append('svg')
    .attr('style', 'border: 1px solid gray')
    .attr('width', scale.width)
    .attr('height', scale.height)
    .attr('viewBox', scale.viewBox)
  ;

  svg.append('g').attr('id', 'plot');

  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0,${scale.height})`)
    .call(d3.axisBottom(scale.x));

  svg.append('g').attr('id', 'y-axis');

  const _payments = () => render(store, svg);
  store.subscribe(_payments);
  _payments();
}
