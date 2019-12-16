import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/shared";
import { Redirect } from "react-router-dom";
import {Card,Row,Col,Button,Form,Badge,ProgressBar} from "react-bootstrap";

class QuestionDetails extends Component {
  state = {
    value: ""
  };
  answerQuestion = event => {
    event.preventDefault();
    this.props.dispatch(
      handleSaveQuestionAnswer(
        this.props.authedUserId,
        this.props.qId,
        this.state.value
      )
    );
  };

  disabled = () => {
    return !this.state.value;
  };
  handleChange = event => {
    const value = event.target.value;
    this.setState({ value: value });
  };

  render() {
    if (!this.props.qId) {
      return <Redirect to="/errorPage" />;
    }
    const {
      username, avatarURL, optionOne, optionTwo, totalVotes, answer} = this.props;
    const optionOneRatio = parseInt(
      (optionOne.votes.length / totalVotes) * 100,
      10
    );
    const optionTwoRatio = parseInt(
      (optionTwo.votes.length / totalVotes) * 100,
      10
    );
    const optionOneCount = `${optionOne.votes.length} out of ${totalVotes} votes`;
    const optionTwoCount = `${optionTwo.votes.length} out of ${totalVotes} votes`;

    return (
      <Card className=" container ">
        <Card.Header>
          <strong>
            <span> {username} asks:</span>
          </strong>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md="auto">
              <img
                className="avatar"
                src={avatarURL}
                alt={`${username}'s icon`}
              ></img>
            </Col>
            {!answer ? (
              <Col>
                <strong>
                  <h2>Would you rather ... </h2>
                </strong>
                <Form onSubmit={this.answerQuestion}>
                  <fieldset>
                    <Form.Group as={Row}>
                      <Col sm={10}>
                        <Form.Check
                          type="radio"
                          name="answer"
                          id="optionOne"
                          label={`${optionOne.text}`}
                          value="optionOne"
                          onChange={this.handleChange}
                        />
                        <Form.Check
                          type="radio"
                          name="answer"
                          id="optionTwo"
                          label={`${optionTwo.text}`}
                          value="optionTwo"
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                  </fieldset>
                  <Button
                    type="submit"
                    variant="primary"
                    className="btn-block"
                    disabled={this.disabled()}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            ) : (
              <Col>
                <h3>Results: </h3>
                <div
                  className={
                    "optionOne" === answer
                      ? "selected option-container"
                      : "option-container"
                  }
                >
                  {"optionOne" === answer && (
                    <Badge className="float-right" variant="dark">
                      Your vote
                    </Badge>
                  )}
                  <div>Would you rather {optionOne.text}</div>

                  <ProgressBar
                    now={optionOneRatio}
                    variant="success"
                    label={`${optionOneRatio}%`}
                  />

                  <div>
                    <strong>{optionOneCount}</strong>
                  </div>
                </div>
                <h4 className="center or-style">
                  <span>OR</span>
                </h4>
                <div
                  className={
                    "optionTwo" === answer
                      ? "selected option-container"
                      : "option-container"
                  }
                >
                  {"optionTwo" === answer && (
                    <Badge className="float-right" variant="dark">
                      Your vote
                    </Badge>
                  )}
                  <div>Would you rather {optionTwo.text}</div>
                  <ProgressBar
                    now={optionTwoRatio}
                    variant="success"
                    label={`${optionTwoRatio}%`}
                  />

                  <div>
                    <strong>{optionTwoCount}</strong>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  const authedUser = state.users[state.authedUser];
  const { id } = props.match.params;
  const question = state.questions[id];

  if (!question) {
    return {
      authedUserId: authedUser.id,
      qId: null
    };
  }
  const user = state.users[question.author];
  return {
    authedUserId: authedUser.id,
    username: user.name,
    avatarURL: user.avatarURL,
    qId: id,
    optionOne: { ...question.optionOne },
    optionTwo: { ...question.optionTwo },
    totalVotes:
      question.optionOne.votes.length + question.optionTwo.votes.length,
    answer: authedUser.answers[question.id]
  };
}

export default connect(mapStateToProps)(QuestionDetails);
