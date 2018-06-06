import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';
import PropTypes from 'prop-types';
import { fetchOneBusiness, deleteOneBusiness } from '../../actions/businessAction';
import { fetchReviews, addReview } from '../../actions/reviewsAction';
import ReviewCard from './ReviewCard';
import averageReviews from '../../helpers/averageStar';
import stars from '../../helpers/stars';


/**
 * @class BusinessDetails
 *
 * @classdesc Details of business
 *
 */
class BusinessDetails extends Component {
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
      content: '',
      star: '',
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
    this.props.fetchOneBusiness(this.props.match.params.id);
    this.props.fetchReviews(this.props.match.params.id);
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
    this.props.addReview(this.props.match.params.id, this.state).then(() => {
      this.props.fetchReviews(this.props.match.params.id);
      alertify.set('notifier', 'position', 'top-right');
      alertify.success('Reviews Added');
    });
  }


  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    const { business, user, reviews } = this.props;
    const { id } = this.props.match.params;


    if (!business) {
      return <h2>Loading...</h2>;
    }

    const eachReview = reviews.map(review => (
      <ReviewCard
        id={review.id}
        key={review.id}
        content={review.content}
        star={review.star}
        reviewer={review.reviewer}
        userId={review.userId}
      />
    ));


    return (
      <div className="bg-cover">
        <div className="container mb-4" id="business-detail">
          <div className="row">

            <div className="card col px-0">
              <img
                className="card-img-top img-overlay"
                src={business.businessImage === '' ? 'http://res.cloudinary.com/timi/image/upload/v1527485880/dummylogo4.jpg' : business.businessImage}
                alt=""
                height="300px;"
              />
              <div className="card-img-overlay ">
                <a className="h1 text-white card-title" href="#">{business.name}</a>
              </div>

              <div className="card-body text-dark bg-light">
                <div className="data">
                  <div className="row data1 ml-1">
                    <div className="p-1">
                      <img src="img/bg3.jpg" alt="" height="75px" width="120px" />
                    </div>
                    <div className="p-1">
                      <h3 className="">{business.category}</h3>
                      <p><i className="fa fa-map-marker" /> {business.location}</p>
                    </div>
                  </div>

                  {
                  business.userId === user ?
                    <div>
                      <Link to={`/businesses/${id}/edit`} href>edit</Link>
                    -
                      <Link
                        to="/businesses"
                        href
                        onClick={() => {
                        this.props.deleteOneBusiness(id);
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success('Business deleted Successfully');
                        }
                      }
                      >delete
                      </Link>
                    </div>
                : null
              }

                  <div className="row data2 mt-3 ml-4">
                    <button className="btn btn-outline-dark mr-2 like"> Like <i className="fa fa-heart" /></button>
                  </div>

                </div> {/** end data * */}

                <div className="row mt-2">
                  <p className="col-md-6">
                    {business.details}
                  </p>
                  <img className="col-md-6" width="500" src={`https://maps.googleapis.com/maps/api/staticmap?center=${business.location}&zoom=13&scale=2&size=600x50&maptype=roadmap&format=png&visual_refresh=true&markers=size:small%7Ccolor:0xff682e%7Clabel:1%7Cikeja+lagos`} alt="Google Map of ikeja lagos" />
                </div>

                <div className="review">
                  <hr className="straight" />
                  <div className="row">
                    <div className="col star">
                      { stars(averageReviews(reviews)) }
                      <span className="rate">
                        {averageReviews(reviews)}
                      </span>
                      ({reviews.length} Reviews)
                    </div>
                    <div className="col like">
                      5 likes <i className="fa fa-heart" />
                    </div>
                    <div className="col">
                        Business Owner: <Link to={`/user/${business.userId}`} href >{business.business_owner.firstName}</Link>
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <hr className="straight" />

                <form onSubmit={this.onSubmit}>
                  <h5 className="my-3">Add Review</h5>
                  <div className="row">
                    <div className="form-group col">
                      <label htmlFor="title">Review <small>*</small> </label>
                      <textarea
                        type="text"
                        className="form-control"
                        required
                        value={this.state.content}
                        onChange={this.onChange}
                        name="content"
                      />
                    </div>
                    <div className="form-group col">
                      <label htmlFor="inputState">Star <small>*</small> </label>
                      <select
                        id="inputState"
                        className="form-control"
                        value={this.state.star}
                        onChange={this.onChange}
                        name="star"
                      >
                        <option value="" disabled>choose star</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                  <div className="">
                    <button className="btn btn-outline-dark ml-3" type="submit">Submit</button>
                  </div>
                </form>

                <hr className="straight" />

                <div className="all-reviews">

                  { eachReview }

                </div>
              </div> {/** end card-body * */}

            </div>
          </div>
        </div>

      </div>
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
    business: state.oneBusiness.oneBusiness,
    user: state.userReducer.signedInUser.id,
    reviews: state.allReviews.allReviews,
  };
}

BusinessDetails.propTypes = {
  fetchOneBusiness: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  deleteOneBusiness: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  fetchOneBusiness, deleteOneBusiness, fetchReviews, addReview
})(BusinessDetails);
