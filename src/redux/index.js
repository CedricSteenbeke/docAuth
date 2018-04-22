import { combineReducers } from 'redux'
import home from '../screens/home/reducer';
import web3Reducer from './web3Reducer';

const rootReducer = combineReducers({
  home,
  web3: web3Reducer
});

export default rootReducer;