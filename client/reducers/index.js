import { combineReducers } from 'redux';
import Businesses from './reducer_businesses';
import userReducer from './user_reducer';
import oneBusiness from './reducer_one_business';
import allReviews from './reducer_reviews';
import oneUser from './reducer_one_user';
import search from './reducer_search';

const rootReducer = combineReducers({
  Businesses,
  userReducer,
  oneBusiness,
  allReviews,
  oneUser,
  search,
});

export default rootReducer;
