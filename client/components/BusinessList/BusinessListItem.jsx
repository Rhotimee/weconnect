import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const listBusinesses = ({ business }) => (
  <div
    className="card col-sm-3 px-0"
  >
    <img
      className="card-img-top img-overlay"
      src={business.businessImage === '' ? 'http://res.cloudinary.com/timi/image/upload/v1527485880/dummylogo4.jpg' : business.businessImage}
      alt=""
    />
    <div className="card-img-overlay">
      <Link to={`/businesses/${business.id}`} href className="h2 text-white card-title px-2">{business.name}</Link>
    </div>
    <div className="card-body text-dark bg-light">
      <p className="card-text">{business.details}</p>
      <div className="star">
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <span className="rate mr-2">5.0 </span>
        <span>(2 Reviews)</span>
      </div>
    </div>
  </div>
);

listBusinesses.prototype = {
  business: PropTypes.object.isRequired
};

export default listBusinesses;
