import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class DocumentMetaData extends Component {

  formatDate = (bigNumber) => {
    if(!bigNumber) return '';
    const date = new Date(bigNumber);
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  };

  render() {
    const { document } = this.props;
    return (
      <form>
        <TextField
          id="title"
          hintText="Title"
          value={document.get('title')}
          readOnly
          fullWidth={true}
        />
        <TextField
          id="author"
          hintText="Author"
          value={document.get('author')}
          readOnly
          fullWidth={true}
        />
        <TextField
          id="email"
          hintText="Email"
          value={document.get('email')}
          readOnly
          fullWidth={true}
        />
        <TextField
          id="dateWritten"
          hintText="Date Written"
          value={this.formatDate(document.get('dateWritten'))}
          readOnly
          fullWidth={true}
        />
      </form>
    )
  }
}

export default DocumentMetaData;