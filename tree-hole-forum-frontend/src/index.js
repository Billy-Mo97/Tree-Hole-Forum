import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppRouter} from './router';
import './axios';

//Define the main root of front-end
ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);