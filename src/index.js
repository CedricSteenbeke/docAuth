import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import App from './App'
import rootReducer from './redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getAllAccounts, instantiateContracts, web3connect } from "./redux/actions";
import getWeb3 from "./utils/getWeb3";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
  );

getWeb3
  .then(results => {
    store.dispatch(web3connect(results.web3));
    // Instantiate contract once web3 provided.
    store.dispatch(instantiateContracts());
    store.dispatch(getAllAccounts());
  })
  .catch((e) => {
    console.log('Error ffinding web3.');
    console.log(e)
  });

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
