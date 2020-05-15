import React from 'react';
import Projects from './Components/Projects';
import Commits from './Components/Commits';
import Header from './Components/Header';
import Footer from './Components/Footer';
import NoMatch from './Components/NoMatch';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';

class App extends React.Component {
    render() {
      return (
        <Router>
          <Header />
          <Switch>
            <Route path="/" component={Projects} exact />
            <Route path="/:orgName" component={Projects} exact />
            <Route path="/:orgName/:project/commits/master" exact component={Commits} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </Router>
      );
    }
}

export default App;