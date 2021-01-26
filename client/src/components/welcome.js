import React from 'react';
import { Link } from 'react-router-dom';

import './css/welcome.css';

export default () => (
  <div className="main-body">
    <div className="jumbotron">
      <h1 className="display-3">Welcome!</h1>
      <p>This is a blog system, you can record your ideas here.</p>
      <p><Link className="btn btn-primary btn-lg" to="/posts" role="button">Look the blog posts &raquo;</Link></p>
    </div>

    <div className="row text-justify">
      <div className="col-md-offset-3">
        <p>You can save all your ideas in your account.</p>
      </div>
    </div>
  </div>
);




