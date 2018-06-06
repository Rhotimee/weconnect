import React, { Component } from 'react';
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';

/**
 * @class LoginForm
 *
 * @classdesc logs in user
 *
 */
class LoginForm extends Component {
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
      email: '',
      password: '',
      errors: {}
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
    this.props.userSigninRequest(this.state).then(
      () => {
        this.context.router.history.push('/');
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Logged In Successfully');
      },
      ({ response }) => {
        this.setState({ errors: response.data.message });
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(this.state.errors);
      }
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
            type="email"
            className="form-control form-control-lg"
            placeholder="Email *"
            required
            value={this.state.email}
            onChange={this.onChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Password *"
            required
            value={this.state.password}
            onChange={this.onChange}
            name="password"
          />
        </div>
        <input type="submit" className="btn btn-outline-dark btn-block" />
      </form>
    );
  }
}

LoginForm.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginForm;
