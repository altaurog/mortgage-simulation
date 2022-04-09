import React from 'react';
import { useSelector } from 'react-redux';

export default function Data() {
  const points = useSelector(state => state);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>x</th>
            <th>y</th>
            <th>viewX</th>
            <th>viewY</th>
          </tr>
        </thead>
        <tbody>
          {points.map(p => <Point key={p.id} point={p}/>)}
        </tbody>
      </table>
    </div>
  );
};

function Point({ point }) {
  return (
    <tr>
      <td>{point.id}</td>
      <td>{point.sx?.toFixed(2)}</td>
      <td>{point.sy?.toFixed(2)}</td>
      <td>{point.x?.toFixed(2)}</td>
      <td>{point.y?.toFixed(2)}</td>
    </tr>
  );
}
