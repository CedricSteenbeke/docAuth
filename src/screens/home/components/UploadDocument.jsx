import React, { Component } from 'react';
import { FileUpload } from "./index";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class UploadDocument extends Component {
  render() {
    const { hash, addDocument } = this.props;
    return (
      <div>
        <FileUpload addDocument={addDocument}/>
        <TextField value={hash} hintText="Doc hash" style={{ width: "100%" }}/>
        <RaisedButton label="Check" primary={true} fullWidth={true}/>
      </div>
    )

  }
}

export default UploadDocument;