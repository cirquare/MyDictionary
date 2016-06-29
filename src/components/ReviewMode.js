import React, { Component } from 'react';
import { Link } from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import qsort from 'quicksorter';
import date from 'date-and-time';

import './MyWordList.css';

class ReviewMode extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      WordList: {wordcards:[]},
      part0:[],
      part1:[],
      part2:[],
      part3:[]
    };
  }
  
  setReview(temp){
    let part0 = [];
    let part1 = [];
    let part2 = [];
    let part3 = [];

    let cnt = 0;

    let tempSize = 0;
    tempSize = parseInt(temp.wordcards[0].total,10);
    console.log(tempSize);
    
    for(cnt = 0; cnt<tempSize; cnt++){
        if( (cnt%4)===0 ) {
            part0.push(temp.wordcards[cnt]);
        }else if( (cnt%4)===1 ) {
            part1.push(temp.wordcards[cnt]);
        }else if( (cnt%4)===2 ) {
            part2.push(temp.wordcards[cnt]);
        }else if( (cnt%4)===3 ) {
            part3.push(temp.wordcards[cnt]);
        }
    }

    this.setState({
        WordList:temp,
        part0:part0,
        part1:part1,
        part2:part2,
        part3:part3
    });
  }
  
  handleWordList(wordcard){
      const {name, trans} = wordcard;
    return (
        <ul>
            <div className="tooltip review-english"><b> ☞ {name} </b>
                <span className="tooltiptext review-trans">{trans}</span>
            </div>
        </ul>    
    )
  }
  
  componentDidMount() {
    fetch('/api/mywordlist')
      .then(function(res){return res.json()})
      .then(this.setReview.bind(this));

  }

  render() {
    const {wordcards} = this.state.WordList;
    const {part0, part1, part2, part3} = this.state;
    return (
        <div className="container">
          <h1 className="review-title"><b>Review Time</b></h1>
            <div className="homepage-btn-crew">
                <Link to ={'/info'}><button type="button" className="btn btn-info homepage-btn">
                    Info</button></Link> &nbsp;
                <Link to ={'/mywordlist'}><button type="button" className="btn btn-success homepage-btn">
                    My Word List</button></Link> &nbsp;
                <Link to ={'/wordreview'}><button type="button" className="btn btn-warning homepage-btn">
                    Selection Test</button></Link> &nbsp;
                <Link to ={'/wordreview_trans'}><button type="button" className="btn btn-danger homepage-btn">
                    Translation Test</button></Link> &nbsp;
                <Link to ={'/reviewmode'}><button type="button" disabled="disabled "className="btn btn-default btn-change homepage-btn">
                    Review</button></Link>
            </div>
            <div className="row review-top-padding">
              <div className="col-md-3">
                {part0.map(this.handleWordList.bind(this))}
              </div>
              <div className="col-md-3"> 
                {part1.map(this.handleWordList.bind(this))}
              </div>
              <div className="col-md-3">
                {part2.map(this.handleWordList.bind(this))}
              </div>  
              <div className="col-md-3">
                {part3.map(this.handleWordList.bind(this))}
              </div>  
            </div>
        </div>
        );
  }
}

export default ReviewMode;
