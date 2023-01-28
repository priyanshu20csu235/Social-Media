import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App.js";
import { Provider } from 'react-redux';
import './index.css'

// import {legacy_createStore as createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import { applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js';

const store = configureStore({ reducer: reducers }, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>

    , document.getElementById("root"));