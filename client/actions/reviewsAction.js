import axios from 'axios';

export function allReviews(reviews) {
  return {
    type: 'FETCH_REVIEWS',
    payload: reviews
  };
}

export const fetchReviews = id => (
 (dispatch) => {
  return axios.get(`/api/v1/businesses/${id}/reviews`)
  .then((response) => {
    dispatch(allReviews(response.data.reviews));
  })
 });

export const addReview = (id, userData) => (
  (dispatch) => {
    return axios.post(`/api/v1/businesses/${id}/reviews`, userData)
  .then(response => response.data.review
  )
  });

