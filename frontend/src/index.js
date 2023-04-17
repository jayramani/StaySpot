import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routesy from './routes';


ReactDOM.render(

  <Router >
  <div>
    <Routesy/>
  </div>
  </Router>
 ,
  document.getElementById('master-container')
);
