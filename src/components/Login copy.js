import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setAuthedUser } from '../slices/authedUser';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    setPassword(users[userId]?.password || '');
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
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
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
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            disabled={!selectedUser}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!selectedUser || !password}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;

//   import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import Col from 'react-bootstrap/esm/Col';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/esm/Container';
// import Row from 'react-bootstrap/esm/Row';
// import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
// import { setAuthedUser } from '../slices/authedUser';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const users = useSelector((state) => state.authedUser);

//   const [authedUser, setAuthedUser] = useState({
//     name: '',
//     password: '',
//   });

//   const handleOnChange = (e) => {
//     const inputField = e.target;
//     setAuthedUser((prevState) => ({
//       ...prevState,
//       [inputField.id]: inputField.value,
//     }));
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     const { name, password } = authedUser;

//     // Dispatch an asynchronous action using Redux Thunk
//     dispatch((dispatch) => {
//       // Check if user credentials match
//       const matchedUser = Object.values(users).find(
//         (user) => user.name === name && user.password === password
//       );

//       if (matchedUser) {
//         dispatch(setAuthedUser(matchedUser.id));
//         // Redirect the user to the desired page
//         navigate('/'); // Change this to the desired page path
//       } else {
//         // Handle invalid credentials, show an error message, etc.
//         console.log('Invalid credentials');
//       }
//     });
//   };

//   return (
//     <Container>
//       <Row>
//         <h1>Login</h1>
//         <Form onSubmit={handleOnSubmit}>
//           <Row>
//             <Col>
//               <FloatingLabel label="Username" className="mb-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="Username"
//                   value={authedUser.name}
//                   onChange={handleOnChange}
//                   id="name"
//                 />
//               </FloatingLabel>
//             </Col>
//             <Col>
//               <FloatingLabel label="Password">
//                 <Form.Control
//                   type="password"
//                   id="password"
//                   placeholder="Password"
//                   value={authedUser.password}
//                   onChange={handleOnChange}
//                 />
//               </FloatingLabel>
//             </Col>
//             <Row>
//               <Col>
//                 <Button type="submit">Submit</Button>
//               </Col>
//             </Row>
//           </Row>
//         </Form>
//       </Row>
//     </Container>
//   );
// };

// export default Login;
