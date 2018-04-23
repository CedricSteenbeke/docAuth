import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class DocumentMetaData extends Component {
  render() {
    return(
      <form>
        <TextField
          id="title"
          lable="Title"
          readOnly
        />
        <TextField
          id="author"
          lable="Author"
          readOnly
        />
        <TextField
          id="email"
          lable="Email"
          readOnly
        />
        <TextField
          id="dateWritten"
          lable="Date Written"
          readOnly
        />
      </form>
    )
  }
}

export default DocumentMetaData;