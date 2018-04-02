import { Map as ImmutableMap, List } from 'immutable';
import types from './constants';

export default function (state = ImmutableMap({
  add: ImmutableMap({
    hash: ""
  }),
  documents: List()
}), action) {
  switch (action.type) {
    case types.ADD_DOCUMENT:
      return state.setIn(['add', 'hash'], action.hash);
    case types.CHANGE_HASH:
      return state.setIn(['add', 'hash'], action.hash);
    default:
      return state;
  }
}