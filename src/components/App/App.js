import React, { Component } from 'react';
import MainPage from '../pages/Main/Main.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.init();

    this.setCategories = this.setCategories.bind(this);
    this.setTasks = this.setTasks.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  init() {
    this.state = {
      category: null,
      categories: [
        { title: 'Category1', id: 1 },
        { title: 'Category2', id: 2 },
        {
          title: 'Category3', id: 3,
          sub: [],
        },
      ],
      tasks: [
        { title: 'TODO #1', done: false, id: 101, category: 3 },
        { title: 'TODO #2', done: false, id: 102, category: 2 },
        { title: 'TODO #3', done: false, id: 103, category: 1 },
        { title: 'TODO #4', done: false, id: 104, category: 3 },
        { title: 'TODO #5', done: true, id: 105, category: 3 },
        { title: 'TODO #6', done: true, id: 106, category: 3 },
        { title: 'TODO #7', done: false, id: 107, category: 1 },
        { title: 'TODO #7', done: false, id: 108, category: 1 },
        { title: 'TODO #7', done: false, id: 109, category: 1 },
        { title: 'TODO #7', done: false, id: 120, category: 1 },
        { title: 'TODO #7', done: false, id: 121, category: 1 },
        { title: 'TODO #7', done: false, id: 122, category: 1 },
        { title: 'TODO #7', done: false, id: 123, category: 1 },
        { title: 'TODO #7', done: false, id: 124, category: 1 },
        { title: 'TODO #7', done: false, id: 125, category: 1 },
        { title: 'TODO #7', done: false, id: 126, category: 1 },
        { title: 'TODO #7', done: false, id: 127, category: 1 },
        { title: 'TODO #7', done: false, id: 128, category: 1 },
        { title: 'TODO #7', done: false, id: 129, category: 1 },
        { title: 'TODO #7', done: false, id: 130, category: 1 },
        { title: 'TODO #7', done: false, id: 131, category: 1 },
        { title: 'TODO #7', done: false, id: 132, category: 1 },
        { title: 'TODO #7', done: false, id: 133, category: 1 },
      ],
    };
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
