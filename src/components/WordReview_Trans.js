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
                test: test.concat({topic: wordcards[index[countTestNumber]].trans,
                                  testID: countTestNumber+1,
                                  answer: wordcards[index[countTestNumber]].name,
                                  userAns: "",
                })
            })
        }
    }

    handleTransTest(test,i){
        const {topic,testID,userAns} = test;
        const questionNumber = test.testID;
        return(
            <div>
            <h4>Question {questionNumber} : {topic}</h4>
            <form name="formName">
            <Translation
                value = {userAns}
                i = {i}
                onChange = {this.handleChange.bind(this)}
            />
            </form>
            </div>
        )
    }

    handleChange(event,i){
        const {test} = this.state;
        const {testID} = test;
        test.splice(i,1,{
            topic: test[i].topic,
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
            if(test[countTestNumber].userAns === test[countTestNumber].answer)  score_temp++;
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
            <h1>Translation Test</h1>
            <small>Please fill the correct translation to the following words.</small>
            <section>{test.map(this.handleTransTest,this)}</section>
            <button type = "button" className = "btn btn-success" onClick = {this.handleTransScore.bind(this)}>submit</button>
            <h4>Score: {score}</h4>
            <Link to ={'/'}><h4>Back to List</h4></Link>
            </div>
        );
    }
}

WordReview_Trans.propTypes = { 
    test: React.PropTypes.array,
    score: React.PropTypes.number
}

export default WordReview_Trans;
