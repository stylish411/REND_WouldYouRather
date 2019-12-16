import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";

class LeaderboardItem extends Component {
  render() {
    const {username, avatarURL, askedQuestions, answeredQuestions} = this.props;
    const score = askedQuestions + answeredQuestions;
    
    return (
      <div className="leaderboard-item-info-container">
        <Col md={3} className="align-items-center justify-content-center">
          <img
            className="avatar"
            src={avatarURL}
            alt={`${username}'s icon`}
            title={`${username}'s picture`}
          ></img>
        </Col>
        <Col md={6}>
          <div className="leaderboard-itme-username">
            <h4>{username}</h4>
          </div>
          <br />
          <div className="leaderboard-itme-asked-question">
            Asked Questions:&nbsp; <b>{askedQuestions}</b>
          </div>
          <div className="leaderboard-itme-answered-question">
            Answered Questions:&nbsp; <b>{answeredQuestions}</b>
          </div>
        </Col>
        <Col md={3} className="leaderboard-itme-total-score-column">
          <div className="leaderboard-itme-total-score">
            <h2>Total</h2>
            <u><h2>{score}</h2></u>
          </div>
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state, { id }) {
  const user = state.users[id];
  return {
    username: user.name,
    answeredQuestions: Object.keys(user.answers).length,
    askedQuestions: user.questions.length,
    avatarURL: user.avatarURL
  };
}

export default connect(mapStateToProps)(LeaderboardItem);
