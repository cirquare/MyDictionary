import React, { Component } from 'react';
import 'babel-polyfill';
import './MyWordList.css';

class Selection extends Component {
  render(){
    const {index, highlight, testNumber, selectedValue,
      title, onChange, forceChecked, submitted, checked} = this.props;
    var checkORnot = checked;
    if (forceChecked)checkORnot = true;
    if(highlight && submitted){
      return(
        <div className="question">
          <input
            type = "radio"
            name = {testNumber}
            value = {title}
            checked = {checkORnot}
            onChange = {function(event){return onChange(event,index,testNumber)}}
          />
          <label><u>{title}</u></label>
        </div>
        );
    }else{
      return(
        <div className="question">
          <input
            type = "radio"
            name = {testNumber}
            value = {title}
            checked = {checkORnot}
            onChange = {function(event){return onChange(event,index,testNumber)}}
          />
          <label>{title}</label>
        </div>
        );
    }
  }
}
//<label>{`${highlight?'<strong>':''}`}{title}{`${highlight?'</strong>':''}`}<label>
export default Selection;
