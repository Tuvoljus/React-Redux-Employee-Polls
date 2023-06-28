import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../slices/authedUser';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/">Question Pool</Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link to="/leaderboard">Leaderboard</Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link to="/add">New Question</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {authedUser.name}
            <Link onClick={handleLogout}> logout user</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
