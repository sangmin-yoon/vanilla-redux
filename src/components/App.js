import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Detail from "../routes/Detail";
import Home from "../routes/Home";

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route
        path="/:id"
        exact
        render={(props) => <Detail {...props} />}
      ></Route>
    </Router>
  );
}

export default App;
