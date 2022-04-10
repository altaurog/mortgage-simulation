import { createSlice } from '@reduxjs/toolkit';
import * as d3 from 'd3';
import { interpolate } from '../interpolate';
import * as scale from '../scale';
import irSlice from './ir';

export default function(state, action) {
  switch (action.type) {
    case irSlice.actions.dragPoint.type:
      return {
        ...state,
        mortgage: mortgage(state),
      }
      break;
    default:
      return state;
  }
}

function mortgage({ ir }) {
  const rates = interpolate(
    ir.points,
    d3.range(0, 30).map(scale.x),
  );
  return calculatePayments(800000, rates.map(scale.y.invert));
}

function calculatePayments(
  initial,
  rates,
) {
  let balance = initial;
  return rates.map((r, y) => {
    const monthlyRatePct = r / 1200;
    const years = rates.length - y;
    const monthlyPayment =
      monthlyRatePct === 0
        ? balance / years / 12
        : (balance * monthlyRatePct) /
          (1 - Math.pow((1 + monthlyRatePct), -years * 12));
    let interestYearly = 0;
    let partial;
    for (let month = 1; month <= 12; month++) {
      let interestMonth = balance * monthlyRatePct;
      interestYearly += interestMonth;
      balance -= (monthlyPayment - interestMonth);

      if (balance <= 0) {
        balance = 0;
        if (partial === undefined && month !== 12) {
          partial = month;
        }
      }
    }
    return {
      monthlyPayment,
      interestYearly,
      years,
      balance,
      partial,
    };
  });
}
