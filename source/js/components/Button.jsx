var React = require('react');

var Button = React.createClass({
  render: function () {
    return (
      <button className={'btn btn-default ' + this.props.styleClass} onClick={this.props.handleClick}>{this.props.label}</button>
    );
  }
});

module.exports = Button;
