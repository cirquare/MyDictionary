import React, {Component} from 'react';
import './MyWordList.css';

class WordItem extends React.Component {
  render(){
    const {index, title, completeYet, onChange, onDestroy} = this.props;
    return (
        <li>
          <div className = "view">
            <input 
              className = "toggle"
              type = "checkbox"
              onChange = {(event) => onChange(event, index)}
            />
            <label>{title}</label>
          </div>
        </li>
        );
  }
}

WordItem.propTypes = {
  title: React.PropTypes.string,
  completeYet: React.PropTypes.bool
};
export default WordItem;
