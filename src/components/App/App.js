import React, { Component } from 'react';
import './App.css';

import MainPage from '../pages/Main';

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
      <div className="App">
        <MainPage
          { ...this.state }
          setCategories={ this.setCategories }
          setTasks={ this.setTasks }
          selectCategory={ this.selectCategory }/>
      </div>
    );
  }
}

export default App;
