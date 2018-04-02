import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class DocumentsTable extends Component {
  render() {
    const { documents } = this.props;
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip={"hash"}>Hash</TableHeaderColumn>
              <TableHeaderColumn tooltip={"Document file name"}>File name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              documents.map((doc, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{index}</TableRowColumn>
                    <TableRowColumn>{doc.hash}</TableRowColumn>
                    <TableRowColumn>{doc.name}</TableRowColumn>
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