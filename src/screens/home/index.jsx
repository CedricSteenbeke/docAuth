import React, { Component } from 'react';
import { DocumentsTable, UploadDocument } from "./components";
import { addDocument, changeHash } from './actions';
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.addDocument = this.addDocument.bind(this);
    this.changeHash = this.changeHash.bind(this);
  }

  addDocument(file, doc) {
    const { dispatch } = this.props;
    dispatch(addDocument(file, doc));
  }

  changeHash(hash) {
    const { dispatch } = this.props;
    dispatch(changeHash(hash));
  }

  render() {
    const { hash, documents } = this.props;
    return (
      <div>
        <h1>Add Document</h1>
        <UploadDocument
          addDocument={this.addDocument}
          hash={hash}
          changeHash={this.changeHash}
        />
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
  documents: state.home.get('documents')
}))(Home);