import React from 'react';
import * as d3 from 'd3';

const margin = 25;
const owidth = 800;
const oheight = 300;
const iwidth = owidth - 2 * margin;
const iheight = oheight - 2 * margin;

const xScale = d3.scaleLinear().range([0, iwidth]);
const yScale = d3.scaleLinear().range([0, iheight]);

const maxRate = 5;

function InterestRates({ years }) {
  const svgRef = React.useRef(null);
  const [points, setPoints] = React.useState([
    {id: 0, x: 0, y: 0.3},
    {id: 1, x: years, y: 1.2},
  ]);

  const clampX = x => Math.max(0, Math.min(x, years));
  const clampY = y => Math.max(0, Math.min(y, maxRate));

  function dragSubject(event) {
    return event.sourceEvent.target.__data__;
  }

  function dragStart(event) {
    event.subject.xo = xScale(event.subject.x) - event.sourceEvent.x;
    event.subject.yo = yScale(event.subject.y) - event.sourceEvent.y;
  }

  function dragDrag(event) {
    if (!event.subject) {
      return;
    }
    const point = {...event.subject};
    point.x = clampX(xScale.invert(event.sourceEvent.x + event.subject.xo));
    point.y = clampY(yScale.invert(event.sourceEvent.y + event.subject.yo));
    const newPoints = points.map(p => p.id === point.id ? point : p);
    console.log(newPoints);
    setPoints(newPoints);
  }

  function update(el) {
    const circle = el.select("g")
      .selectAll("circle")
      .data(points, d => d.id)
      .join("circle")
      .attr("r", 5)
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y));
  }

  React.useEffect(() => {
    const el = d3.select(svgRef.current);
    update(el);
  }, [years, points]);

  React.useEffect(() => {
    const el = d3.select(svgRef.current);
    xScale.domain([0, years]);
    yScale.domain([maxRate, 0]);

    el.select(".xaxis")
      .call(d3.axisBottom(xScale));

    el.select(".yaxis")
      .call(d3.axisLeft(yScale));

    update(el);

    el.call(d3.drag()
      .subject(dragSubject)
      .on("start", dragStart)
      .on("drag", dragDrag));
  }, []);

  return (
    <div>
      <h3>Interest Rates</h3>
      <svg
        ref={svgRef}
        height={oheight}
        width={owidth}
        viewBox={`0 0 ${owidth} ${oheight}`}
      >
        <g transform={`translate(${margin},${margin})`}>
          <g className="xaxis" transform={`translate(0, ${iheight})`} />
          <g className="yaxis" />
        </g>
      </svg>

    </div>
  );
};

export default InterestRates;
