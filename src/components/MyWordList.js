import React, {Component} from 'react';
import {Link} from 'react-router';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import ShowCountDisplay from './ShowCountDisplay';
import WordItem from './WordItem';
import './MyWordList.css';

class MyWordList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: props.initialCount,
      newTodo: '',
      todos: []
    };
  }
  handleNewTodo(event){
    this.setState({newTodo: event.target.value});
  }

  handleKeyDown(event){
    const inputValue = event.target.value;
    if((event.which == 13 || event.keyCode == 13) && inputValue != ''){
      const {todos, newTodo, count} = this.state;
      this.setState({
        newTodo: '',
        todos: todos.concat({title: newTodo, completeYet: false}),
        count: count + 1
      });
    }
  }
  handleTodoChecked(event, i){
    const {todos, count} = this.state;
    todos.splice(i,1,{
      title: todos[i].title,
      completeYet: event.target.checked
    });
    this.setState({
      todos: todos
    });
    if (event.target.checked){
      this.setState({count: count - 1});
    }else{
      this.setState({count: count + 1});
    }
  }
  handleTodoDestroy(i){
    let {todos} = this.state;
    const {count} = this.state;
    if (todos[i].completeYet == 0){
      this.setState({count: count - 1});
    }
    todos.splice(i,1);
    this.setState({
      todos: todos
    });
  }
  handleTodoList(item, i){
    return(
        <WordItem 
        index = {i}
        title = {item.title}
        completeYet = {item.completeYet}
        onChange = {this.handleTodoChecked.bind(this)}
        onDestroy = {this.handleTodoDestroy.bind(this)}
        />
        );
  }
  render() {
    const {newTodo, todos, count} = this.state;
    return (
        <div>
          <section className = "todoapp">
            <header className = "header">
              <h1>My Word List</h1>
              <input className = "new-todo" 
                    placeholder = "What needs to be done?" 
                    autofocus 
                    value = {newTodo}
                    onChange = {this.handleNewTodo.bind(this)}
                    onKeyDown = {this.handleKeyDown.bind(this)} 
              />
            </header>
            <section className = "main">
              <input className = "toggle-all" type = "checkbox" />
              <ul className = "todo-list">{todos.map(this.handleTodoList, this)}</ul>
            </section>
            <footer className = "footer">
              <ShowCountDisplay countShow = {count}/>
            </footer>
          </section>
          <footer className = "info">
            <p>footer</p>
          </footer>
        </div>
        );
  }
}
MyWordList.defaultProps = { initialCount: 0};
MyWordList.propTypes = { initialCount: React.PropTypes.number};

export default MyWordList;
