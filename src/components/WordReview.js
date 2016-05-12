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
    for (countTestNumber = 0; countTestNumber<3; countTestNumber++){
      const {WordList, test} = this.state;
      const {wordcards} = WordList;
      const length = wordcards.length;
      for (countSelection = 0; countSelection<3; countSelection ++){
        index[countSelection] = Math.floor(Math.random()*length);
      }
      this.setState({
        test: test.concat({topic: wordcards[index[0]].name,
          selection: [
            {title: wordcards[index[0]].trans,c: true},
            {title: wordcards[index[1]].trans,c: false},
            {title: wordcards[index[2]].trans,c: false}
          ]})
      })
    }
  }

  handleWordList(wordcard){
    const {name, trans} = wordcard;
    return (
        <div>
        <li>
        <h4>{name} {trans}</h4>
        </li>
        </div>
        )
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
        </div>
        );
  }
}
WordReview.propTypes = { test: React.PropTypes.array}

export default WordReview;
