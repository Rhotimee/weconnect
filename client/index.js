import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import jwt from 'jsonwebtoken';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Routes from './Routes';
import './styles/style.scss';
import reducers from './reducers';
import setAuthToken from './helpers/setAuthToken';
import { setCurrentUser } from './actions/userActions';


const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.userToken) {
  setAuthToken(localStorage.userToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.userToken)));
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
