import React, { Component } from 'react';
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';


/**
 * @class SignupForm
 *
 * @classdesc signup user
 *
 */
class SignupForm extends Component {
  /**
   * constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description onChange
   *
   * @param  {object} event  the event
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description onChange
   *
   * @param  {object} event  the event
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.userSignupRequest(this.state).then(
      () => {
        this.context.router.history.push('/');
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Signed up  Successfully');
      },
      ({ data }) => this.setState({ errors: data, isLoading: false })
    );
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <p className="col-12 my-3">Fields with <small>*</small> are required </p>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="First Name *"
            value={this.state.firstName}
            onChange={this.onChange}
            name="firstName"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Last Name *"
            value={this.state.lastName}
            onChange={this.onChange}
            name="lastName"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Email *"
            value={this.state.email}
            onChange={this.onChange}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Password *"
            value={this.state.password}
            onChange={this.onChange}
            name="password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Confirm Password *"
            value={this.state.confirmPassword}
            onChange={this.onChange}
            name="confirmPassword"
            required
          />
        </div>
        <input
          disabled={this.state.isLoading}
          type="submit"
          className="btn btn-outline-dark btn-block"
        />
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignupForm;
