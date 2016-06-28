import React, { Component } from 'react';
import { Link } from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import './MyWordList.css';

class ReviewMode extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      WordList: {wordcards:[]}
    };
  }
  
  setReview(temp){
    this.setState({WordList:temp});
  }
  
  handleWordList(wordcard){
    const {name, trans} = wordcard;
    return (
        <div>
          <ul>
            <li>
                <div className="tooltip wordlist-english"> {name}
                    <span className="tooltiptext wordlist-trans">{trans}</span>
                </div>
            </li>
          </ul>  
        </div>
        )
  }
  
  componentDidMount() {
    fetch('/api/reviewmode')
      .then(function(res){return res.json()})
      .then(this.setReview.bind(this));

  }



  render() {
    const {wordcards} = this.state.WordList;
    return (
        <div className="container">
          <h1 className="homepage-title"><b>Review Time</b></h1>
            <div className="homepage-btn-crew">
                <button type="button" className="btn btn-info homepage-btn">Info</button> &nbsp;
                <button type="button" className="btn btn-success homepage-btn">Designer</button> &nbsp;
                <Link to ={'/wordreview'}><button type="button" className="btn btn-warning homepage-btn">Selection Test</button></Link> &nbsp;
                <Link to ={'/wordreview_trans'}><button type="button" className="btn btn-danger homepage-btn">Translation Test</button></Link> &nbsp;
                <Link to ={'/reviewmode'}><button type="button" disabled="disabled "className="btn btn-default btn-change homepage-btn">
                    Review</button></Link>
            </div>
            
            <span>
                {wordcards.map(this.handleWordList.bind(this))}
            </span>
        </div>
        );
  }
}

export default ReviewMode;
