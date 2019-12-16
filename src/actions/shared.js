import { showLoading, hideLoading } from "react-redux-loading";
import {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer
} from "../utils/API.js";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";

export const GET_INITIAL_DATA = "GET_INITIAL_DATA";
export const RECEIVE_ANSWER = "RECEIVE_ANSWER";
export const RECEIVE_QUESTION = "RECEIVE_QUESTION";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleSaveQuestionAnswer(username, qId, answer) {
  return dispatch => {
    dispatch(showLoading());
    saveQuestionAnswer({ username, qId, answer }).then(() => {
      dispatch(receiveAnswer(username, qId, answer));
      dispatch(hideLoading());
    });
  };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    dispatch(showLoading());
    saveQuestion({ optionOneText, optionTwoText, author }).then(question => {
      dispatch(receiveQuestion(question));
      dispatch(hideLoading());
    });
  };
}

export function receiveAnswer(username, qId, answer) {
  return {
    type: RECEIVE_ANSWER,
    username,
    qId,
    answer
  };
}

export function receiveQuestion(question) {
  return {
    type: RECEIVE_QUESTION,
    question
  };
}
