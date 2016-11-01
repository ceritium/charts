import React, { PropTypes } from 'react';
import QueryEditorWidget from '../components/QueryEditorWidget';
import QueryPreview from '../components/QueryPreview';

export default class QueryEditor extends React.Component {
  static propTypes = {
    query: PropTypes.object.isRequired, // this is passed from the Rails view
  };

  constructor(props, context) {
    super(props, context);

    this.state = { query: this.props.query, preview: {columns: [], data: []} };
  }

  updateName(preview) {
    this.setState({ name });
  }

  updatePreview(preview) {
    this.setState({preview});
  }

  render() {
    return (
      <div>
        <QueryEditorWidget sourcePath={this.props.sourcePath} formPath={this.props.formPath} query={this.state.query} updatePreview={e => this.updatePreview(e)}  updateName={e => this.updateName(e)} />
        <hr/>
        <QueryPreview preview={this.state.preview} />
      </div>
    );
  }
}
