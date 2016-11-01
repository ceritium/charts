import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';

export default class QueryEditorWidget extends React.Component {
  static propTypes = {
    updateName: PropTypes.func.isRequired,
    updatePreview: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sql: props.query.sql,
      testData: props.query.test_data
    };
  }

  componentDidMount(){
    this.fetchPreview();
  }

  fetchPreview(){
    fetch(`${this.props.sourcePath}/preview.json`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken()
      },
      body: JSON.stringify({
        sql: this.state.sql,
        testData: this.state.testData
      })
    }).then((response) => {
      return response.json();
    }).then(function(data) {
      this.props.updatePreview(data);
    }.bind(this))

  }

  handleChangeTestData(e){
    const testData = e.target.value;
    this.setState({testData: testData}, this.fetchPreview);
  }

  handleChange(e) {
    const sql = e.target.value;
    this.setState({sql: sql}, this.fetchPreview);
  }

  render() {
    const query = this.props.query;
    return (
      <div className="container">
        <form action={this.props.formPath} method='post' className="form-horizontal">
          <input type='hidden' name='_method' value='patch'/>

          <FormGroup controlId="queryName">
            <ControlLabel>Name</ControlLabel>
            <FormControl name="query[name]" defaultValue={query.name} componentClass="input"/>
          </FormGroup>

          <FormGroup controlId="queryTestData">
            <ControlLabel>Test Data</ControlLabel>
            <FormControl
              rows="3"
              onChange={e => this.handleChangeTestData(e)}
              defaultValue={query.test_data}
              name="query[test_data]"
              componentClass="textarea"/>
          </FormGroup>
          <FormGroup controlId="querySQL">
            <ControlLabel>SQL</ControlLabel>
            <FormControl
              rows="5"
              onChange={e => this.handleChange(e)}
              defaultValue={query.sql}
              name="query[sql]"
              componentClass="textarea"/>
          </FormGroup>
          <Button type='submit'> Save </Button>
        </form>
      </div>
    );
  }
}
