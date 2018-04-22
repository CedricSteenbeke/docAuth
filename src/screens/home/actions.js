import sjcl from 'sjcl';
import types from './constants';

export function addDocument(file, doc) {
  const out = sjcl.hash.sha256.hash(doc);
  const docHash = sjcl.codec.hex.fromBits(out);
  const docTitle = file.name;
  const dWritten = file.lastModified;

  return (dispatch, getState) => {
    console.log('');
    debugger;
    const DocAuth = getState().web3.get('contracts').get('DocAuth');
    const accounts = getState().web3.get('accounts');
    return DocAuth.deployed().then(docAuthInstance => {
      return docAuthInstance.registerDocument(docHash, docTitle, "Leander Hoedt", "leander.hoedt@gmail.com", dWritten, { from: accounts.get(0) })
    })
  }
}

export const changeHash = (hash) => {
  return {
    type: types.CHANGE_HASH,
    hash
  }
};
