import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Navbar from "./components/Nav";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
              <Route exact path="/" component={Books} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
