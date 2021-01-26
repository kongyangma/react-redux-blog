import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { verifyJwt, signoutUser } from '../actions';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import './css/header.css';

class Header extends Component {

  componentWillMount() {
    if (this.props.authenticated && !this.props.user) {
      this.props.verifyJwt(); // fetch username
    }
  }

  renderLinks() {
    if (this.props.authenticated) {
      // show a dropdown menu for authenticated user
      return (
        <div className="navbar-nav nav-item dropdown ml-auto header-position">
          <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.username}</a>
          <div className="dropdown-menu" aria-labelledby="dropdown02">
            <Link className="dropdown-item" to="/my_posts">Your Posts</Link>
            <Link className="dropdown-item" to="/profile">Your Profile</Link>
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to="/settings">Settings</Link>
            <Link className="dropdown-item" to="/" onClick={this.props.signoutUser}>Sign out</Link>
          </div>
        </div>
      );
    } else {
      // show a link to sign in or sign up
      return (
        <ul className="navbar-nav">
          <li className="nav-item" key={1}>
            <Link className="btn btn-primary" to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item" key={2}>
            <Link className="btn btn-secondary ml-sm-2" to="/signin">Sign In</Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="/">Kongyang's Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search Posts" className="mr-sm-2" />
            <Button type="submit">Search</Button>
          </Form>
          <div className="ml-auto">
            {this.renderLinks()}
          </div>
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username,
  };
}

export default connect(mapStateToProps, { verifyJwt, signoutUser })(Header);


/*

<nav className="navbar navbar-inverse bg-inverse navbar-toggleable-md fixed-top">
  <div className="container">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleContainer" aria-controls="navbarsExampleContainer" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <Link className="navbar-brand" to="/">Kongyang's Blog</Link>
    <div className="collapse navbar-collapse" id="navbarsExampleContainer">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/posts">Posts</Link>
        </li>
      </ul>
      <form className="form-inline my-2 my-md-0">
        <input className="form-control mr-sm-2" type="text" placeholder="Search Post" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

*/
