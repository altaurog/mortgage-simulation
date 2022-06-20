import { createSlice } from '@reduxjs/toolkit';
import * as d3 from 'd3';
import { interpolate } from '../interpolate';
import * as scale from '../scale';
import irSlice from './ir';

export default function(state, action) {
  return {
    ...state,
    mortgage: mortgage(state),
  };
}

function mortgage({ ir, loanParams }) {
  const rates = interpolate(
    ir.points,
    d3.range(0, 30 * 12).map(scale.x),
  );
  return calculatePayments(loanParams.loanAmount, rates.map(scale.y.invert));
}

function calculatePayments(
  loanAmount,
  rates,
) {
  const initialMonthlyRate = rates[0] / 1200;
  const loanTerm = rates.length;
  const initialMonthlyPayment =
    initialMonthlyRate === 0
    ? loanAmount / loanTerm
    : loanAmount * initialMonthlyRate /
        (1 - Math.pow((1 + initialMonthlyRate), -loanTerm));

  let principle = loanAmount;
  return rates.map((r, y) => {
    const monthlyRate = r / 1200;
    const principlePayment = initialMonthlyPayment - principle * initialMonthlyRate;
    const interestPayment = principle * monthlyRate;
    const payment = interestPayment + principlePayment;
    principle -= principlePayment;
    return {
      interest: interestPayment,
      payment,
      principle,
    };
  });
}
