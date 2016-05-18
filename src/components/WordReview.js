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
      test: [],
      score: 0
    };
  }

  handleTest(test, i){
    const {topic, selection} = test;
    return (
        <div>
          <h4>{topic} {selection[0].title} {selection[1].title} {selection[2].title}</h4>
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
  handleTest2(test, i){
    const {topic, selection} = test;
    return(
        <div>
          <h4>{topic}</h4>
          <ul>{selection.map(this.handleSelection,this, i)}</ul>
        </div>
        );
  }
  handleSelection(oneSelection, i, i_topic){
    const {title, c} = oneSelection;
    return(
        <div>
          <input
            type = "checkbox"
            checked = {c}
            onChange = {this.handleSelectionChecked.bind(this, i_topic)}
          />
          <label>{title}</label>
        </div>
          );
  }
  handleSelectionChecked(event, i, i_topic){
    const {test} = this.state;
    test[i_topic].selection.splice(i,1,{
      title: test[i_topic].selection[i].title,
      c: event.target.checked
    });
    this.setState({
      test: test
    });
  }
  handleAnswer(){
    const {test, score} = this.state;
    let score_temp = 0;
    let countTopic = 0;
    for(countTopic = 0; countTopic<3; countTopic++){
      if(test[countTopic].selection[0].c)score_temp++;
    }
    if(score_temp === 0)score_temp = 0;
    else if(score_temp === 1)score_temp = 60;
    else if(score_temp === 2)score_temp = 80;
    else if(score_temp === 2)score_temp = 100;
    else score_temp = -1;

    this.setState({
      score: score_temp
    });
  }
  componentDidMount() {
    fetch('/api/mywordlist')
      .then(function(res){return res.json()})
      .then(this.setWordList.bind(this));
  }

  render() {
    const {test, score} = this.state;
    const {wordcards} = this.state.WordList;
    return (
        <div className="container">
          <h1>Word Review Test</h1>
          {test.map(this.handleTest,this)}
          {test.map(this.handleTest2,this)}
          <button onclick = {this.handleAnswer.bind(this)}>submit</button>
          <h4>{score}</h4>
        </div>
        );
  }
}


WordReview.propTypes = { test: React.PropTypes.array}

export default WordReview;
