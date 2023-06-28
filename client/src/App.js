import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { LandingPage } from './components/LandingPage/LandingPage';
import HomePage from '../src/components/HomePage/HomePage'
import Detail from './components/Detail/Detail';
import { FormPage } from './components/FormPage/FormPage';
axios.defaults.baseURL = "http://localhost:3001/"


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home/1" component={HomePage} />
          <Route path="/home/:page" component={HomePage} />
          <Route path="/create" component={FormPage} />
          <Route path="/:id" component={Detail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;