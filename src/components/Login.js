import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setAuthedUser } from '../slices/authedUser';
import { Col, Container, FloatingLabel, Row, Stack } from 'react-bootstrap';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    setUsername(users[userId]?.name || '');
    setPassword(users[userId]?.password || '');
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = Object.values(users).find(
      (user) => user.id === selectedUser && user.password === password
    );

    if (user) {
      dispatch(setAuthedUser({ userId: user.id }));
      navigate('/');
    } else {
      alert('Incorrect password or username');
    }
  };

  return (
    <Container>
      <Stack gap={3} className="p-4 g-col-6">
        <Row>
          <p>
            Please provide your username and password for using employee poll!
          </p>
        </Row>
        <Row>
          <h2>Login</h2>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formUserName">
                <FloatingLabel label="username" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="formPassword">
                <FloatingLabel label="password" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="formUserSelect">
                <Form.Control
                  as="select"
                  onChange={handleUserChange}
                  value={selectedUser}
                >
                  <option value="">Select user...</option>
                  {Object.values(users).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
              <Button
                variant="primary"
                type="submit"
                disabled={!password || !username}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Stack>
    </Container>
  );
};

export default Login;
