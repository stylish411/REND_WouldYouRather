import { RECEIVE_QUESTIONS } from "../actions/questions";
import { RECEIVE_ANSWER, RECEIVE_QUESTION } from "../actions/shared";

export function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return action.questions;
    case RECEIVE_ANSWER:
      return {
        ...state,
        [action.qId]: {
          ...state[action.qId],
          [action.answer]: {
            ...state[action.qId][action.answer],
            votes: state[action.qId][action.answer].votes.concat([
              action.username
            ])
          }
        }
      };
    case RECEIVE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };
    default:
      return state;
  }
}
