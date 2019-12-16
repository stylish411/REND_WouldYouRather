import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Tabs, Tab } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <div className="justify-contect-md-center container border">
        <Tabs
          defaultActiveKey="unanswered"
          id="home"
          className="nav-pills nav-fill bg-tab-color "
        >
          <Tab eventKey="unanswered" title="Unanswered Questions">
            {this.props.unanswered.length > 0 ? (
              <div className="question-teaser-card-container">
                {this.props.unanswered.map(id => (
                  <div key={id} className="question-teaser-card">
                    <Question key={id} id={id} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="center">
                <h3> You have answered all questions </h3>
              </div>
            )}
          </Tab>
          <Tab eventKey="answered" title="Answered Questions">
            {this.props.answered.length > 0 ? (
              <div className="question-teaser-card-container">
                {this.props.answered.map(id => (
                  <div key={id} className="question-teaser-card">
                    <Question key={id} id={id} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="center">
                <h3>You have did not answered any question</h3>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = state.users[state.authedUser];

  const answered = [...Object.keys(user.answers)].sort(
    (a, b) => state.questions[b].timestamp - state.questions[a].timestamp
  );
  const unanswered = [
    ...Object.keys(state.questions).filter(
      question => answered.indexOf(question) < 0
    )
  ].sort((a, b) => state.questions[b].timestamp - state.questions[a].timestamp);

  return {
    answered: answered,
    unanswered: unanswered
  };
}

export default connect(mapStateToProps)(Home);
