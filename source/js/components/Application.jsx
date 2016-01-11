var React = require('react');
var LogInForm = require('./LogInForm.jsx');
var SignUpForm = require('./SignUpForm.jsx');
var Button = require('./Button.jsx');
var FailMessage = require('./FailMessage.jsx');
var SuccessMessage = require('./SuccessMessage.jsx');
var AuthenticationService = require('../services/authentication');

var PAGES = {
  LANDING: 'LANDING',
  SIGN_UP: 'SIGN_UP',
  LOG_IN: 'LOG_IN',
  MY_COURSES: 'MY_COURSES'
};

var Application = React.createClass({

  getInitialState: function () {
    return {
      currentPage: PAGES.LANDING,
      pageToShowAfterLogin: null,
      token: null,
      failMessage: null,
      successMessage: null
    };
  },

  clearMessages: function () {
    this.setState({
      failMessage: null,
      successMessage: null
    });
  },

  changeCurrentPageTo: function (pageName) {
    this.setState({
      currentPage: pageName
    });
  },

  showLandingPage: function () {
    this.changeCurrentPageTo(PAGES.LANDING);
  },

  showSignUpPage: function () {
    this.clearMessages();
    this.changeCurrentPageTo(PAGES.SIGN_UP);
  },

  showLogInPage: function () {
    this.clearMessages();
    this.changeCurrentPageTo(PAGES.LOG_IN);
  },

  showPageAfterLogIn: function (pageName) {
    this.setState({
      pageToShowAfterLogin: pageName
    });
  },

  showMyCoursesPage: function () {
    if (this.isUserLoggedIn()) {
      this.changeCurrentPageTo(PAGES.MY_COURSES);
    } else {
      this.showPageAfterLogIn(PAGES.MY_COURSES);
      this.changeCurrentPageTo(PAGES.LOG_IN);
    }
  },

  showFailMessage: function (message) {
    this.setState({
      failMessage: message
    });
  },

  showSuccessMessage: function (message) {
    this.setState({
      successMessage: message
    });
  },

  setUserAuthenticationToken: function (token) {
    this.setState({
      token: token
    });
  },

  isUserLoggedIn: function () {
    return (this.state.token !== null);
  },

  handleUserSignUpFormSubmit: function (username, password) {
    AuthenticationService.signUp(username, password, function handleUserSignUp(error, response) {
      if (error) {
        this.showFailMessage('Failed to join.');
        return;
      }

      AuthenticationService.logIn(username, password, function handleUserLogIn(error, response) {
        if (error) {
          this.showFailMessage('Failed to log in.');
          return;
        }

        this.setUserAuthenticationToken(response.token);
        this.showSuccessMessage('Thanks for joining!');

        if (this.state.pageToShowAfterLogin) {
          this.changeCurrentPageTo(this.state.pageToShowAfterLogin);
          this.showPageAfterLogIn(null);
        } else {
          this.showLandingPage();
        }

      }.bind(this));
    }.bind(this));
  },

  handleUserLogInFormSubmit: function (username, password) {
    AuthenticationService.logIn(username, password, function handleUserLogIn(error, response) {
      if (error) {
        this.showFailMessage('Failed to log in.');
        return;
      }

      this.setUserAuthenticationToken(response.token);
      this.showSuccessMessage('Welcome back!');

      if (this.state.pageToShowAfterLogin) {
        this.changeCurrentPageTo(this.state.pageToShowAfterLogin);
        this.showPageAfterLogIn(null);
      } else {
        this.showLandingPage();
      }

    }.bind(this));
  },

  hideFailMessage: function () {
    this.setState({
      failMessage: null
    });
  },

  hideSuccessMessage: function () {
    this.setState({
      successMessage: null
    });
  },

  logOut: function () {
    this.setUserAuthenticationToken(null);
    this.showLandingPage();
  },

  render: function () {

    if (this.state.currentPage === PAGES.LANDING) {

      return (
        <div>
          { this.state.successMessage ? <SuccessMessage message={this.state.successMessage} handleTimeout={this.hideSuccessMessage} /> : null }
          <div className="container text-center">
            { this.state.isUserLoggedIn ? <Button label="Log Out" handleClick={this.logOut} /> : <Button label="Join" handleClick={this.showSignUpPage} /> }
            <Button label="My Courses" handleClick={this.showMyCoursesPage} />
          </div>
        </div>
      );

    } else if (this.state.currentPage === PAGES.SIGN_UP) {

      return (
        <div>
          { this.state.failMessage ? <FailMessage message={this.state.failMessage} handleTimeout={this.hideFailMessage} /> : null }
          <div className="container text-center">
            <Button label="Home" handleClick={this.showLandingPage} />
            <SignUpForm handleFormSubmit={this.handleUserSignUpFormSubmit} header="Join our service - it's free!" />
          </div>
        </div>
      );

    } else if (this.state.currentPage === PAGES.LOG_IN) {

      return (
        <div>
          { this.state.failMessage ? <FailMessage message={this.state.failMessage} handleTimeout={this.hideFailMessage} /> : null }
          <div className="container text-center">
            <Button label="Home" handleClick={this.showLandingPage} />
            <LogInForm handleFormSubmit={this.handleUserLogInFormSubmit} header="Please log in first." />
          </div>
        </div>
      );

    } else if (this.state.currentPage === PAGES.MY_COURSES) {

      return (
        <div>
          { this.state.successMessage ? <SuccessMessage message={this.state.successMessage} handleTimeout={this.hideSuccessMessage} /> : null }
          <div className="container text-center">
            <Button label="Home" handleClick={this.showLandingPage} />
            <Button label="Log Out" handleClick={this.logOut} />
            <p>A list of your courses goes here.</p>
          </div>
        </div>
      );

    }

    return (
      <div className="container text-center">
        Page not found.
      </div>
    );
  }
});

module.exports = Application;
