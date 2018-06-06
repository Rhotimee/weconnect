import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';
import { Aux } from '../aux';
import { userSignoutRequest } from '../../actions/userActions';

/**
 * @class LoginForm
 *
 * @classdesc logs in user
 *
 */
class Navbar extends Component {
  /**
   * @description onSignout
   *
   * @param  {object} event  the event
   *
   * @returns {void}
   */
  onSignout(event) {
    event.preventDefault();
    this.props.userSignoutRequest();
    this.context.router.history.push('/');
    alertify.set('notifier', 'position', 'top-right');
    alertify.success('Signed Out Successfully');
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    const { signedInUser } = this.props.signedInUser;
    const Auth = (
      <Aux>
        <li className="nav-item mr-3">
          <Link className="nav-link" to="/add-business" href>Add Business</Link>
        </li>
        { signedInUser ? (
          <div className="dropdown mr-3">
            <Link
              className="nav-link dropdown-toggle"
              to={`/user/${signedInUser.id}`}
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href
            >{signedInUser.firstName}
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to={`/user/${signedInUser.id}`} href>My Profile</Link>
              <Link className="dropdown-item" to={`/user/${signedInUser.id}/update`} href>Update Profile</Link>
              <Link className="dropdown-item" to="#" href>Change Password</Link>
              <Link className="dropdown-item" to="/" onClick={this.onSignout.bind(this)} href>Signout</Link>
            </div>
          </div>
        ) : null}


      </Aux>
    );

    const Guest = (
      <Aux>
        <li className="nav-item">
          <Link className="nav-link" to="/login" href>Log In</Link>
        </li>
        <li className="nav-item mr-2">
          <Link className="nav-link" to="/signup" href>Sign Up</Link>
        </li>
      </Aux>
    );

    return (
      <nav className=" navbar navbar-expand-sm navbar-dark nav-bg py-3">
        <Link className="navbar-brand ml-3" to="/" href>WECONNECT</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/businesses" href><i className="fa fa-th" aria-hidden="true" /> Explore</Link>
            </li>
            {this.props.signedInUser.isAuthenticated ? Auth : Guest }
          </ul>
        </div>
      </nav>
    );
  }
}

/**
   * @description mapStateToProps
   *
   * @param  {object} state  the state
   *
   * @returns {void}
   */
function mapStateToProps(state) {
  return {
    signedInUser: state.userReducer,
  };
}

Navbar.propTypes = {
  userSignoutRequest: PropTypes.func.isRequired,
};

Navbar.contextTypes = {
  router: PropTypes.object.isRequired
};


export default connect(mapStateToProps, { userSignoutRequest })(Navbar);

