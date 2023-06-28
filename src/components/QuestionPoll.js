import React from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Questions from './Questions';

const QuestionPool = () => {
  return (
    <Container>
      <Stack direction="vertical" gap={5}>
        <Row>
          <h1>Question Poll</h1>
        </Row>
        <Row>
          <Questions />
        </Row>
      </Stack>
    </Container>
  );
};

export default QuestionPool;
