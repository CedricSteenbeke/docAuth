import sjcl from 'sjcl';
import types from './constants';

export function registerDocument(file, doc) {
  const out = sjcl.hash.sha256.hash(doc);
  const docHash = sjcl.codec.hex.fromBits(out);
  const docTitle = file.name;
  const dWritten = file.lastModified;

  return (dispatch, getState) => {
    const DocAuth = getState().web3.get('contracts').get('DocAuth');
    const accounts = getState().web3.get('accounts');
    let docAuthInstance;
    return DocAuth.deployed().then(instance => {
      docAuthInstance = instance;
      debugger;
      return docAuthInstance.registerDocument(docHash, docTitle, "Leander Hoedt", "leander.hoedt@gmail.com", dWritten, { from: accounts.get(0) })
    }).then(() => {
      debugger;
      return docAuthInstance.getDocumentMetadata(docHash);
    }).then(docMetaData => {
      dispatch(setDocumentMetaData(docMetaData));
    });
  }
}

function setDocumentMetaData(docMetaData) {
  return {
    type: types.SET_DOCUMENT_METADATA,
    payload: docMetaData
  }
}

export const changeHash = (hash) => {
  return {
    type: types.CHANGE_HASH,
    hash
  }
};
