import React, { Component } from 'react';
import { Link } from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import qsort from 'quicksorter';
import date from 'date-and-time';

import './MyWordList.css';


class designer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      WordList: {wordcards:[]},
      English: '',
      Chinese: '',
      ValidInput:true 
    };
  }
    render() {
        const {test, score} = this.state;
        const {wordcards} = this.state.WordList;
        return (
            <div className="container">
                <h1 className="Trans-title"><b>About Designer</b></h1>
            <div className="homepage-btn-crew">
                <Link to ={'/info'}><button type="button" className="btn btn-info homepage-btn">Info</button></Link> &nbsp;
                <Link to ={'/designer'}><button type="button" disabled="disabled" className="btn btn-success homepage-btn">Designer</button></Link> &nbsp;
                <Link to ={'/wordreview'}><button type="button" className="btn btn-warning homepage-btn">Selection Test</button></Link> &nbsp;
                <Link to ={'/wordreview_trans'}><button type="button" className="btn btn-danger homepage-btn">
                    Translation Test</button></Link> &nbsp;
                <Link to ={'/reviewmode'}><button type="button" className="btn btn-default btn-change homepage-btn">Review</button></Link>
            </div>
                <div className="test-foot center">    
                    <Link to ={'/mywordlist'}><button type="button" className="btn btn-info">Back to List</button></Link>
                </div>
            </div>
        );  
    }
}

export default designer;
