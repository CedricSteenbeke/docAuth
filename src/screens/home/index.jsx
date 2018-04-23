import React, { Component } from 'react';
import { DocumentMetaData, DocumentsTable, UploadDocument } from "./components";
import { changeHash, registerDocument } from './actions';
import { connect } from "react-redux";

class Home extends Component {
  addDocument = (file, doc) => {
    const { dispatch } = this.props;
    dispatch(registerDocument(file, doc));
  }

  changeHash = (hash) => {
    const { dispatch } = this.props;
    dispatch(changeHash(hash));
  }

  render() {
    const { hash, document, documents } = this.props;
    return (
      <div>
        <h1>Add Document</h1>
        <div className="row">
          <div className="2-column">
            <UploadDocument
              addDocument={this.addDocument}
              hash={hash}
              changeHash={this.changeHash}
            />
          </div>
          <div className="2-column">
            <DocumentMetaData
              document={document}
            />
          </div>
        </div>
        <h1>Documents</h1>
        <DocumentsTable
          documents={documents}
        />

      </div>
    )
  }
}

export default connect(state => ({
  hash: state.home.getIn(['add', 'hash']),
  document: state.home.getIn(['document']),
  documents: state.home.get('documents')
}))(Home);