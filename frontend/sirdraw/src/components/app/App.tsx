import React from "react";
import { Route, Switch } from "react-router-dom";
import Homescreen from "../homescreen/Homescreen";
import "./App.less";

const App: React.StatelessComponent = (): JSX.Element => (
  <Switch>
    <Route exact path="/" component={Homescreen} />
  </Switch>
);

export default App;
