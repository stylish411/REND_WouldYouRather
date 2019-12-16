import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";
import loginImage from "../login-icon.svg";

/* Bootstrap imports */
import { Card, Form, Row } from "react-bootstrap";

class Login extends Component {
  state = {
    user: null
  };

  setAuthedUser = event => {
    event.preventDefault();
    this.props.dispatch(setAuthedUser(this.state.user));
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    this.props.history.replace(from);
  };

  handleUser = event => {
    const val = event.target.value;
    this.setState({ user: val });
  };

  render() {
    const users = Object.keys(this.props.users).map(id => this.props.users[id]);

    return (
      <div className="login-container">
        <Card className="vertical-center">
          <div className="text-center">
            <h1>Welcome</h1>
          </div>
          <Card.Body>
            <Row className="justify-content-md-center">
              <img
                className="login-image"
                src={loginImage}
                alt="wondering logo"
              />
            </Row>
            <Row className="justify-content-md-center">
              <Form onSubmit={this.setAuthedUser}>
                <Form.Group controlId="username">
                  <Form.Label className="justify-content-center">
                    <strong> I Would Rather to login as:</strong>
                  </Form.Label>
                  <Form.Control as="select" onChange={this.handleUser}>
                    <option name="none" key="none" value="">
                      Select a name
                    </option>
                    {users.length > 0 &&
                      users.map(user => (
                        <option name={user.id} key={user.id} value={user.id}>
                          {" "}
                          {user.name}{" "}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
                <button className="login-submit" type="submit">Sign In{" "}</button>
              </Form>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}
export default withRouter(connect(mapStateToProps)(Login));
