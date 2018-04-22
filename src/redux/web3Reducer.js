import { List, Map as ImmutableMap } from 'immutable';
import types from './constants';

const initialState = new ImmutableMap({
  web3Instance: null,
  contracts: ImmutableMap(),
  accounts: List()
});

export default function (state = initialState, action) {
  switch (action.type) {
    case types.WEB3_CONNECTED:
      return state.setIn(['web3Instance'], action.web3Instance);
    case types.RECEIVE_ACCOUNTS:
      debugger;
      return state.mergeIn(['accounts'], action.accounts);
    case types.INSTANTIATE_CONTRACTS:
      debugger;
      return state.mergeIn(['contracts'], action.contracts);
    default:
      return state;
  }
}
