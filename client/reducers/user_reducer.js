import isEmpty from 'lodash/isEmpty';


const initialState = {
  isAuthenticated: false,
  signedInUser: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CURRENT_USER':
      return {
        isAuthenticated: !isEmpty(action.signedInUser),
        signedInUser: action.signedInUser
      };
    default:
      return state;
  }
};

