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
          <ul>
            <li>
                <span className="wordlist-english"> {name} </span> 
                <span className="wordlist-trans"> {trans} </span>
            </li>
          </ul>  
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
          <h1 className="homepage-title">My Word List</h1>
          <div className="homepage-btn-crew">
          <button type="button" className="homepage-btn">Info</button> &nbsp;
          <button type="button" className="homepage-btn">Designer</button> &nbsp;
          <Link to ={'/wordreview'}><button type="button" className="homepage-btn">Selection Test</button></Link> &nbsp;
          <Link to ={'/wordreview_trans'}><button type="button" className="homepage-btn">Translation Test</button></Link> &nbsp;
          </div>
            <span>
                {wordcards.map(this.handleWordList.bind(this))}
            </span>
        </div>
        );
  }
}

export default MyWordList;
