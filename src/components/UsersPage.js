import React, { Component } from 'react';
import { Link } from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import './UsersPage.css';

class UsersPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      UserList: {users:[]}
    };
  }

  setUserList(temp){
    this.setState({UserList:temp});
  }

  handleUserList(user){
    return (
        <div className = "text-center">
          <li>
            <Link to={'/users/'+user.name}><h4>{user.name}</h4></Link>
          </li>
        </div>
        )
  }

  componentDidMount() {
    fetch('/api/users')
      .then(function(res){return res.json()})
      .then(this.setUserList.bind(this));

  }

  render() {
    const {users} = this.state.UserList;
    return (
        <div className="container">
          <h1 className = "text-center">User List</h1>
          {users.map(this.handleUserList.bind(this))}
        </div>
        );
  }
}

export default UsersPage;
