import React, { Component } from 'react';
import { Link } from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import './MyWordList.css';

class MyWordList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      WordList: {wordcards:[]}
    };
  }

  setWordList(temp){
    this.setState({WordList:temp});
  }

  handleWordList(wordcard){
    const {name, trans} = wordcard;
    return (
        <div>
          <li>
            <h4>{name} {trans}</h4>
          </li>
        </div>
        )
  }

  componentDidMount() {
    fetch('/api/mywordlist')
      .then(function(res){return res.json()})
      .then(this.setWordList.bind(this));

  }

  render() {
    const {wordcards} = this.state.WordList;
    return (
        <div className="container">
          <h1>My Word List</h1>
          <Link to ={'/wordreview'}><h4>Selection Test</h4></Link>
          <Link to ={'/wordreview_trans'}><h4>Translation Test</h4></Link>
          {wordcards.map(this.handleWordList.bind(this))}
        </div>
        );
  }
}

export default MyWordList;
