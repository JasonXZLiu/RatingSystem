import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
import RatingsPage from "./pages/ratings/RatingsPage";
import PlayerPage from "./pages/player/PlayerPage";
import TournamentPage from "./pages/tournament/TournamentPage";
import TournamentDetailsPage from "./pages/tournament/tournamentDetails/TournamentDetailsPage";
import NoMatch from "./pages/404";
import { ToastContainer } from "react-toastify";
import CloseToastButton from "./components/toast/closeToastButton";

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
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LeaderboardPage} />
            <Route path="/ratings" component={RatingsPage} />
            <Route path="/player/:playerId" component={PlayerPage} />
            <Route path="/tournaments" component={TournamentPage} />
            <Route
              path="/tournament/:tournamentId"
              component={TournamentDetailsPage}
            />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
        <ToastContainer
          position={"bottom-right"}
          closeButton={<CloseToastButton />}
        />
      </MuiPickersUtilsProvider>
    );
  };
}

export default App;
