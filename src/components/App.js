import React, { Component } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared.js";
import { setAuthedUser } from "../actions/authedUser";
import Home from "./Home.js";
import AddQuestion from "./NewQuestion";
import Login from "./Login";
import Navigation from "./Navigation";
import QuestionDetails from "./QuestionDetails";
import Leaderboard from "./Leaderboard";
import ErrorPage from "./ErrorPage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  /* to create private route */
  /* source from: https://tylermcginnis.com/react-router-protected-routes-authentication */

  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        this.props.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );

  /** ---------------------------------------------------------------------------------- **/

  /* logout */
  logout = () => {
    this.props.dispatch(setAuthedUser(null));
    return <Redirect to="/" />;
  };

  /** ---------------------------------------------------------------------------------- **/
  render() {
    const { isLoggedIn, authedUser } = this.props;
    const { PrivateRoute } = this;
    return (
      <BrowserRouter>
        <div>
          <Navigation signedInUser={authedUser} />
          <div className="app-container">
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/questions/:id" component={QuestionDetails} />
              <Route
                path="/logout"
                render={() => {
                  return this.logout();
                }}
              />
              <Route
                path="/login"
                render={() => (isLoggedIn ? <Redirect to="/" /> : <Login />)}
              />
              <PrivateRoute exact path="/add" component={AddQuestion} />
              <PrivateRoute exact path="/Leaderboard" component={Leaderboard} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const authedUser = state.authedUser ? state.users[state.authedUser] : null;
  return {
    authedUser,
    isLoggedIn: !!authedUser
  };
}

export default connect(mapStateToProps)(App);
