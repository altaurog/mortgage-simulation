import React from 'react';
import { useSelector } from 'react-redux';

export default function Data() {
  const payments = useSelector(state => state.mortgage);
  const total = payments.reduce(
    (sum, { monthlyPayment }) => sum + monthlyPayment * 12,
    0
  );

  return (
    <div>
      <b>Total:</b>
      <span>{Number(Math.round(total)).toLocaleString()}</span>
    </div>
  );
};
