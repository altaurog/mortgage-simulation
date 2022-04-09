import * as d3 from 'd3';

const xRange = 30;
const yRange = 10;

export const width = 600
export const height = 200

const xMargin = 0.04;
const yMargin = 0.10;

const xOrigin = -width * xMargin;
const yOrigin = -height * yMargin;
const xView = width * (1 + 2 * xMargin);
const yView = height * (1 + 2 * yMargin);

export const viewBox = `${xOrigin} ${yOrigin} ${xView} ${yView}`;

export const x = d3.scaleLinear()
  .range([0, width])
  .domain([0, xRange]);

export const y = d3.scaleLinear()
  .range([height, 0])
  .domain([0, yRange]);

export function pt(id, r) {
  return {
    id,
    viewX: x(r.x),
    viewY: y(r.y),
    x: r.x,
    y: r.y,
  }
}

export function viewPt(id, v) {
  return {
    id,
    viewX: v.x,
    viewY: v.y,
    x: x.invert(v.x),
    y: y.invert(v.y),
  }
}
