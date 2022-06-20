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
    d3.range(0, 30).map(scale.x),
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
    ? loanAmount / loanTerm / 12
    : loanAmount * initialMonthlyRate /
        (1 - Math.pow((1 + initialMonthlyRate), -loanTerm * 12));

  let principle = loanAmount;
  return rates.map((r, y) => {
    const monthlyRate = r / 1200;
    let total = 0;
    let interest = 0;
    for (let month = 1; month <= 12; month++) {
      let principlePayment = initialMonthlyPayment - principle * initialMonthlyRate;
      let interestPayment = principle * monthlyRate;
      total += interestPayment + principlePayment;
      interest += interestPayment;
      principle -= principlePayment;
    }
    return {
      averageMonthlyPayment: total / 12,
      interest,
      loanTerm,
      principle,
    };
  });
}
