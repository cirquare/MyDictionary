import React, { Component } from 'react';
import 'babel-polyfill';
import './MyWordList.css';

class Selection extends Component {
  render(){
    const {index, testNumber, testID, selectedValue,
      title, onChange, checked} = this.props;
    return(
        <div>
          <input
            type = "radio"
            name = {testID}
            value = {title}
          />
          <label>{title}</label>
        </div>
        );
  }
}
export default Selection;
