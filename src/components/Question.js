import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";

function Question(props) {
  const { username, avatarURL, qId, optionOne } = props;
  return (
    <div className="question-card">
      <div className="question-card-header">
        <b>
          <span> {username}'s question:</span>
        </b>
      </div>
      <div className="question-card-body">
        <div className="question-avatar-container-row">
          <div className="avatar-container">
            <img
              className="avatar"
              src={avatarURL}
              alt={`${username}`}
              title={`${username}`}
            ></img>
          </div>
          <div className="question-teaser-col">
            <b>Would you rather</b>
            <div>{optionOne}, or..</div>
            <Button  //Tried to use button but the button (not Button) didn't take me to the poll page
              as={Link}
              to={`/questions/${qId}`}
              variant="primary"
              className="question-button"
            >
              View Poll
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, { id }) {
  const user = state.users[state.questions[id].author];
  return {
    username: user.name,
    avatarURL: user.avatarURL,
    qId: id,
    optionOne: state.questions[id].optionOne.text
  };
}

export default connect(mapStateToProps)(Question);
