import React, { Component } from 'react';
import { FileUpload } from "./index";
import TextField from 'material-ui/TextField';

class UploadDocument extends Component {
  changeHash = (e) => {
    this.props.changeHash(e.target.value);
  };

  render() {
    const { hash, uploadDocument } = this.props;
    return (
      <div>
        <FileUpload addDocument={uploadDocument}/>
        <TextField
          onChange={this.changeHash}
          value={hash}
          hintText="Doc hash"
          fullWidth={true}
        />
      </div>
    )

  }
}

export default UploadDocument;