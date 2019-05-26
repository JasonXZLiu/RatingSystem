import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
import RatingsPage from "./pages/ratings/RatingsPage";
import PlayerPage from "./pages/player/PlayerPage";
import NoMatch from "./pages/404";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  connectToServer = () => {
    fetch("/");
  };

  componentDidMount = () => {
    this.connectToServer();
  };

  render = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LeaderboardPage} />
          <Route path="/rating" component={RatingsPage} />
          <Route path="/player/:playerId" component={PlayerPage} />
          <Route path="/tournaments" component={LeaderboardPage} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  };
}

export default App;
