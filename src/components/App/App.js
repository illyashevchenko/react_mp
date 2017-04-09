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
          subIds: [4, 5],
        },
        { title: 'Category4', id: 4 },
        {
          title: 'Category5', id: 5,
          subIds: [6],
        },
        {
          title: 'Category6', id: 6,
          subIds: [7, 8],
        },
        { title: 'Category7', id: 7 },
        { title: 'Category8', id: 8 },
      ],
      tasks: [
        { title: 'TODO #1', done: false, id: 101, categoryId: 3 },
        { title: 'TODO #2', done: false, id: 102, categoryId: 2 },
        { title: 'TODO #3', done: false, id: 103, categoryId: 1 },
        { title: 'TODO #4', done: false, id: 104, categoryId: 3 },
        { title: 'TODO #5', done: true, id: 105, categoryId: 3 },
        { title: 'TODO #6', done: true, id: 106, categoryId: 3 },
        { title: 'TODO #7', done: false, id: 107, categoryId: 1 },
        { title: 'TODO #8', done: false, id: 108, categoryId: 1 },
        { title: 'TODO #9', done: false, id: 109, categoryId: 1 },
        { title: 'TODO #10', done: false, id: 120, categoryId: 1 },
        { title: 'TODO #11', done: false, id: 121, categoryId: 1 },
        { title: 'TODO #12', done: false, id: 122, categoryId: 1 },
        { title: 'TODO #13', done: false, id: 123, categoryId: 1 },
        { title: 'TODO #14', done: false, id: 124, categoryId: 1 },
        { title: 'TODO #15', done: false, id: 125, categoryId: 1 },
        { title: 'TODO #16', done: false, id: 126, categoryId: 1 },
        { title: 'TODO #17', done: false, id: 127, categoryId: 1 },
        { title: 'TODO #18', done: false, id: 128, categoryId: 1 },
        { title: 'TODO #19', done: false, id: 129, categoryId: 4 },
        { title: 'TODO #20', done: false, id: 130, categoryId: 5 },
        { title: 'TODO #21', done: false, id: 131, categoryId: 6 },
        { title: 'TODO #22', done: false, id: 132, categoryId: 7 },
        { title: 'TODO #23', done: false, id: 133, categoryId: 8 },
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
