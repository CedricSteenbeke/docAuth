import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import AutoComplete from 'material-ui/AutoComplete';

class DocumentsTable extends Component {
  handleAuthorChange = (value)=> {
    this.props.findDocumentsForAuthor(value);
  };

  render() {
    const { documents, accounts } = this.props;
    return (
      <div>
        <AutoComplete
          hintText={'Search'}
          dataSource={accounts}
          onUpdateInput={this.handleAuthorChange}
          fullWidth={true}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip={"hash"}>Hash</TableHeaderColumn>
              <TableHeaderColumn tooltip={"Document file name"}>File name</TableHeaderColumn>
              <TableHeaderColumn tooltip={"Author"}>Author</TableHeaderColumn>
              <TableHeaderColumn tooltip={"Email"}>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              documents.map((doc, index) => (
                    <TableRow key={index}>
                      <TableRowColumn>{doc.get('hash')}</TableRowColumn>
                      <TableRowColumn>{doc.get('title')}</TableRowColumn>
                      <TableRowColumn>{doc.get('author')}</TableRowColumn>
                      <TableRowColumn>{doc.get('email')}</TableRowColumn>
                    </TableRow>
                  )

              )
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}


export default DocumentsTable;