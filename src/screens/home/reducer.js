import { List, Map as ImmutableMap } from 'immutable';
import types from './constants';

export default function (state = ImmutableMap({
  add: ImmutableMap({
    hash: ""
  }),
  document: ImmutableMap(),
  documents: List()
}), action) {
  switch (action.type) {
    case types.ADD_DOCUMENT:
      return state.setIn(['add', 'hash'], action.hash);
    case types.CHANGE_HASH:
      return state.setIn(['add', 'hash'], action.hash);
    case types.SET_DOCUMENT_METADATA:
      return state.mergeIn(['document'], action.payload);
    default:
      return state;
  }
}