import React, { Component } from 'react';
import { UploadDocument } from "./components";
import { addDocument } from './actions';
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.addDocument = this.addDocument.bind(this);
  }

  addDocument(doc) {
    const { dispatch } = this.props;
    dispatch(addDocument(doc));
  }

  render() {
    const { hash } = this.props;
    return (
      <div>
        <h1>Add Document</h1>
        <div>
          <UploadDocument
            addDocument={this.addDocument}
            hash={hash}
          />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  hash: state.home.getIn(['add', 'hash'])
}))(Home);