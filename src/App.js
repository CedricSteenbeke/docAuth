import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import DocAuthContract from '../build/contracts/DocAuth.json';
import getWeb3 from './utils/getWeb3';
import Home from './screens/home/index';
import TruffleContract from 'truffle-contract';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import { instantiateContracts, web3connect } from "./redux/actions";

class App extends Component {
/*
  instantiateContract() {


    const simpleStorage = TruffleContract(SimpleStorageContract);
    const docAuthStorage = TruffleContract(DocAuthContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);
    docAuthStorage.setProvider(this.state.web3.currentProvider);
    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance;
    var docAuthInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance;

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      });
      docAuthStorage.deployed().then((instance)=> {
        docAuthInstance = instance;
      })
    });

  }
*/
  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Doc Auth - DAPP</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <Home/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
