import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListBusiness from './BusinessListItem';
import { fetchBusinesses } from '../../actions/businessAction';

/**
 * @class BusinessList
 *
 * @classdesc List all businesses
 *
 */
class BusinessList extends Component {
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
      text: this.props.search,
      type: this.props.type,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description componentDidMount
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.fetchBusinesses(this.state.type, this.state.text);
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
    // this.setState({ errors: {}, isLoading: true });
    this.props.fetchBusinesses(this.state.type, this.state.text);
  }

  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    const eachBusiness = this.props.businesses.map(business => (
      <ListBusiness
        key={business.id}
        business={business}
      />
    ));

    return (
      <div className="bg-cover" >
        <div className="list-cover">

          <form
            action=""
            className="container bg-search py-5 sticky-top"
            onSubmit={this.onSubmit}
          >
            <div className="row mx-4 ">
              <div className="col-md-6 px-1 my-1">
                <input
                  name="text"
                  type="text"
                  className="b-name form-control form-control-lg"
                  placeholder="I'm looking for..."
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-4 px-1 my-1">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-light" id="basic-addon1"> <i className="fa fa-map-marker" /> </span>
                  </div>
                  <select
                    className="form-control form-control-lg"
                    onChange={this.onChange}
                    name="type"
                  >
                    <option defaultValue>Choose...</option>
                    <option value="location">Location</option>
                    <option value="category">Category</option>

                  </select>

                </div>
              </div>
              <div className="col-md-2 px-1 my-1">
                <button className="form-control form-control-lg btn-dark search" type="submit" onSubmit={this.onSubmit}> <i className="fa fa-search" />  Search</button>
              </div>
            </div>
          </form>

          <div className="mx-4"id="business-list">
            <div className="row justify-content-center">
              {eachBusiness}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

BusinessList.propTypes = {
  search: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fetchBusinesses: PropTypes.func.isRequired,
};

BusinessList.contextTypes = {
  router: PropTypes.object.isRequired
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
    businesses: state.Businesses.allBusinesses,
    search: state.search.search,
    type: state.search.type,
  };
}

export default connect(mapStateToProps, { fetchBusinesses })(BusinessList);
