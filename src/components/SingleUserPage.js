import React, { Component } from 'react';

import './SingleUserPage.css';
import NotFoundPage from './NotFoundPage';

class SingleUserPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user:{},
      found:true
    };
  }

  setUser(temp){
    this.setState({user:temp});
  }

  setFound(){
    this.setState({found:false});
  }
  componentDidMount() {
    fetch(`/api/users/${this.props.params.username}`)
      .then(function(res){
        if(res.status == 404){
          throw res.status;
        }
        return res.json()})
      .then(this.setUser.bind(this))
      .catch(this.setFound.bind(this));
  }


  render() {
    const {user, found} = this.state;
    if(found){
      return (
          <div>
            <div className = "picture">
              <img className = "img-circle" src = {user.photosrc} alt = ""/>
            </div>
            <div className = "block">
              <dl className = "font dl-horizontal">
                <dt>Name</dt>
                <dd>{user.name}</dd>
                <dt>Age</dt>
                <dd>{user.age}</dd>
                <dt>Blood Type</dt>
                <dd>{user.bloodtype}</dd>
                <dt>Interest</dt>
                <dd>{user.interests}</dd>
              </dl>
            </div>
          </div>
          );
    }
    return <NotFoundPage/>;
  }
}

export default SingleUserPage;
