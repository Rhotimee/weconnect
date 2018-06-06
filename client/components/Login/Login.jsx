import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './loginForm';
import { userSigninRequest } from '../../actions/userActions';


/**
 * @class Login
 *
 * @classdesc logs in user
 *
 */
class Login extends PureComponent {
  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    return (

      <div className="cover">
        <div className="cover-overlay">
          <div className="container py-5 auth" id="signin">
            <div className="card justify-content-center text-center card-form mt-5">
              <div className="card-body my-3">
                <h3>Sign In </h3>
                <p>Fill this form to Login</p>
                <LoginForm userSigninRequest={this.props.userSigninRequest} />
              </div>
              <div className="card-footer">No account yet?  <a href="signup.html">Sign up</a></div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

Login.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};


export default connect(null, { userSigninRequest })(Login);
