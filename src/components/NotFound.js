import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFound = () => {
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.authedUser);

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Row>
        <h1>404</h1>
        <p>The page you're searching for is not available!</p>
      </Row>
      <Row>
        <Col>
          {Object.keys(authedUser).length === 0 && (
            <Button onClick={handleLogin}>Click here to log in</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
