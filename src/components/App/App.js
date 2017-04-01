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
          tasks={ this.state.tasks }
          categories={ this.state.categories }
          category={ this.state.category }
          setCategories={ this.setCategories }
          setTasks={ this.setTasks }
          selectCategory={ this.selectCategory }/>
      </div>
    );
  }
}

export default App;
