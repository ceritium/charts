import React, { PropTypes } from 'react';

// Simple example of a React "dumb" component
export default class HelloWorldWidget extends React.Component {
  static propTypes = {
    updateName: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  };

  handleChange(e) {
    const name = e.target.value;
    this.props.updateName(name);
  }

  render() {
    const { name } = this.props;
    return (
      <div className="container">
        <h3>
          Hello, {name}!
        </h3>
        <hr />
        <form className="form-horizontal">
          <label>
            Say hello to:
          </label>
          <input
            type="text"
            value={name}
            onChange={e => this.handleChange(e)}
          />
        </form>
      </div>
    );
  }
}
