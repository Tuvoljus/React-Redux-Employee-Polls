import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from '../_DATA';

describe('Tests for _Data API', () => {
  it('get all users', async () => {
    const result = await _getUsers();

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toHaveProperty('sarahedo');
    expect(Object.keys(result).length).toBe(4);
  });

  it('get all questions', async () => {
    const result = await _getQuestions();

    expect(result).not.toBeNull();
    expect(Object.keys(result).length).toBe(6);
    expect(Object.values(result)[0]).toHaveProperty('author');
  });

  it('get new question', async () => {
    const question = {
      optionOneText: 'Test option one',
      optionTwoText: 'Test option two',
      author: 'tylermcginnis',
    };

    const result = await _saveQuestion(question);

    expect(result).not.toBeNull();
  });

  it('on invalid question, get an error', async () => {
    const question = {
      optionOneText: null,
      optionTwoText: 'Test option two',
      author: 'tylermcginnis',
    };

    await expect(_saveQuestion(question)).rejects.toBe(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });

  it('get back an true on question answer save', async () => {
    const answer = {
      authedUser: 'tylermcginnis',
      qid: 'xj352vofupe1dqz9emx13r',
      answer: 'optionOne',
    };

    const result = await _saveQuestionAnswer(answer);

    expect(result).toBeTruthy();
  });

  it('get back a reject message when saving an invalid question answer', async () => {
    const answer = {
      authedUser: null,
      qid: null,
      answer: 'optionOne',
    };

    await expect(_saveQuestionAnswer(answer)).rejects.toBe(
      'Please provide authedUser, qid, and answer'
    );
  });
});
