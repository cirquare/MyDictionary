import React, { Component } from 'react';
import { Link } from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import Translation from './Translation';
import './MyWordList.css';


class WordReview_Trans extends Component {
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
        while(index[0] === index[1] || index[1] === index[2] || index[0] === index[2]){
            const { WordList, test } = this.state;
            const { wordcards } = WordList;
            const length = wordcards.length;
            for (countTestNumber = 0; countTestNumber<3; countTestNumber++){
                index[countTestNumber] = Math.floor(Math.random()*length);
            }
        }
        for (countTestNumber = 0; countTestNumber<3; countTestNumber++){
            const { WordList, test } = this.state;
            const { wordcards } = WordList;
            const length = wordcards.length;
            this.setState({
                test: test.concat({
                  topic: wordcards[index[countTestNumber]].trans,
                  testID: countTestNumber+1,
                  highlightQ: false,
                  submitted: false,
                  answer: wordcards[index[countTestNumber]].name,
                  userAns: "",
                })
            })
        }
    }

    handleTransTest(test,i){
        const {topic,testID,userAns,submitted,highlightQ} = test;
        const questionNumber = test.testID;
        if(submitted && highlightQ){
          return(
            <div>
              <h4 className ="text-warning question-warn"><b>Question {questionNumber} : {topic}</b></h4>
              <form name="formName" className="Trans-blank">
                <Translation
                  value = {userAns}
                  i = {i}
                  disabled = {submitted}
                  onChange = {this.handleChange.bind(this)}
                />
              </form>
              <br/>
            </div>
          )
        }else{
          return(
            <div>
              <h4 className="question">Question {questionNumber} : {topic}</h4>
              <form name="formName" className="Trans-blank">
                <Translation
                  value = {userAns}
                  i = {i}
                  disabled = {submitted}
                  onChange = {this.handleChange.bind(this)}
                />
              </form>
              <br/>
            </div>
          )
        }
    }

    handleChange(event,i){
        const {test} = this.state;
        const {testID} = test;
        test.splice(i,1,{
            topic: test[i].topic,
            highlightQ: test[i].highlightQ,
            submitted: test[i].submitted,
            testID: test[i].testID,
            answer: test[i].answer,
            userAns: event.target.value
        });
        this.setState({
            test :test
        });
    }

    handleTransScore(){
        const {test ,score, userInput} = this.state;
        let score_temp = 0;
        let countTestNumber = 0;
        for(countTestNumber = 0; countTestNumber< 3; countTestNumber++){
            if(test[countTestNumber].userAns === test[countTestNumber].answer){
              score_temp++;
              test.splice(countTestNumber,1,{
                topic: test[countTestNumber].topic,
                testID: test[countTestNumber].testID,
                highlightQ: false,
                submitted: true,
                answer: test[countTestNumber].answer,
                userAns: test[countTestNumber].userAns,
              })
            }else{
              test.splice(countTestNumber,1,{
                topic: test[countTestNumber].topic,
                testID: test[countTestNumber].testID,
                highlightQ: true,
                submitted: true,
                answer: test[countTestNumber].answer,
                userAns: test[countTestNumber].userAns,
              })
              
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
                <h1 className="Trans-title"><b>Translation Test</b></h1>
            <div className="homepage-btn-crew">
                <Link to ={'/info'}><button type="button" className="btn btn-info homepage-btn">Info</button></Link> &nbsp;
                <Link to ={'/designer'}><button type="button" className="btn btn-success homepage-btn">Designer</button></Link> &nbsp;
                <Link to ={'/wordreview'}><button type="button" className="btn btn-warning homepage-btn">Selection Test</button></Link> &nbsp;
                <Link to ={'/wordreview_trans'}><button type="button" disabled="disabled"className="btn btn-danger homepage-btn">
                    Translation Test</button></Link> &nbsp;
                <Link to ={'/reviewmode'}><button type="button" className="btn btn-default btn-change homepage-btn">Review</button></Link>
            </div>
                <br/>
                <small className="Trans-subtitle">Please fill the correct translation to the following words.</small>
                <br/><br/>
                    <section>{test.map(this.handleTransTest,this)}</section>
                <br/><br/>
                <h4 className="test-foot">Score: {score}</h4>
                <div className="test-foot">    
                    <button type="button" className="btn btn-success" onClick = {this.handleTransScore.bind(this)}>submit</button> &nbsp;
                    <button type="button" className="btn btn-danger" onClick =""> Reset </button> &nbsp;
                    <Link to ={'/mywordlist'}><button type="button" className="btn btn-info">Back to List</button></Link>
                </div>
            </div>
        );
    }
}

WordReview_Trans.propTypes = { 
    test: React.PropTypes.array,
    score: React.PropTypes.number
}

export default WordReview_Trans;
