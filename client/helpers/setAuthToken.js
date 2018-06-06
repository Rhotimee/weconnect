import axios from 'axios';

/**
   * @description onChange
   *
   * @param  {object} token  the token
   *
   * @returns {void}
   */
export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}
