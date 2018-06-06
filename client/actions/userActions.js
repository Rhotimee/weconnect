import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';
import jwt from 'jsonwebtoken';

export function setCurrentUser(user) {
  return {
    type: 'CURRENT_USER',
    signedInUser: user
  };
}

export function oneUser(business) {
  return {
    type: 'FETCH_ONE_USER',
    payload: business
  };
}

export function userSignupRequest(userData) {
  return dispatch => axios.post('/api/v1/auth/signup', userData).then((response) => {
    const { token } = response.data;
    localStorage.setItem('userToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });
}

export function userSigninRequest(userData) {
  return dispatch => axios.post('/api/v1/auth/login', userData).then((response) => {
    const { token } = response.data;
    localStorage.setItem('userToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });
}

export const userSignoutRequest = () => (dispatch) => {
  localStorage.removeItem('userToken');
  setAuthToken();
  dispatch(setCurrentUser());
};

export const fetchOneUser = id => dispatch => axios.get(`/api/v1/users/${id}`).then((response) => {
  dispatch(oneUser(response.data.user));
});

export const updateUserDetails = (id, userData) => dispatch => axios.put(`/api/v1/users/${id}`, userData).then(response => response.data.business);
