import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}

export function saveQuestionAnswer({ username, qId, answer }) {
  return _saveQuestionAnswer(username, qId, answer);
}

export function saveQuestion(info) {
  return _saveQuestion(info);
}
