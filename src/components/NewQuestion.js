import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOne: "", optionTwo: "", toHome: false
  };

  handleChange = event => {
    const val = event.target.value
    const name = event.target.name
    this.setState(prevState => ({ ...prevState, [name]: val }));
  };

  addQuestion = event => {
    event.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.dispatch(
      handleSaveQuestion(optionOne, optionTwo, this.props.authedUser)
    );
    this.setState({
      optionOne: "", optionTwo: "", toHome: true
    });
  };

  disabled = () => {
    return !(this.state.optionOne && this.state.optionTwo);
  };

  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="add-question-container">
          <div className="add-question-title">
            <h1>Add New Question </h1>
          </div>
          <div className="add-question-body">
            <form onSubmit={this.addQuestion} className="new-question">
              <h3>
                <strong>Would you rather ...</strong>
              </h3>
              <div className="form-group">
                <input
                  type="text"
                  className="add-question-input"
                  value={this.state.optionOne}
                  name="optionOne"
                  placeholder="Enter option one text here"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="add-question-input"
                  value={this.state.optionTwo}
                  name="optionTwo"
                  placeholder="Enter option two text here"
                  onChange={this.handleChange}
                />
              </div>
              <button
                disabled={this.disabled()}
                variant="primary"
                type="submit"
                className="add-question-submit"
              >
                Add
              </button>
            </form>
          </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  };
}
export default connect(mapStateToProps)(NewQuestion);
