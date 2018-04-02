import React, { Component } from 'react';
import { FileUpload } from "./index";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class UploadDocument extends Component {
  constructor(props) {
    super(props);
    this.changeHash = this.changeHash.bind(this);
  }

  changeHash(e) {
    this.props.changeHash(e.target.value);
  }

  render() {
    const { hash, addDocument } = this.props;
    return (
      <div>
        <FileUpload addDocument={addDocument}/>
        <TextField onChange={this.changeHash} value={hash} hintText="Doc hash" style={{ width: "100%" }}/>
        <RaisedButton label="Check" primary={true} fullWidth={true}/>
      </div>
    )

  }
}

export default UploadDocument;