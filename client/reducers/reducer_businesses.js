const initialState = { allBusinesses: [] };

const BusinessReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_BUSINESSES':
      return { allBusinesses: action.payload };
    default:
      return state;
  }
};

export default BusinessReducer;

