import React from 'react';
import Container from 'react-bootstrap/Container';
import QuestionCard from './QuestionCard';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Col } from 'react-bootstrap';

const Questions = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const questionIds = Object.keys(questions);
  const answeredQuestionIds = questionIds.filter((questionId) =>
    Object.keys(authedUser.answers).includes(questionId)
  );

  const unansweredQuestionIds = questionIds.filter(
    (questionId) => !answeredQuestionIds.includes(questionId)
  );

  const sortQuestionsByDate = (questionIds) => {
    return questionIds.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
  };

  const sortedUnansweredQuestionIds = sortQuestionsByDate(
    unansweredQuestionIds
  );
  const sortedAnsweredQuestionIds = sortQuestionsByDate(answeredQuestionIds);

  return (
    <>
      <Container>
        <Tabs gap={5}>
          <Tab
            eventKey="newQuestion"
            title={`New Question${answeredQuestionIds.length > 0 && 's'}`}
          >
            <Row>
              <Col>
                <h3>New Questions</h3>
                {sortedUnansweredQuestionIds.length > 0 ? (
                  <Stack direction="horizontal" gap={4}>
                    {sortedUnansweredQuestionIds.map((questionId) => {
                      const question = questions[questionId];
                      return (
                        <QuestionCard key={questionId} question={question} />
                      );
                    })}
                  </Stack>
                ) : (
                  <p>No more questions at the moment.</p>
                )}
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <Row>
              <Col>
                {' '}
                <h3>Completed</h3>
                <Stack direction="horizontal" gap={4}>
                  {sortedAnsweredQuestionIds.map((questionId) => {
                    const question = questions[questionId];
                    return (
                      <QuestionCard key={questionId} question={question} />
                    );
                  })}
                </Stack>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Questions;
