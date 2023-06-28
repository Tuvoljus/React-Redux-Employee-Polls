import React from 'react';
import { Container, Row } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container>
      <Row>
        <h1> 404</h1>
        <p>The page you're searching for is not available!</p>
      </Row>
    </Container>
  );
};

export default NotFound;
