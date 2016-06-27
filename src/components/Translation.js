import React, { Component } from 'react';
import 'babel-polyfill';
import './MyWordList.css';

class Translation extends Component {
    render(){
        const {value,onChange,i} = this.props;
        return(
            <div>
            <form name ="formName">
            <input
                type = "text"
                size = "20"
                placeholder='請輸入相應英文'
                value = {value}
                onChange = {function(event){return onChange(event,i)}}
            />
            </form>
            </div>
        );
    }
}
export default Translation;
