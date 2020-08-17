import React from "react";

import Header from "./components/Header";
import Login from "./components/SignIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/checkout">
          <Header />
          <h1>Checkout</h1>
        </Route>
        <Route path="/">
          <Header />
          <h1>Home</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
