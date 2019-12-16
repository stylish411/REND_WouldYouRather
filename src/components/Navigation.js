import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";

export default class NavBar extends Component {
  render() {
    const { signedInUser } = this.props;
    const signedIn = signedInUser !== null;
    return (
      <div>
        <Navbar className="nav-menu-container" bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">Would You Rather</Navbar.Brand>
          {signedIn && (
            <Nav className="mr-auto">
              <Nav.Item>
                <Nav.Link as={Link} to="/add" className="nav-menu-item">
                  New Question
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/leaderboard" className="nav-menu-item">
                  Leaderboard
                </Nav.Link>
              </Nav.Item>
            </Nav>
          )}
          
          {signedIn && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>{signedInUser.name} </Navbar.Text>
              <img
                className="login-avatar pl-1"
                src={signedInUser.avatarURL}
                alt={`${signedInUser.name}`}
                title={`${signedInUser.name}`}
              ></img>
              <Nav.Item className="px-2">
                <Button as={Link} to="/logout" className="btn-danger">
                  Sign out
                </Button>
              </Nav.Item>
            </Navbar.Collapse>
          )}
        </Navbar>
      </div>
    );
  }
}
