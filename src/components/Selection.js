import React, { Component } from 'react';
import 'babel-polyfill';
import './MyWordList.css';

class Selection extends Component {
  render(){
    const {index, testNumber, selectedValue,
      title, onChange, checked} = this.props;
    return(
        <div>
          <input
            type = "radio"
            name = {testNumber}
            value = {title}
            onChange = {function(event){return onChange(event,index,testNumber)}}
          />
          <label>{title}</label>
        </div>
        );
  }
}
export default Selection;
