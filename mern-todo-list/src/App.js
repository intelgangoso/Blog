import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateBlog from "./components/create-blog.component";
import EditBlog from "./components/edit-blog.component";
import BlogsList from "./components/blogs-list.component";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          
          <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
            <a className="navbar-brand" href="https://github.com/intelgangoso" target="_blank">
              <img src={logo} width="30" height="30" alt="https://github.com/intelgangoso" />
            </a>
            <Link to="/" className="navbar-brand">My Sample Blog App</Link>
            <div className="">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Blogs</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Blog</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={BlogsList} />
          <Route path="/edit/:id" component={EditBlog} />
          <Route path="/create" component={CreateBlog} />
        </div>
      </Router>
    );
  }
}

export default App;