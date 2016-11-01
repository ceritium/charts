import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';

class DataRow extends React.Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    row: PropTypes.object.isRequired
  }

  render() {
    const columns = this.props.columns;
    const row = this.props.row;
    return (
      <tr>
        {
          columns.map(function(name, index){
            return(<td key={index}>
              {row[name]}
            </td>)
          })
        }
      </tr>
    );
  }
}

export default class QueryPreview extends React.Component {
  static propTypes = {
    preview: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      pivot: null
    };
  }

  handleChangePivot(e){
    this.setState({pivot: e.target.value})
  }

  render() {
    const preview = this.props.preview;
    return (
      <div className="container">
        <FormGroup controlId="pivot">
          <ControlLabel>Pivot</ControlLabel>
          <FormControl
            onChange={this.handleChangePivot.bind(this)}
            componentClass="select" placeholder="Pivot">
            <option key="-1"> FALSE </option>
            {
              preview.columns.map(function(name, index){
                return <option key={index} value={name}> {name} </option>
              })
            }
          </FormControl>
        </FormGroup>

        <Table>
          <thead>
          <tr>
            {
              preview.columns.map(function(name){
                return <th key={name}> {name} </th>;
              })
            }
          </tr>
          </thead>
          <tbody>
            {
              preview.data.map(function(row, index) {
                return(<DataRow key={index} columns={preview.columns} row={row}/>);
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
