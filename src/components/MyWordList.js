import React, { Component } from 'react';
import { Link } from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import qsort from 'quicksorter';

import './MyWordList.css';

class MyWordList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      WordList: {wordcards:[]}
    };
  }

  setWordList(temp){

    let arr = [];
    let tempSize = 0;
    let cnt = 0;
    tempSize = parseInt(temp.wordcards[0].total,10);
    
    for(cnt = 0; cnt<tempSize; cnt++){
        arr.push(temp.wordcards[cnt]);
    }
    
    qsort(arr, function(a, b) {
        var at = 0;
        var bt = 0;
        at = parseInt(a.testTime,10);
        bt = parseInt(b.testTime,10);
        return at < bt ? -1 : at > bt ? 1 : 0
    })
    
    for(cnt = 0; cnt<tempSize; cnt++){
        temp.wordcards.splice(cnt,1,arr[cnt]); 
    }
    
    this.setState({
        WordList:temp
    });
  }

  handleWordList(wordcard){
    const {name, trans} = wordcard;
    return (
        <div>
          <ul>
            <li>
                <div className="tooltip wordlist-english"> {name}
                    <span className="tooltiptext wordlist-trans">{trans}</span>
                </div>
            </li>
          </ul>  
        </div>
        )
  }

  componentDidMount() {
    fetch('/api/mywordlist')
      .then(function(res){return res.json()})
      .then(this.setWordList.bind(this));

  }

  render() {
    const {wordcards} = this.state.WordList;
    return (
        <div className="container">
          <h1 className="homepage-title"><b>My WordList</b></h1>
            <div className="homepage-btn-crew">
                <button type="button" className="btn btn-info homepage-btn">Info</button> &nbsp;
                <button type="button" className="btn btn-success homepage-btn">Designer</button> &nbsp;
                <Link to ={'/wordreview'}><button type="button" className="btn btn-warning homepage-btn">Selection Test</button></Link> &nbsp;
                <Link to ={'/wordreview_trans'}><button type="button" className="btn btn-danger homepage-btn">Translation Test</button></Link> &nbsp;
                <Link to ={'/reviewmode'}><button type="button" className="btn btn-default btn-change homepage-btn">Review</button></Link>
            </div>
            <form className="homepage-input-instr">
                <div className="form-group input-btn-crew">   
                    <input type="text" placeholder='English' className="homepage-input input-btn-change"/> &nbsp;
                    <input type="text" placeholder='Chinese' className="homepage-input input-btn-change"/> &nbsp;
                    <select name="Word Of Speech">
                        <option value="VERB">                        Verb</option>
                        <option value="NOUN">                        Noun</option>
                        <option value="ADJECTIE">               Adjective</option>
                        <option value="ADVERB">                    Adverb</option>
                        <option value="PREPOSITION">          Preposition</option>
                    </select> &nbsp;
                    <input type="submit" value="Add To List" className="submit-btn"/>
                </div>
            </form>
            
            <span>
                {wordcards.map(this.handleWordList.bind(this))}
            </span>
        </div>
        );
  }
}

export default MyWordList;
