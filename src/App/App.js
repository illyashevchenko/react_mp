import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Route,
} from 'react-router-dom'

import { MainPage } from '../pages/Main';
import { ToDoPage } from '../pages/ToDo';

export const App = () => (
  <BrowserRouter>
    <div className="App">
      <Route
        exact
        path="/"
        component={ MainPage }/>

      <Route
        path="/edit/:taskId"
        render={ ToDoPage }/>

    </div>
  </BrowserRouter>
);
