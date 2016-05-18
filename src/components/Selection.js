import React, { Component } from 'react';
import 'babel-polyfill';
import './MyWordList.css';

class Selection extends Component {
  render(){
    const {index, testNumber, title, c, onChange} = this.props;
    let a = 0;
    if(c)a = 1;
    else a = 0;
    return(
        <div>
          <input
            type = "checkbox"
            checked = {c}
            onChange = {function(event){return onChange(event, index, testNumber)}}
          />
          <label>{title}</label>
        </div>
        );
  }
}
export default Selection;
