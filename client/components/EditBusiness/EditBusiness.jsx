import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditBusinessForm from './EditBusinessForm';
import { fetchOneBusiness, updateOneBusiness } from '../../actions/businessAction';

/**
 * @class BusinessDetails
 *
 * @classdesc Details of business
 *
 */
class EditBusiness extends Component {
/**
   * @description componentDidMount
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.fetchOneBusiness(this.props.match.params.id);
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    if (!this.props.business) {
      return <h2>Loading...</h2>;
    }
    console.log(this.props.business);
    return (
      <div className="add-business-cover">
        <div className="add-business container py-5 text-dark">
          <EditBusinessForm business={this.props.business} updateOneBusiness={updateOneBusiness} />
        </div>
      </div>

    );
  }
}

EditBusiness.propTypes = {
  fetchOneBusiness: PropTypes.func.isRequired,

};

/**
   * @description mapStateToProps
   *
   * @param  {object} state  the state
   *
   * @returns {void}
   */
function mapStateToProps(state) {
  return {
    business: state.oneBusiness.oneBusiness
  };
}

export default connect(mapStateToProps, { fetchOneBusiness, updateOneBusiness })(EditBusiness);
