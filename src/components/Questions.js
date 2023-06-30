import Container from 'react-bootstrap/Container';
import QuestionCard from './QuestionCard';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

const Questions = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const questionIds = Object.keys(questions);

  console.log(questions, 'QUESTIONS_TEST');
  // Separate the questionIds into answered and unanswered arrays
  const answeredQuestionIds = questionIds.filter((questionId) =>
    Object.keys(authedUser.answers).includes(questionId)
  );

  const unansweredQuestionIds = questionIds.filter(
    (questionId) => !answeredQuestionIds.includes(questionId)
  );

  return (
    <>
      <Container>
        <Stack gap={5}>
          <Row>
            <h3>New Questions</h3>
            {unansweredQuestionIds.length > 0 ? (
              <Stack direction="horizontal" gap={4}>
                {unansweredQuestionIds.map((questionId) => {
                  const question = questions[questionId];
                  return <QuestionCard key={questionId} question={question} />;
                })}
              </Stack>
            ) : (
              <p>No no more questions at the momment.</p>
            )}
          </Row>

          <Row>
            <h3>Completed</h3>
            <Stack direction="horizontal" gap={4}>
              {answeredQuestionIds.map((questionId) => {
                const question = questions[questionId];
                return <QuestionCard key={questionId} question={question} />;
              })}
            </Stack>
          </Row>
        </Stack>
      </Container>
    </>
  );
};

export default Questions;
