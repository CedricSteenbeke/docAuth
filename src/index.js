import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import App from './App'
import rootReducer from './redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
