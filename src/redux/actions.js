import types from './constants';
import TruffleContract from "truffle-contract";
import DocAuthContract from '../../build/contracts/DocAuth.json';

export const web3connect = (web3Instance) => {
  return {
    type: types.WEB3_CONNECTED,
    web3Instance
  }
};

const receiveAccounts = accounts => ({
  type: types.RECEIVE_ACCOUNTS,
  accounts
});

export const getAllAccounts = () => (dispatch, getState) => {
  getState().web3.get('web3Instance').eth.getAccounts((error, accounts) => {
    console.log(accounts);
    dispatch(receiveAccounts(accounts));
  });
};

export const instantiateContracts = () => (dispatch, getState) => {
  const DocAuth = TruffleContract(DocAuthContract);
  const currentProvider = getState().web3.get('web3Instance').currentProvider;
  DocAuth.setProvider(currentProvider);

  debugger;
  dispatch({
    type: types.INSTANTIATE_CONTRACTS,
    contracts: {
      DocAuth
    },
  });
};