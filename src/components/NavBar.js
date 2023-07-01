import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logoutUser } from '../slices/authedUser';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

function NavBar() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);
  const [isNavItemsActive, setIsNavItemsActive] = useState(true);
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem('authedUser');
    dispatch(logoutUser());
  };

  const isAuthed = Object.keys(authedUser).length !== 0;
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    setIsNavItemsActive(!isAuthed);
  }, [isAuthed]);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/" disabled={isNavItemsActive}>
              Question Poll
            </Nav.Link>
            <Nav.Link as={Link} to="/leaderboard" disabled={isNavItemsActive}>
              Leaderboard
            </Nav.Link>
            <Nav.Link as={Link} to="/add" disabled={isNavItemsActive}>
              New Question
            </Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {!isAuthed && !isLoginPage && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            <Navbar.Text>
              {isAuthed && `Signed in as: ${authedUser.name}`}

              {isAuthed && (
                <Link to="/" onClick={handleLogout}>
                  {' '}
                  Logout
                </Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
