import React, {Component} from 'react';
import './MyWordList.css';

class ShowCountDisplay extends React.Component {
  render(){
    const countShow = this.props.countShow;
    if (countShow > 1){
      return <span className = "todo-count"><strong>{countShow} </strong>words</span>;
    }else if(countShow == 1){
      return <span className = "todo-count"><strong>1 </strong>word</span>;
    }else{
      return <span className = "todo-count">empty</span>;
    }
  }
}

export default ShowCountDisplay; 
