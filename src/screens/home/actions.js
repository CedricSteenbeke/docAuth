import types from './constants';

const showNotification = (message) => {
  return {
    type: types.SHOW_NOTIFICATION,
    message
  }
};

export const changeHash = (hash) => {
  return {
    type: types.CHANGE_HASH,
    hash
  }
};

const setDocumentMetaData = (docMetaData) => {
  return {
    type: types.SET_DOCUMENT_METADATA,
    payload: docMetaData
  }
};

const fetchDocumentMetaData = (docHash) => {
  return (dispatch, getState) => {
    const DocAuth = getState().web3.getIn(['contracts', 'DocAuth']);
    const defaultAccount = getState().web3.get('accounts').get(0);
    DocAuth.deployed().then(docAuthInstance => {
      return docAuthInstance.getDocumentMetadata.call(docHash, {
        from: defaultAccount
      });
    }).then(docMetaData => {
      const web3 = getState().web3.get('web3Instance');
      dispatch(changeHash(docHash));
      return dispatch(setDocumentMetaData({
        title: web3.toAscii(docMetaData[0]).replace(/\u0000/g, ''),
        author: web3.toAscii(docMetaData[1]).replace(/\u0000/g, ''),
        email: web3.toAscii(docMetaData[2]).replace(/\u0000/g, ''),
        dateWritten: docMetaData[3].toNumber()
      }));
    }).catch(result => {
      console.log(result);
      return dispatch(setError(`Unable to fetch document metadata for document ${docHash}`));
    });
  }
};

export const registerDocument = (document) => {

  return (dispatch, getState) => {
    const docHash = document.hash;
    const DocAuth = getState().web3.getIn(['contracts', 'DocAuth']);
    const accounts = getState().web3.get('accounts');
    const defaultAccount = accounts.get(0);
    let docAuthInstance;

    DocAuth.deployed().then((instance) => {
      docAuthInstance = instance;
      return docAuthInstance.registerDocument(docHash, document.title, "Leander Hoedt", "leander.hoedt@gmail.com", document.dateWritten, {
        from: defaultAccount,
        gas: 300000
      });
    }).then(() => {
      return docAuthInstance.checkDocumentExistence.call(docHash);
    }).then(documentExists => {
      if (documentExists) {
        dispatch(showNotification(`Document ${docHash} is registered.`));
        return dispatch(fetchDocumentMetaData(docHash));
      }
      return dispatch(showNotification(`Document ${docHash} is NOT registered!`));
    }).catch(result => {
      console.log(result);
      return dispatch(setError(result.message));
    });

  }
};

export const uploadDocument = (file, doc) => {
  const docTitle = file.name;
  const dateWritten = file.lastModified;

  return (dispatch, getState) => {
    const docHash = getState().web3.get('web3Instance').sha3(doc);
    const DocAuth = getState().web3.getIn(['contracts', 'DocAuth']);

    DocAuth.deployed().then((docAuthInstance) => {
      return docAuthInstance.checkDocumentExistence.call(docHash);
    }).then((documentAlreadyExists) => {
      if (documentAlreadyExists === true) {
        dispatch(showNotification(`Document ${docHash} already exists and assigned to author. (Author is visible in the metadata fetched above)`));
        return dispatch(fetchDocumentMetaData(docHash));
      } else {
        return dispatch(registerDocument({
          hash: docHash,
          title: docTitle,
          dateWritten: dateWritten
        }));
      }
    })
  }
};

const addDocumentToList = (doc) => {
  return {
    type: types.ADD_DOCUMENT_TO_LIST,
    payload: doc
  }
};

const addDocumentToOwner = (docHash) => {
  return (dispatch, getState) => {
    const DocAuth = getState().web3.getIn(['contracts', 'DocAuth']);
    const web3 = getState().web3.get('web3Instance');

    DocAuth.deployed().then(instance => {
      return instance.getDocumentMetadata.call(docHash);
    }).then(docMetaData => {
      return dispatch(addDocumentToList({
        hash: docHash,
        title: web3.toAscii(docMetaData[0]).replace(/\u0000/g, ''),
        author: web3.toAscii(docMetaData[1]).replace(/\u0000/g, ''),
        email: web3.toAscii(docMetaData[2]).replace(/\u0000/g, ''),
        dateWritten: docMetaData[3].toNumber()
      }))
    }).catch(result => {
      console.log(result);
      return dispatch(setError(result.message));
    });
  }
};


export const findDocumentForOwner = (author, docId) => {
  return (dispatch, getState) => {
    const DocAuth = getState().web3.getIn(['contracts', 'DocAuth']);

    DocAuth.deployed().then(instance => {
      return instance.getDocumentsForOwner.call(author, docId);
    }).then(foundDocHash => {
      return dispatch(addDocumentToOwner(foundDocHash));
    }).catch(result => {
      console.log(result);
      return dispatch(setError(`Unable to find document for author ${author} and document id ${docId}`));
    });
  }
};

const clearList = () => {
  return {
    type: types.CLEAR_DOCUMENT_LIST
  };
};

export const findDocumentsForAuthor = (author) => {
  return (dispatch, getState) => {
    dispatch(clearList());

    const DocAuth = getState().web3.getIn(['contracts', 'DocAuth']);
    let docAuthInstance;
    DocAuth.deployed().then(instance => {
      docAuthInstance = instance;
      return docAuthInstance.getOwnerDocumentCount.call(author);
    }).then((count) => {
      count = count.toNumber();
      for (let i = 0; i < count; i++) {
        dispatch(findDocumentForOwner(author, i));
      }
    }).catch(result => {
      console.log(result);
      return dispatch(setError(`Unable to fetch documents for author ${author}`));
    });
  }
};

export const hideNotification = () => {
  return {
    type: types.HIDE_NOTIFICATION
  }
};

function setError(error) {
  return {
    type: types.SET_CONTRACT_ERROR,
    error
  }
}