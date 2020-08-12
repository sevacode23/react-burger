import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import burgerReducer from './store/reducers/burger'
import sessionOrderReducer from './store/reducers/sessionOrder'
import ordersReducer from './store/reducers/orders'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  burger: burgerReducer,
  sessionOrder: sessionOrderReducer,
  orders: ordersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
