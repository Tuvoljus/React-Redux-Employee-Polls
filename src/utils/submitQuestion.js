import { saveQuestion, saveQuestionAnswer } from './api';
import { addQuestion } from '../slices/questions';
import { addQuestionToUser } from '../slices/authedUser';

export async function submitQuestion(
  authedUser,
  questionData,
  answer,
  dispatch,
  navigate
) {
  try {
    if (questionData) {
      const savedQuestion = await saveQuestion(questionData);
      dispatch(addQuestion(savedQuestion));
      await saveQuestionAnswer(authedUser.id, savedQuestion.id, answer);
      dispatch(addQuestionToUser({ questionId: savedQuestion.id }));
      navigate('/');
    }
  } catch (error) {
    console.log('Error saving question:', error);
  }
}
