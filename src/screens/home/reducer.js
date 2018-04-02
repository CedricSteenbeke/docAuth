import { Map as ImmutableMap } from 'immutable';
import types from 'constants';

export default function (state = ImmutableMap({
  add: ImmutableMap({
    hash: ""
  })
}), action) {
  switch (action.type) {
    case types.ADD_DOCUMENT:
      debugger;
      return state.setIn(['add', 'hash'], action.hash);
    default:
      return state;
  }
}