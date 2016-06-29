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
      TopTenCards: [],
      NewTenCards: []  
    };
  }
  
  setReview(temp){
    let arr = [];
    let topten = [];
    let newten = [];

    let ayear = '';
    let amonth = '';
    let aday = ''; 
    let ahour = '';
    let aminute = '';
    let asecond = '';

    let byear = '';
    let bmonth = '';
    let bday = ''; 
    let bhour = '';
    let bminute = '';
    let bsecond = '';

    let cnt = 0;
    let ten = 0;
    let inv = 0;

    let tempSize = 0;
    tempSize = parseInt(temp.wordcards[0].total,10);

    for(cnt = 0; cnt<tempSize; cnt++){
        arr.push(temp.wordcards[cnt]);
    } //wait to sort 

    for(ten = 0; ten<10; ten++){
        topten.push(temp.wordcards[cnt]);
        newten.push(temp.wordcards[cnt]);
    } //top ten,new ten init array

    console.log("TYPETEN");
    console.log(typeof(topten));
    console.log("TEMPPP");
    console.log(typeof(temp));

    qsort(arr, function(a,b){
        var at = 0;
        var bt = 0;
        at = parseInt(a.testTime,10);
        bt = parseInt(b.testTime,10);
        return at < bt ? -1 : at > bt ? 1 : 0
    })

    for(cnt = tempSize-1, inv=0; cnt>tempSize-11, inv<10; cnt--,inv++){
        topten.splice(inv,1,arr[cnt]);
    } //top ten highest testTime array sorted

    /////////////////////////////////////////////////////////////////////

    qsort(arr, function(a,b){
        var tp1 = date.parse(a.updateTime,'YYYY/MM/DD HH:mm:ss');
        var tp2 = date.parse(b.updateTime,'YYYY/MM/DD HH:mm:ss');

        ayear = date.format(tp1,'YYYY');
        byear = date.format(tp2,'YYYY');
        amonth = date.format(tp1,'MM');
        bmonth = date.format(tp2,'MM');
        aday = date.format(tp1,'DD');
        bday = date.format(tp2,'DD');
        ahour = date.format(tp1,'HH');
        bhour = date.format(tp2,'HH');
        aminute = date.format(tp1,'mm');
        bminute = date.format(tp2,'mm');
        asecond = date.format(tp1, 'ss');
        bsecond = date.format(tp2, 'ss');
        
        return (ayear<byear) ? -1 : (ayear>byear) ? 1 : ((amonth<bmonth) ? -1 : (amonth>bmonth) ? 1 : ((aday<bday) ? -1 : (aday>bday) ? 1 : ((ahour<bhour) ? -1 : (ahour>bhour) ? 1 : ((aminute<bminute) ? -1 : (aminute>bminute) ? 1 : ((asecond<bsecond) ? -1 :(asecond>bsecond) ? 1 : 0)))))
    })

    for(cnt = tempSize-1, inv=0; cnt>tempSize-11, inv<10; cnt--,inv++){
        newten.splice(inv,1,arr[cnt]);
    } //new ten highest testTime array sorted


    console.log("TOP");
    console.log(topten);
    console.log("NEW");
    console.log(newten);

    this.setState({
        WordList:temp,
        TopTenCards:topten,
        NewTenCards:newten
    });
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
    fetch('/api/mywordlist')
      .then(function(res){return res.json()})
      .then(this.setReview.bind(this));

  }

  render() {
    const {wordcards} = this.state.WordList;
    const {TopTenCards, NewTenCards} = this.state;
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
            <div className="row">
              <div className="col-md-3"></div> 
              <div className="col-md-4 top-ten-title"> Top Ten Difficult 
                    {TopTenCards.map(this.handleWordList.bind(this))}</div>
              <div className="col-md-5 top-ten-title"> Top Ten New 
                    {NewTenCards.map(this.handleWordList.bind(this))}</div>
            </div>
        </div>
        );
  }
}

export default ReviewMode;
