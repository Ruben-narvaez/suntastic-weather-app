import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ScrollToTop from './components/pages/scrollToTop/ScrollToTop'

import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById('root')
)