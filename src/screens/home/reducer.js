import { fromJS, List, Map as ImmutableMap } from 'immutable';
import types from './constants';

const initialState = ImmutableMap({
  add: ImmutableMap({
    hash: ""
  }),
  document: ImmutableMap(),
  documents: List(),
  notification: ImmutableMap({
    show: false,
    message: ""
  }),
  contractError: null
});
export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_DOCUMENT:
      return state.setIn(['add', 'hash'], action.hash);
    case types.CHANGE_HASH:
      return state.setIn(['add', 'hash'], action.hash);
    case types.SET_DOCUMENT_METADATA:
      return state.mergeIn(['document'], action.payload);
    case types.CLEAR_DOCUMENT_LIST:
      return state.setIn(['documents'], initialState.get('documents'));
    case types.ADD_DOCUMENT_TO_LIST:
      return state.mergeIn(['documents'], state.get('documents').push(fromJS(action.payload)));
    case types.SHOW_NOTIFICATION:
      return state.mergeIn(['notification'], {
        show: true,
        message: action.message
      });
    case types.HIDE_NOTIFICATION:
      return state.mergeIn(['notfication'], {
        show: false
      });
    case types.SET_CONTRACT_ERROR:
      return state.set('contractError', action.error);
    default:
      return state;
  }
}