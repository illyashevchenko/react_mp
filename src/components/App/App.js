import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter,
  Route,
} from 'react-router-dom'

import MainPage from '../pages/Main';
import ToDoPage from '../pages/ToDo';

import data from './data';

class App extends Component {
  constructor(props) {
    super(props);
    this.init();

    this.setCategories = this.setCategories.bind(this);
    this.setTasks = this.setTasks.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  init() {
    this.state = data;
  }

  setCategories(categories) {
    this.setState({ categories });
  }

  setTasks(tasks) {
    this.setState({ tasks });
  }

  selectCategory(category) {
    this.setState({ category });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            exact
            path="/"
            render={ (props) =>
              <MainPage
                { ...this.state }
                setCategories={ this.setCategories }
                setTasks={ this.setTasks }
                selectCategory={ this.selectCategory }
                { ...props }/>
            }/>

          <Route
            path="/edit/:taskId"
            render={ (props) =>
              <ToDoPage
                { ...this.state }
                { ...props }/>
            }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
