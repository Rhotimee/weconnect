import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSignupRequest } from '../../actions/userActions';
import SignupForm from './SignupForm';

/**
 * @class LoginForm
 *
 * @classdesc logs in user
 *
 */
class Signup extends PureComponent {
  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="cover">
        <div className="cover-overlay">

          <div className="container py-5 auth" id="signup">
            <div className="card  text-center card-form my-2">
              <div className="card-body">
                <h3>Sign up </h3>
                <p>Fill this form to register</p>
                <SignupForm userSignupRequest={userSignupRequest} />
              </div>
              <div className="card-footer">Have an account ?  <a href="signin.html">Sign in</a></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(Signup);
