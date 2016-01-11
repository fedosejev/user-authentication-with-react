var React = require('react');
var Button = require('./Button.jsx');

var SignUpForm = React.createClass({

  handleFormSubmit: function (submitEvent) {
    submitEvent.preventDefault();

    var username = this.refs.username.value;
    var password = this.refs.password.value;

    this.props.handleFormSubmit(username, password);
  },

  render: function () {
    return (
      <div className="login">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">

            <form className="login-form" onSubmit={this.handleFormSubmit}>
              <h4>{this.props.header}</h4>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="Email" ref="username" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" ref="password" required />
              </div>

              <button type="submit" className="btn btn-default">Join</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = SignUpForm;
