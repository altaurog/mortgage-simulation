import { combineReducers } from 'redux';
import ir from './ir';
import loanParams from './loanParams';
import mortgage from './mortgage';

const slices = combineReducers({
  ir: ir.reducer,
  loanParams: loanParams.reducer,
  mortgage: state => state || [],
});
const reducers = [slices, mortgage];
export default function(state, action) {
  return reducers.reduce((s, r) => r(s, action), state);
}
