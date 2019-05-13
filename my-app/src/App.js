import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LeaderboardPage from "./pages/LeaderboardPage";
import RatingsPage from "./pages/RatingsPage";
import NoMatch from "./pages/404";

const Leaderboard = props => {
  return <LeaderboardPage state={props.location.state} />;
};

class App extends React.Component {
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
          <Route exact path="/" component={Leaderboard} />
          <Route path="/rating" component={RatingsPage} />
          <Route path="/tournaments" component={LeaderboardPage} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  };
}

export default App;
