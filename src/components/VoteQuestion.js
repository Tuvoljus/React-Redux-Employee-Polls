import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { setAuthedUser } from '../slices/authedUser';
import { updateQuestion } from '../slices/questions';
import { updateSelectedAnswer } from '../slices/authedUser';
import Stack from 'react-bootstrap/Stack';

export const useAuthedUser = () => useSelector((state) => state.authedUser);
export const useQuestions = () => useSelector((state) => state.questions);
export const useUsers = () => useSelector((state) => state.users);

const VoteQuestion = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);

  const [isButtonDispabled, setIsButtonDisabled] = useState(false);
  const [successClassName, setSuccessClassName] = useState(
    { colorSuccessBtnOptionOne: '' },
    { colorSuccessBtnOptionTwo: '' }
  );

  console.log(users, 'MEINE USers');
  console.log(questions, 'My Question');
  console.log(authedUser, 'AUTHED_USER');

  useEffect(() => {
    const getAuthorAnswers = authedUser.answers;
    const checkIfQuestionEqualAuthor = Object.keys(getAuthorAnswers).filter(
      (answerId) => answerId === id
    );

    setIsButtonDisabled(checkIfQuestionEqualAuthor.length > 0);

    const answerValue = getAuthorAnswers[id]; // Get the value from the filtered answer

    console.log(answerValue, 'Filtered Answer Value');
    console.log(checkIfQuestionEqualAuthor, 'Checked');

    const buttons = [...document.getElementsByTagName('button')];
    const successButton = buttons.find(
      (button) => button.getAttribute('name') === answerValue
    );
    console.log(successButton, 'SUCC');
    switch (answerValue) {
      case 'optionOne':
        setSuccessClassName({ colorSuccessBtnOptionOne: 'btn-success' });
        break;
      case 'optionTwo':
        setSuccessClassName({ colorSuccessBtnOptionTwo: 'btn-success' });
        break;
      default:
        break;
    }
    // setSuccessClassName(successButton ? 'btn-success' : '');
  }, [authedUser.answers, id]);

  console.log(authedUser, 'AUrhed User first Call');
  const handleOnSubmit = (e, selectedOption) => {
    e.preventDefault();

    // Check if the question exists
    if (!questions[id]) {
      console.error(`Question with ID ${id} does not exist.`);
      return;
    }

    // // Update the user's answers
    // const updatedUser = {
    //   ...authedUser,
    //   answers: {
    //     ...authedUser.answers,
    //     [id]: selectedOption,
    //   },
    // };

    // console.log(updatedUser.id, ' USER Id Zeile 46');
    // console.log(updatedUser, 'Updated USER Zeile 47');
    // console.log(authedUser, 'AUTH USER Zeile 48');

    const updatedQuestion = {
      questionId: id,
      option: selectedOption,
      userId: authedUser.id,
    };

    console.log(updatedQuestion, 'UPDATED QUESTION ZEile 55');
    dispatch(updateSelectedAnswer({ questionId: id, selectedOption }));
    dispatch(updateQuestion(updatedQuestion));
    navigate('/');
  };

  const question = questions[id];

  const votes = () => {
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    const optionOnePercentage =
      totalVotes === 0 ? 0 : (optionOneVotes / totalVotes) * 100;
    const optionTwoPercentage =
      totalVotes === 0 ? 0 : (optionTwoVotes / totalVotes) * 100;

    return {
      optionOneVotes,
      optionTwoVotes,
      optionOnePercentage,
      optionTwoPercentage,
    };
  };

  console.log(votes, 'VOTES');

  console.log(question, 'Die Frage');

  // const author = users[question.author];
  const author = question ? users[question.author] : null;

  if (!question || !author) {
    return <div>Loading...</div>;
  }
  console.log(author, 'get AUTHOR');

  return (
    <Container className="text-center">
      <Stack gap={3}>
        <h1>Vote Question</h1>
        <Row>
          <div>
            <img
              src={`${author.avatarURL}`}
              className=" img-fluid rounded img-thumbnail mx-auto d-block"
              alt={author.name}
              style={{ maxWidth: '20%' }}
            />
          </div>
        </Row>

        <Row>
          <div>
            <h3 data-testid="header-question">Would You Rather</h3>
          </div>
        </Row>
        <Row>
          <Form onSubmit={handleOnSubmit}>
            <Row>
              {/* Render the options for the question */}
              <Col>
                <Button
                  data-testid="btn-option-one"
                  disabled={isButtonDispabled}
                  type="submit"
                  name="optionOne"
                  onClick={(e) => handleOnSubmit(e, 'optionOne')}
                  className={`${successClassName.colorSuccessBtnOptionOne}`}
                >
                  {question.optionOne.text}
                </Button>
                <p>
                  Votes: {votes().optionOneVotes} (
                  {votes().optionOnePercentage.toFixed(2)}%){' '}
                </p>
              </Col>
              <Col>
                <Button
                  data-testid="btn-option-two"
                  disabled={isButtonDispabled}
                  type="submit"
                  name="optionTwo"
                  onClick={(e) => handleOnSubmit(e, 'optionTwo')}
                  className={`${successClassName.colorSuccessBtnOptionTwo}`}
                >
                  {question.optionTwo.text}
                </Button>
                <p>
                  Votes: {votes().optionTwoVotes} (
                  {votes().optionTwoPercentage.toFixed(2)}%)
                </p>
              </Col>
            </Row>
          </Form>
          {/* {successClassName !== '' && <p>you have already chosen</p>} */}
        </Row>
      </Stack>
    </Container>
  );
};

export default VoteQuestion;
