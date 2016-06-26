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
            userInput: '',
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
        //let shuffleSelection = 0;
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
            //shuffleSelection = Math.floor(Math.random()*3);
            this.setState({
                test: test.concat({topic: wordcards[index[countTestNumber]].trans,
                                  /*selection: [
                                    {title: wordcards[index[0]].trans,c: false,testNumber:countTestNumber},
                                    {title: wordcards[index[1]].trans,c: false,testNumber:countTestNumber},
                                    {title: wordcards[index[2]].trans,c: false,testNumber:countTestNumber}
                                    ],*/
                                  testID: countTestNumber+1,
                                  answer: wordcards[index[countTestNumber]].name,
                                  userAns: wordcards[index[countTestNumber]].name,
                })
            })
        }
    }
    handleTest(test, i){
        const {topic, selection} = test;
        const questionNumber = selection[0].testNumber + 1;
        return(
            <div>
            <h4>Question {questionNumber} : {topic}</h4>
            <ul>{selection.map(this.handleSelectionList,this)}</ul>
            </div>
        );
    }

    /*******************/

    handleTransTest(test,i){
        const {topic,testID,userAns} = test;
        let {userInput} = this.state;
        //const questionNumber = selection[0].testNumber + 1;
        const questionNumber = test.testID;
        return(
            <div>
            <h4>Question {questionNumber} : {topic}</h4>
            <form name="formName">
            <input type="text" size="20" id="input" placeholder='請輸入對應英文'onChange={this.handleChange.bind(userInput,this)} />
            </form>
            </div>
        )
    }

    handleChange(event,userInput){
        this.setState({
            userInput: event.target.value 
        })
    }

    handleTransScore(){
        const {test ,score, userInput} = this.state;
        let score_temp = 0;
        let countTestNumber = 0;
        for(countTestNumber = 0; countTestNumber< 3; countTestNumber++){
            //const { answer, userAns } = test[countTestNumber];
            if(userInput[countTestNumber] === test[countTestNumber].answer)  score_temp++;
        }
        if(score_temp === 0)score_temp = 1111;
        else if(score_temp === 1)score_temp = 60;
        else if(score_temp === 2)score_temp = 80;
        else if(score_temp === 3)score_temp = 100;
        else score_temp = -1;
        this.setState({
            score: score_temp
        });
    }

    /*******************/
    handleSelectionList(oneSelection, i){
        const {title, c, testNumber} = oneSelection;
        return(
            <Selection
            index = {i}
            testNumber = {testNumber}
            title = {title}
            c = {c}
            onChange = {this.handleSelectionChecked.bind(this)}
            />
        );
    }
    handleSelectionChecked(event, i, testNumber){
        const {test} = this.state;
        test[testNumber].selection.splice(i,1,{
            title: test[testNumber].selection[i].title,
            c: event.target.checked,
            testNumber: testNumber
        });
        this.setState({
            test: test
        });
    }
    handleScore(){
        const {test, score} = this.state;
        let score_temp = 0;
        let countTopic = 0;
        for(countTopic = 0; countTopic<3; countTopic++){
            const {selection, answer} = test[countTopic];
            if(selection[answer].c)score_temp = score_temp + 1;
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

WordReview.propTypes = { 
    test: React.PropTypes.array,
    score: React.PropTypes.number
}

export default WordReview;
