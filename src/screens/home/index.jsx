import React, { Component } from 'react';
import { DocumentMetaData, DocumentsTable, UploadDocument } from "./components";
import { changeHash, findDocumentsForAuthor, hideNotification, uploadDocument } from './actions';
import { connect } from "react-redux";

class Home extends Component {
  uploadDocument = (file, doc) => {
    const { dispatch } = this.props;
    dispatch(uploadDocument(file, doc));
  };

  changeHash = (hash) => {
    const { dispatch } = this.props;
    dispatch(changeHash(hash));
  };

  findDocumentsForAuthor = (author) => {
    const { dispatch } = this.props;
    dispatch(findDocumentsForAuthor(author));
  };

  handleRequestClose = () => {
    const { dispatch } = this.props;
    dispatch(hideNotification());
  };

  render() {
    const { hash, document, documents, accounts, notification, contractError } = this.props;

    return (
      <div>
        {
          contractError && <p style={{ color: "red" }}>{contractError}</p>
        }
        <h1>Add Document</h1>
        <div className="row">
          <div className="column">
            <UploadDocument
              uploadDocument={this.uploadDocument}
              hash={hash}
              changeHash={this.changeHash}
            />
          </div>
          <div className="column">
            <DocumentMetaData
              document={document}
            />
          </div>
        </div>
        {
          notification.get('show') &&
          <div onClick={this.handleRequestClose}>
            {notification.get('message')}
          </div>
        }
        <h1>Documents</h1>
        <DocumentsTable
          findDocumentsForAuthor={this.findDocumentsForAuthor}
          documents={documents}
          accounts={accounts.toJS()}
        />
      </div>
    )
  }
}

export default connect(state => ({
  hash: state.home.getIn(['add', 'hash']),
  document: state.home.getIn(['document']),
  documents: state.home.get('documents'),
  accounts: state.web3.get('accounts'),
  notification: state.home.get('notification'),
  contractError: state.home.get('contractError')
}))(Home);