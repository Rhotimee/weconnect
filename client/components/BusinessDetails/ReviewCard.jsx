import React from 'react';
import { Link } from 'react-router-dom';
import stars from '../../helpers/stars';

const ReviewCard = ({
  content, star, reviewer, userId, businessId
}) => (
  <div className="card">
    <div className="row card-body">
      <div className="review-user p-2 text-center col-md-2">
        <img className="rounded-circle" src="img/user2.jpg"width="120" height="100" alt="" />
        <div className="caption mt-1">
          {/* i did this because of the dashboard. it  doesn't have reviewr */}
          { reviewer !== undefined ?
            <small><Link to={`/user/${userId}`} href>{reviewer.firstName}</Link></small>
          : null
        }
        </div>
      </div>
      <div className="ml-3 review-text card-text align-self-center col-md">
        <div className=" star align-self-center">
          { stars(star) }

        </div>
        <p className="mt-2">{content}</p>
      </div>
      {/* this is for dashboard. */}
      { businessId !== undefined ?
        <small className="ml-4"><Link to={`/businesses/${businessId}`} href>Go To Business</Link></small>
          : null
        }
    </div>
  </div>

);

export default ReviewCard;
