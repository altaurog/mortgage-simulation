import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import slice from './reducers/loanParams';

export default function Data() {
  const loanParams = useSelector(state => state.loanParams);
  const payments = useSelector(state => state.mortgage);
  const dispatch = useDispatch();
  const total = payments.reduce(
    (sum, { averageMonthlyPayment }) => sum + averageMonthlyPayment * 12,
    0
  );

  const onChange = event => {
    const amount = Number(event.target.value.replace(/[^0-9.]/g, ''));
    if (amount) {
      dispatch(slice.actions.changeAmount(amount));
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="loanAmount"><b>Loan Amount: </b></label>
        <input
            id="loanAmount"
            type="text"
            value={loanParams.loanAmount.toLocaleString()}
            onChange={onChange}
        />
      </form>
      <b>Total Cost: </b>
      <span>{Number(Math.round(total)).toLocaleString()}</span>
    </div>
  );
};
