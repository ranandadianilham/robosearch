import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {Provider} from 'react-redux';
//import App from './App';
import {createStore} from "redux";
import App from './containers/App';//all child parent component
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import {searchRobots} from "./reducers";

const store = createStore(searchRobots);

ReactDOM.render(
    <Provider store={store}>
  <App/>
    </Provider>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
