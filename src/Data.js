import React from 'react';
import { useSelector } from 'react-redux';

export default function Data() {
  const points = useSelector(state => state);

  return (
    <div>
      {points.map(p => <p key={p.id}>({p.x}, {p.y})</p>)}
    </div>
  );
};
