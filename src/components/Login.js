import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setAuthedUser } from '../slices/authedUser';
import { Col, Container, Row } from 'react-bootstrap';

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
      <Row>
        <h2>Login</h2>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUserName">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group controlId="formUserSelect">
              <Form.Label data-testid="select-user">Select User:</Form.Label>
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
            <Button
              variant="primary"
              type="submit"
              // disabled={isLoginButtonDisabled}
              disabled={!password || !username}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
