import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LeaderboardPage from "./pages/LeaderboardPage";
import NoMatch from "./pages/404";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LeaderboardPage} />
        <Route path="/rating" component={LeaderboardPage} />
        <Route path="/tournaments" component={LeaderboardPage} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
