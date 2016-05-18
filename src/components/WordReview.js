import React, { Component } from 'react';
import { Link } from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import './MyWordList.css';

class WordReview extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      WordList: {wordcards:[]},
      test: []
    };
  }

  handleTest(test){
    const {topic} = test;
    return (
        <div>
          <h4>{topic} {test.selection[0].title} {test.selection[1].title} {test.selection[2].title}</h4>
        </div>
        )
  }
  setWordList(temp){
    this.setState({WordList:temp});
    let countTestNumber = 0;
    let countSelection = 0;
    let index = [0,0,0];
    let checkRepeat = 0;
    for (countTestNumber = 0; countTestNumber<3; countTestNumber++){
      const {WordList, test} = this.state;
      const {wordcards} = WordList;
      const length = wordcards.length;
      for (countSelection = 0; countSelection<3; countSelection ++){
        index[countSelection] = Math.floor(Math.random()*length);
        if(countSelection>0){
          for(checkRepeat = 0; checkRepeat<countSelection; checkRepeat++){
            if(index[countSelection] === index[checkRepeat]){
              countSelection = countSelection-1;
              break;
            }
          }
        }
      }
      this.setState({
        test: test.concat({topic: wordcards[index[0]].name,
          selection: [
            {title: wordcards[index[0]].trans,c: false},
            {title: wordcards[index[1]].trans,c: false},
            {title: wordcards[index[2]].trans,c: false}
          ]})
      })
    }
  }
  handleSelection(item, i, i_test){
    return(
        <div>
          <input
            type = "checkbox"
            checked = {item.c}
            onChange = {this.handleSelectionChecked.bind(this)}
          />
          <label>{item.title}</label>
        </div>
          );
  }
  handleSelectionChecked(event, i, i_test){
    const {test} = this.state;
    test[i_test].selection.splice(i,1,{
      title: test[i_test].selection[i].title,
      c: event.target.checked
    });
    this.setState({
      test: test
    });
  }
  componentDidMount() {
    fetch('/api/mywordlist')
      .then(function(res){return res.json()})
      .then(this.setWordList.bind(this));
  }

  render() {
    const {test} = this.state;
    const {wordcards} = this.state.WordList;
    return (
        <div className="container">
          <h1>Word Review Test</h1>
          {test.map(this.handleTest.bind(this),this)}
          <ul>{test[0].selection.map(this.handleSelection,this,0)}</ul>
          <ul>{test[1].selection.map(this.handleSelection,this,1)}</ul>
          <ul>{test[2].selection.map(this.handleSelection,this,2)}</ul>
        </div>
        );
  }
}


WordReview.propTypes = { test: React.PropTypes.array}

export default WordReview;
