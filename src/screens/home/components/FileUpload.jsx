import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class FileUpload extends Component {
  addDocument = (file, doc)=> {
    this.props.addDocument(file, doc);
  }

  render() {
    return (
      <Dropzone onDrop={(acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
          const reader = new FileReader();
          reader.onload = () => {
            const fileAsBinaryString = reader.result;
            // do whatever you want with the file content
            this.addDocument(file, fileAsBinaryString);
          };
          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');

          reader.readAsBinaryString(file);
        });
      }}/>
    )
  }
}

export default FileUpload;