import React, { Component } from 'react';
import { Link } from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import qsort from 'quicksorter';
import date from 'date-and-time';

import './MyWordList.css';


class info extends Component {
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
                <h1 className="info-title"><b>Information</b></h1>
                <div className="homepage-btn-crew">
                    <Link to ={'/info'}><button type="button" disabled="disabled" className="btn btn-info homepage-btn">
                        Info</button></Link> &nbsp;
                    <Link to ={'/mywordlist'}><button type="button" className="btn btn-success homepage-btn">
                        My Word List</button></Link> &nbsp;
                    <Link to ={'/wordreview'}><button type="button" className="btn btn-warning homepage-btn">
                        Selection Test</button></Link> &nbsp;
                    <Link to ={'/wordreview_trans'}><button type="button" className="btn btn-danger homepage-btn">
                        Translation Test</button></Link> &nbsp;
                    <Link to ={'/reviewmode'}><button type="button" className="btn btn-default btn-change homepage-btn">
                        Review</button></Link>
                </div>
                <h3 className="info-article">Welcome to 'My E-Dictionary !'</h3>
                <section>
                    <p className='info-inline-1'>Studying for vocabulary words can be interesting !</p>
                    <p className='info-inline-2'>My E-Dictionary can be your best choice! Use it wisely.</p>
                </section>
                <div className="row">    
                   <div className="col-md-3"/>
                   <div className="col-md-3 pic-padd-top-one"> 
                        <section><img width="200" height="200" className="img-circle" src="../../public/des1.jpg"/></section>
                        <div className="profile">
                            <p>臺大電機三年級</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 蔡睿庭</p>
                        </div> 
                   </div>
                   <div className="col-md-3 pic-padd-top-one">
                        <section><img width="200" height="200" className="img-circle" src="../../public/des2.jpg"/></section>
                        <div className="profile">
                            <p>臺大電機三年級</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 林圓方</p>
                        </div> 
                   </div>
                   <div className="col-md-3"/>
                </div>
            </div>

        );  
    }

}

export default info;

