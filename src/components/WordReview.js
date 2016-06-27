import React, { Component } from 'react';
import { Link } from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import Selection from './Selection'
import './MyWordList.css';

class WordReview extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      WordList: {wordcards:[]},
      test: [],
      score: 0,
    };
  }

  setWordList(temp){
    this.setState({WordList:temp});
  }
  setTest(temp){
    let countTestNumber = 0;
    let countSelection = 0;
    let index = [0,0,0];
    let checkRepeat = 0;
    let shuffleSelection = 0;
    for (countTestNumber = 0; countTestNumber<3; countTestNumber++){
      const {WordList, test} = this.state;
      const {wordcards} = WordList;
      const length = wordcards.length;
      index = [0,0,0];
      while(index[0] === index[1] || index[1] === index[2] || index[0] === index[2]){
        for (countSelection = 0; countSelection<3; countSelection ++){
          index[countSelection] = Math.floor(Math.random()*length);
        }
      }
      shuffleSelection = Math.floor(Math.random()*3);
      this.setState({
        test: test.concat({
          topic: wordcards[index[shuffleSelection]].name,
          answer: wordcards[index[shuffleSelection]].trans,
          selectedValue: wordcards[index[0]].trans,
          selection: [
            {title: wordcards[index[0]].trans,checked:false,testNumber:countTestNumber},
            {title: wordcards[index[1]].trans,checked:false,testNumber:countTestNumber},
            {title: wordcards[index[2]].trans,checked:false,testNumber:countTestNumber}
          ]
        })
      })
    }
  }
  handleTest(test, i){
    const {topic, selection, selectedValue} = test;
    const questionNumber = i + 1;
    return(
        <div>
          <h4>Question {questionNumber}: {topic}</h4>
          <ul>{selection.map(this.handleSelectionList,this)}</ul>
        </div>
        );
  }
  handleSelectionList(oneSelection,i){
    const {title, testNumber, checked} = oneSelection;
    const {selectedValue} = this.state.test[testNumber];
    return(
        <Selection
          index = {i}
          testNumber = {testNumber}
          checked = {checked}
          selectedValue = {selectedValue}
          title = {title}
          onChange = {this.handleSelectionChecked.bind(this)}
        />
        );
  }
  handleSelectionChecked(event, i, testNumber){
    const {test} = this.state;
    //test[testNumber].selectedValue = event.target.checked;
    test.splice(testNumber,1,{
      topic: test[testNumber].topic,
      answer: test[testNumber].answer,
      selectedValue: event.target.value,
      selection: test[testNumber].selection
    });
    //console.log(test[testNumber].selectedValue);
    //console.log(test[testNumber].answer);
    /*
    test[testNumber].selection.splice(i,1,{
      title:test[testNumber].selection[i].title,
      checked:event.target.checked,
      testNumber:test[testNumber].selection[i].testNumber
    })
    console.log(test[testNumber].selection[i].checked);
    console.log(test[testNumber].selection[0].checked);
    */
    this.setState({
      test: test
    });
  }
  handleScore(){
    const {test, score} = this.state;
    let score_temp = 0;
    let countTopic = 0;
    for(countTopic = 0; countTopic<3; countTopic++){
      const {selectedValue, answer} = test[countTopic];
      if(selectedValue === answer){
        score_temp = score_temp + 1;
      }else{
        
      }
    }
    if(score_temp === 0)score_temp = 0;
    else if(score_temp === 1)score_temp = 60;
    else if(score_temp === 2)score_temp = 80;
    else if(score_temp === 3)score_temp = 100;
    else score_temp = -1;

    this.setState({
      score: score_temp
    });
  }
  componentDidMount() {
    fetch('/api/mywordlist')
      .then(function(res){return res.json()})
      .then(this.setWordList.bind(this))
      .then(this.setTest.bind(this))
  }

  render() {
    const {test, score} = this.state;
    const {wordcards} = this.state.WordList;
    return (
        <div className="container">
          <h1>Word Review Test</h1>
          <small>Please select the correct translation to the following words.</small>
          <section>{test.map(this.handleTest,this)}</section>
          <button type = "button" className = "btn btn-success" onClick = {this.handleScore.bind(this)}>submit</button>
          <h4>Score: {score}</h4>
          <Link to ={'/'}><h4>Back to List</h4></Link>
        </div>
        );
  }
}

WordReview.propTypes = {
  WordList: React.PropTypes.object,
  test: React.PropTypes.array,
  score: React.PropTypes.number
}

export default WordReview;
