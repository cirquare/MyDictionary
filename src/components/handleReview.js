import React, { Component } from 'react';
import 'babel-polyfill';
import './MyWordList.css';

class handleReview extends Component {
  render(){
      console.log("AHHHH");
    const { name, trans } = this.props;
    return(
            <div className="tooltip wordlist-english"> {name}
                <span className="tooltiptext wordlist-trans"> {trans} </span>
            </div>
    );
  
  }
}
export default handleReview;

