import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addQuestion } from '../slices/questions';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { addQuestionToUser } from '../slices/authedUser';

const NewQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.authedUser);
  const [questions, setQuestions] = useState({
    optionOne: { text: '' },
    optionTwo: { text: '' },
  });

  function handleOnChange(e) {
    const inputField = e.target;
    switch (inputField.id) {
      case 'firstOption':
        const valueFirstOption = inputField.value;
        setQuestions((prevState) => ({
          ...prevState,
          optionOne: {
            ...prevState.optionOne,
            text: valueFirstOption,
          },
        }));
        break;
      case 'secondOption':
        const valueSecondOption = inputField.value;
        setQuestions((prevState) => ({
          ...prevState,
          optionTwo: {
            ...prevState.optionTwo,
            text: valueSecondOption,
          },
        }));
        break;
      default:
        break;
    }
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const { optionOne, optionTwo } = questions;
    const author = authedUser.id;
    const selectedOption = optionOne.text !== '' ? 'optionOne' : 'optionTwo';

    try {
      const savedQuestion = await saveQuestion(
        optionOne.text,
        optionTwo.text,
        author
      );
      dispatch(addQuestion(savedQuestion));

      await saveQuestionAnswer(authedUser.id, savedQuestion.id, selectedOption);
      dispatch(addQuestionToUser({ questionId: savedQuestion.id }));
      navigate('/');
    } catch (error) {
      alert('Error saving question:', error);
    }
  }

  return (
    <Container>
      <Row>
        <h1>NewQuestion</h1>
        <Form onSubmit={handleOnSubmit}>
          <Row>
            <Col>
              <FloatingLabel label="First Option" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="First Option"
                  value={questions.optionOne.text}
                  onChange={(e) => handleOnChange(e)}
                  id="firstOption"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Second Option">
                <Form.Control
                  type="text"
                  id="secondOption"
                  placeholder="Second Option"
                  value={questions.optionTwo.text}
                  onChange={(e) => handleOnChange(e)}
                />
              </FloatingLabel>
            </Col>
            <Row>
              <Col>
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default NewQuestion;
