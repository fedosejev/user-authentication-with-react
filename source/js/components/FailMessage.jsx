var React = require('react');

var FailMessage = React.createClass({

  timeout: null,

  componentDidMount: function () {
    this.timeout = setTimeout(this.props.handleTimeout, 3000);
  },

  componentWillUpdate: function () {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },

  componentDidUpdate: function () {
    this.timeout = setTimeout(this.props.handleTimeout, 3000);
  },

  componentWillUnmount: function () {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },

  render: function () {
    return (
      <div className="message bg-danger text-danger text-center">{this.props.message}</div>
    );
  }
});

module.exports = FailMessage;
